import { useEffect, useState, useMemo } from 'react';
import { supabase, Post } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import PostCard from './components/PostCard';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import Contact from './components/Contact';
import { AdBanner, InFeedAd } from './components/AdBanner';
import NewsTicker from './components/NewsTicker';
import { Plus, Loader2, RefreshCw, TrendingUp } from 'lucide-react';

const SORT_OPTIONS = [
  { key: 'trending', label: 'الأكثر تداولاً' },
  { key: 'newest', label: 'الأحدث' },
  { key: 'votes', label: 'الأكثر تصويتاً' },
];

function useHash() {
  const [hash, setHash] = useState(window.location.hash.slice(1));
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('trending');
  const [adminOpen, setAdminOpen] = useState(false);
  const hash = useHash();

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'الكل') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title_ar.toLowerCase().includes(q) ||
        p.body_ar.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (sortKey === 'newest') {
      result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      result = [...result].sort((a, b) => (b.agree_count + b.disagree_count) - (a.agree_count + a.disagree_count));
    }
    return result;
  }, [posts, activeCategory, searchQuery, sortKey]);

  const featuredPost = useMemo(() => filtered.find(p => p.is_featured) || filtered[0], [filtered]);
  const otherPosts = useMemo(() => filtered.filter(p => p.id !== featuredPost?.id), [filtered, featuredPost]);

  const totalVotes = posts.reduce((s, p) => s + p.agree_count + p.disagree_count, 0);

  // Legal pages
  if (hash === 'privacy') return <><PrivacyPolicy /><Footer /><CookieConsent /></>;
  if (hash === 'about') return <><About /><Footer /><CookieConsent /></>;
  if (hash === 'contact') return <><Contact /><Footer /><CookieConsent /></>;

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1a1a1a]">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
      />

      <Hero />

      {/* News ticker / category marquee */}
      <NewsTicker activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Top ad banner */}
      <div className="bg-[#faf7f2] border-b border-[#ddd]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <AdBanner slot="top-banner" format="horizontal" />
        </div>
      </div>

      {/* Sort bar */}
      <div className="bg-[#faf7f2] border-b border-[#ddd]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap" dir="rtl">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-[#c41e1e]" />
              <span className="text-[13px] text-[#555]">{posts.length} موضوع</span>
              <span className="text-[#ccc]">|</span>
              <span className="text-[13px] text-[#555]">{Math.round(totalVotes / 1000)}K+ صوت</span>
            </div>
            <div className="flex items-center gap-1">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortKey(s.key)}
                  className={`px-3 py-1.5 text-[12px] font-semibold transition-all ${
                    sortKey === s.key
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-[#555] hover:text-[#1a1a1a] hover:bg-[#eee]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-6 h-6 text-[#c41e1e] animate-spin" />
            <p className="text-[#999] text-sm">جاري التحميل...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center" dir="rtl">
            <div className="w-14 h-14 bg-[#eee] flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#999]" />
            </div>
            <p className="text-[#555] text-lg font-bold">لا توجد مواضيع</p>
            <p className="text-[#999] text-sm">جرب تغيير التصنيف أو مصطلح البحث</p>
          </div>
        ) : (
          <div dir="rtl">
            {featuredPost && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-[#c41e1e]" />
                  <h2 className="text-[15px] font-black text-[#1a1a1a] tracking-wide uppercase">أبرز الأخبار</h2>
                </div>
                <PostCard post={featuredPost} featured />
              </div>
            )}

            {/* In-feed ad after featured */}
            <div className="mb-8">
              <InFeedAd />
            </div>

            {otherPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-[#c41e1e]" />
                  <h2 className="text-[15px] font-black text-[#1a1a1a] tracking-wide uppercase">مواضيع جديدة</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {otherPosts.map((post, idx) => (
                    <>
                      <PostCard key={post.id} post={post} />
                      {idx > 0 && (idx + 1) % 6 === 0 && (
                        <div key={`ad-${idx}`} className="col-span-full">
                          <InFeedAd />
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom ad banner */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdBanner slot="bottom-banner" format="horizontal" />
      </div>

      {/* Mission banner */}
      <div className="bg-[#1a1a1a] py-5 px-4" dir="rtl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            لمغارية عندهم كلمة وحدة
          </p>
          <div className="flex items-center gap-3 text-[13px] text-[#777]">
            <span>معاً للتغيير</span>
            <span className="text-[#c41e1e]">&#9670;</span>
            <span>من أجل المغرب</span>
          </div>
        </div>
      </div>

      <Footer />

      <CookieConsent />

      {/* Floating admin button */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-[#c41e1e] text-white w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#a01818] hover:scale-105 transition-all duration-200"
        title="إضافة موضوع جديد"
        aria-label="إضافة موضوع"
      >
        <Plus className="w-5 h-5" />
      </button>

      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          onPostCreated={fetchPosts}
        />
      )}
    </div>
  );
}
