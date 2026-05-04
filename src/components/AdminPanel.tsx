import { useState } from 'react';
import { X, Upload, Plus, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['أسعار', 'محروقات', 'صحة', 'سكن', 'طاقة', 'تعليم', 'خدمات', 'اقتصاد'];

type AdminPanelProps = {
  onClose: () => void;
  onPostCreated: () => void;
};

export default function AdminPanel({ onClose, onPostCreated }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const [form, setForm] = useState({
    title_ar: '',
    body_ar: '',
    image_url: '',
    category: 'أسعار',
    tags: '',
    is_featured: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setAuthLoading(true);
    setPwError(false);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const res = await fetch(`${supabaseUrl}/functions/v1/verify-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.authenticated) {
        sessionStorage.setItem('kalma1_admin_token', data.token);
        setAuthenticated(true);
      } else {
        setPwError(true);
      }
    } catch {
      setPwError(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title_ar || !form.body_ar || !form.image_url) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    setSubmitting(true);
    setError('');

    const tags = form.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const { error: err } = await supabase.from('posts').insert({
      title_ar: form.title_ar,
      body_ar: form.body_ar,
      image_url: form.image_url,
      category: form.category,
      tags,
      is_featured: form.is_featured,
      agree_count: 0,
      disagree_count: 0,
    });

    setSubmitting(false);
    if (err) {
      setError('حدث خطأ أثناء النشر');
    } else {
      setSuccess(true);
      setForm({ title_ar: '', body_ar: '', image_url: '', category: 'أسعار', tags: '', is_featured: false });
      onPostCreated();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-[#ddd] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#eee]" dir="rtl">
          <h2 className="text-[16px] font-black text-[#1a1a1a] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#c41e1e]" /> إضافة موضوع جديد
          </h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#1a1a1a] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!authenticated ? (
          <div className="p-6" dir="rtl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[14px] font-black text-[#1a1a1a]">وصول المشرف</p>
                <p className="text-[12px] text-[#888]">أدخل كلمة المرور للمتابعة</p>
              </div>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setPwError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              placeholder="كلمة المرور"
              className={`w-full bg-[#faf7f2] border ${pwError ? 'border-[#c41e1e]' : 'border-[#ddd]'} text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-right`}
            />
            {pwError && <p className="text-[#c41e1e] text-[12px] mt-2">كلمة المرور غير صحيحة</p>}
            <button
              onClick={handleAuth}
              disabled={authLoading}
              className="w-full mt-4 bg-[#1a1a1a] text-white py-3 font-bold text-[14px] hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {authLoading ? 'جاري التحقق...' : 'دخول'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" dir="rtl">
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-[13px]">
                تم نشر الموضوع بنجاح!
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-[13px]">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[12px] font-bold text-[#555] mb-1.5">العنوان *</label>
              <input
                type="text"
                value={form.title_ar}
                onChange={e => setForm(p => ({ ...p, title_ar: e.target.value }))}
                placeholder="عنوان الموضوع..."
                className="w-full bg-[#faf7f2] border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-right"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#555] mb-1.5">التصنيف *</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full bg-[#faf7f2] border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-right"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#555] mb-1.5">رابط الصورة *</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.image_url}
                  onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="flex-1 bg-[#faf7f2] border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-left"
                  dir="ltr"
                />
                <div className="bg-[#faf7f2] border border-[#ddd] px-3 flex items-center text-[#999]">
                  <Upload className="w-4 h-4" />
                </div>
              </div>
              {form.image_url && (
                <img src={form.image_url} alt="" className="mt-2 w-full h-32 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#555] mb-1.5">المحتوى *</label>
              <textarea
                value={form.body_ar}
                onChange={e => setForm(p => ({ ...p, body_ar: e.target.value }))}
                placeholder="اكتب تفاصيل الموضوع هنا..."
                rows={5}
                className="w-full bg-[#faf7f2] border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-right resize-none"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#555] mb-1.5">الوسوم (مفصولة بفاصلة)</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="#غلاء_الأسعار, #الاقتصاد"
                className="w-full bg-[#faf7f2] border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] outline-none focus:border-[#1a1a1a] transition-colors text-right"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))}
                className="w-4 h-4 accent-[#c41e1e]"
              />
              <span className="text-[13px] text-[#444]">تمييز كأهم موضوع</span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#c41e1e] text-white py-3 font-bold text-[14px] hover:bg-[#a01818] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'جاري النشر...' : 'نشر الموضوع'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
