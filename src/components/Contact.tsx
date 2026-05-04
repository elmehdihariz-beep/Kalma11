import { useState } from 'react';
import { ArrowRight, Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1a1a1a]" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-[#888] hover:text-[#1a1a1a] mb-8 transition-colors text-[13px]"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة</span>
        </button>

        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>اتصل بنا</h1>
        <p className="text-[#999] text-[12px] mb-10">نسعد بتواصلكم معنا</p>

        <div className="h-px bg-[#ddd] mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-[#ddd] p-5 text-center">
            <Mail className="w-5 h-5 text-[#c41e1e] mx-auto mb-2" />
            <h3 className="font-bold text-[13px] mb-0.5">البريد الإلكتروني</h3>
            <p className="text-[#888] text-[12px]">contact@kalma1.ma</p>
          </div>
          <div className="bg-white border border-[#ddd] p-5 text-center">
            <MessageSquare className="w-5 h-5 text-[#c41e1e] mx-auto mb-2" />
            <h3 className="font-bold text-[13px] mb-0.5">الشكاوى والاقتراحات</h3>
            <p className="text-[#888] text-[12px]">نرد خلال 48 ساعة</p>
          </div>
          <div className="bg-white border border-[#ddd] p-5 text-center">
            <Send className="w-5 h-5 text-[#c41e1e] mx-auto mb-2" />
            <h3 className="font-bold text-[13px] mb-0.5">اقتراح موضوع</h3>
            <p className="text-[#888] text-[12px]">أرسلوا فكرتكم</p>
          </div>
        </div>

        {sent ? (
          <div className="bg-white border border-[#ddd] p-8 text-center">
            <div className="text-3xl mb-3 text-[#1a1a1a]">&#10003;</div>
            <h2 className="text-lg font-black text-[#1a1a1a] mb-2">تم إرسال رسالتكم بنجاح</h2>
            <p className="text-[#888] text-[13px]">سنتواصل معكم في أقرب وقت ممكن.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-[#c41e1e] text-[13px] hover:underline font-semibold"
            >
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#ddd] p-6 space-y-5">
            <div>
              <label className="block text-[13px] font-bold mb-2">الاسم</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#ddd] px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors"
                placeholder="اسمكم"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#ddd] px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-2">الرسالة</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#ddd] px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                placeholder="اكتبوا رسالتكم هنا..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white font-bold py-3 text-[14px] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              إرسال الرسالة
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
