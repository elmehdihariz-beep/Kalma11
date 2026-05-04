import { useState } from 'react';
import { Heart, Gavel, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Post } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { getFingerprint, getVotedPosts, saveVote } from '../lib/fingerprint';

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return 'الآن';
  if (diff < 3600) return `${Math.floor(diff / 60)} د`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} س`;
  return `${Math.floor(diff / 86400)} ي`;
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'أسعار': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'محروقات': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'صحة': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'سكن': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'طاقة': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'تعليم': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  'خدمات': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
  'اقتصاد': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [localAgree, setLocalAgree] = useState(post.agree_count);
  const [localDisagree, setLocalDisagree] = useState(post.disagree_count);
  const [voting, setVoting] = useState(false);

  const votes = getVotedPosts();
  const myVote = votes[post.id];
  const total = localAgree + localDisagree;
  const agreePercent = total > 0 ? Math.round((localAgree / total) * 100) : 0;

  const handleVote = async (type: 'agree' | 'disagree') => {
    if (myVote || voting) return;
    setVoting(true);
    const fp = getFingerprint();

    const { error } = await supabase.from('votes').insert({
      post_id: post.id,
      fingerprint: fp,
      vote_type: type,
    });

    if (!error) {
      if (type === 'agree') {
        await supabase.from('posts').update({ agree_count: localAgree + 1 }).eq('id', post.id);
        setLocalAgree(p => p + 1);
      } else {
        await supabase.from('posts').update({ disagree_count: localDisagree + 1 }).eq('id', post.id);
        setLocalDisagree(p => p + 1);
      }
      saveVote(post.id, type);
    }
    setVoting(false);
  };

  const catStyle = CATEGORY_STYLES[post.category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  const bodyPreview = post.body_ar.slice(0, 180);
  const hasMore = post.body_ar.length > 180;

  if (featured) {
    return (
      <article className="group bg-white border border-[#ddd] overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Featured label */}
        <div className="bg-[#c41e1e] text-white text-[11px] font-bold px-4 py-1.5 tracking-wide" dir="rtl">
          الأكثر تداولاً
        </div>

        <div className="md:grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-[380px] overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title_ar}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-r border-[#eee]" dir="rtl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold px-2.5 py-1 border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                  {post.category}
                </span>
                <span className="text-[#999] text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timeAgo(post.created_at)}
                </span>
              </div>

              <h2 className="text-2xl md:text-[28px] font-black text-[#1a1a1a] leading-[1.25] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title_ar}
              </h2>

              <p className="text-[#555] leading-[1.8] text-[14px]">
                {expanded ? post.body_ar : bodyPreview}
                {hasMore && !expanded && '...'}
              </p>
              {hasMore && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[#c41e1e] text-[13px] mt-2 flex items-center gap-1 hover:underline font-semibold"
                >
                  {expanded ? (<><ChevronUp className="w-3.5 h-3.5" />أقل</>) : (<><ChevronDown className="w-3.5 h-3.5" />اقرأ المزيد</>)}
                </button>
              )}

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.tags.map(t => (
                    <span key={t} className="text-[11px] text-[#888] bg-[#f5f2ed] px-2 py-0.5">{t}</span>
                  ))}
                </div>
              )}
            </div>

            <VotingSection
              agreeCount={localAgree}
              disagreeCount={localDisagree}
              agreePercent={agreePercent}
              myVote={myVote}
              voting={voting}
              onVote={handleVote}
              large
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-[#ddd] overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title_ar}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-1 border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 border-t border-[#eee]" dir="rtl">
        <div className="flex items-center gap-2 text-[11px] text-[#999] mb-2.5">
          <Clock className="w-3 h-3" /> {timeAgo(post.created_at)}
        </div>

        <h3 className="text-[17px] font-black text-[#1a1a1a] leading-[1.3] mb-2.5 group-hover:text-[#c41e1e] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
          {post.title_ar}
        </h3>

        <p className="text-[#555] text-[13px] leading-[1.7] flex-1">
          {expanded ? post.body_ar : bodyPreview}
          {hasMore && !expanded && '...'}
        </p>
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#c41e1e] text-[12px] mt-2 flex items-center gap-1 hover:underline font-semibold"
          >
            {expanded ? (<><ChevronUp className="w-3 h-3" />أقل</>) : (<><ChevronDown className="w-3 h-3" />اقرأ المزيد</>)}
          </button>
        )}

        <div className="mt-4 pt-4 border-t border-[#eee]">
          <VotingSection
            agreeCount={localAgree}
            disagreeCount={localDisagree}
            agreePercent={agreePercent}
            myVote={myVote}
            voting={voting}
            onVote={handleVote}
          />
        </div>
      </div>
    </article>
  );
}

type VotingSectionProps = {
  agreeCount: number;
  disagreeCount: number;
  agreePercent: number;
  myVote: 'agree' | 'disagree' | undefined;
  voting: boolean;
  onVote: (t: 'agree' | 'disagree') => void;
  large?: boolean;
};

function VotingSection({ agreeCount, disagreeCount, agreePercent, myVote, voting, onVote, large }: VotingSectionProps) {
  const voted = !!myVote;

  return (
    <div className="mt-3">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 bg-[#eee] overflow-hidden">
          <div
            className="h-full bg-[#1a1a1a] transition-all duration-700"
            style={{ width: `${agreePercent}%` }}
          />
        </div>
        <span className="text-[13px] font-black text-[#1a1a1a]">
          {agreePercent}%
        </span>
      </div>

      <div className={`flex gap-2 ${large ? 'flex-col sm:flex-row' : ''}`}>
        {/* Agree */}
        <button
          onClick={() => onVote('agree')}
          disabled={voted || voting}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 font-bold text-[13px] transition-all duration-200 border ${
            myVote === 'agree'
              ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
              : voted
              ? 'bg-[#f5f2ed] border-[#ddd] text-[#bbb] cursor-not-allowed'
              : 'bg-white border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${myVote === 'agree' ? 'fill-white' : ''}`} />
          <span>موافق</span>
          <span className="font-black">{formatCount(agreeCount)}</span>
        </button>

        {/* Disagree */}
        <button
          onClick={() => onVote('disagree')}
          disabled={voted || voting}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 font-bold text-[13px] transition-all duration-200 border ${
            myVote === 'disagree'
              ? 'bg-[#c41e1e] border-[#c41e1e] text-white'
              : voted
              ? 'bg-[#f5f2ed] border-[#ddd] text-[#bbb] cursor-not-allowed'
              : 'bg-white border-[#c41e1e] text-[#c41e1e] hover:bg-[#c41e1e] hover:text-white'
          }`}
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>غير موافق</span>
          <span className="font-black">{formatCount(disagreeCount)}</span>
        </button>
      </div>

      {voted && (
        <p className="text-center text-[11px] text-[#999] mt-2">تم تسجيل صوتك</p>
      )}
    </div>
  );
}
