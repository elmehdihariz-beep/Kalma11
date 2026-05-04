import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kalma1_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('kalma1_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('kalma1_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t-2 border-[#1a1a1a] shadow-lg" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-4 h-4 text-[#c41e1e] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] text-[#444] leading-relaxed">
                نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتكم وعرض إعلانات مناسبة عبر Google AdSense.
                بالاستمرار في استخدام الموقع، توافقون على استخدام ملفات تعريف الارتباط.
              </p>
              <a
                href="#privacy"
                className="text-[#c41e1e] text-[12px] hover:underline mt-1 inline-block font-semibold"
              >
                اقرأ سياسة الخصوصية
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-[12px] text-[#888] border border-[#ddd] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors font-semibold"
            >
              رفض
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-[12px] text-white bg-[#1a1a1a] hover:bg-[#333] font-bold transition-colors"
            >
              قبول الكوكيز
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
