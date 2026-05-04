import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicy() {
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

        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>سياسة الخصوصية</h1>
        <p className="text-[#999] text-[12px] mb-10">آخر تحديث: ماي 2026</p>

        <div className="h-px bg-[#ddd] mb-8" />

        <div className="space-y-8 text-[#444] leading-[1.9] text-[14px]">
          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">1. مقدمة</h2>
            <p>
              مرحباً بكم في KALMA 1. نحن نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية.
              توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات عند استخدامكم لموقعنا.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">2. المعلومات التي نجمعها</h2>
            <p className="mb-3">نجمع الأنواع التالية من المعلومات:</p>
            <ul className="list-disc list-inside space-y-2 text-[#666]">
              <li><strong className="text-[#444]">البصمة الرقمية (Fingerprint):</strong> نستخدم تقنية البصمة الرقمية للمتصفح لمنع التصويت المزدوج. لا تتضمن هذه البصمة أي معلومات شخصية هوية.</li>
              <li><strong className="text-[#444]">بيانات الاستخدام:</strong> نجمع معلومات حول كيفية تفاعلكم مع الموقع مثل الصفحات المزارة وأوقات الزيارة.</li>
              <li><strong className="text-[#444]">ملفات تعريف الارتباط (Cookies):</strong> نستخدم ملفات تعريف الارتباط لتحسين تجربة الاستخدام ولأغراض الإعلانات.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">3. كيف نستخدم المعلومات</h2>
            <p className="mb-3">نستخدم المعلومات المجمعة للأغراض التالية:</p>
            <ul className="list-disc list-inside space-y-2 text-[#666]">
              <li>ضمان نزاهة عملية التصويت</li>
              <li>تحسين أداء الموقع وتجربة المستخدم</li>
              <li>عرض الإعلانات ذات الصلة عبر Google AdSense</li>
              <li>تحليل أنماط الاستخدام لتحسين المحتوى</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">4. Google AdSense والإعلانات</h2>
            <p>
              نستخدم Google AdSense لعرض الإعلانات على موقعنا. قد تستخدم Google ملفات تعريف الارتباط
              لعرض إعلانات بناءً على زياراتكم السابقة لموقعنا أو مواقع أخرى. يمكنكم تعطيل الإعلانات
              المخصصة عبر إعدادات Google أو استخدام إضافة تعطيل الإعلانات المخصصة.
            </p>
            <p className="mt-3">
              لمزيد من المعلومات، يرجى زيارة:{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c41e1e] hover:underline"
              >
                سياسة إعلانات Google
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">5. ملفات تعريف الارتباط (Cookies)</h2>
            <p className="mb-3">يستخدم موقعنا الأنواع التالية من ملفات تعريف الارتباط:</p>
            <ul className="list-disc list-inside space-y-2 text-[#666]">
              <li><strong className="text-[#444]">ملفات أساسية:</strong> ضرورية لتشغيل الموقع وتسجيل التصويت</li>
              <li><strong className="text-[#444]">ملفات تحليلية:</strong> لفهم كيفية استخدام الموقع</li>
              <li><strong className="text-[#444]">ملفات إعلانية:</strong> لعرض إعلانات ذات صلة عبر Google AdSense</li>
            </ul>
            <p className="mt-3">
              يمكنكم التحكم في ملفات تعريف الارتباط عبر إعدادات المتصفح. لاحظ أن تعطيل بعض ملفات
              تعريف الارتباط قد يؤثر على تجربة الاستخدام.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">6. حماية البيانات</h2>
            <p>
              نتخذ إجراءات أمنية مناسبة لحماية معلوماتكم من الوصول غير المصرح به أو التعديل أو
              الإفشاء. نحن لا نجمع أو نخزن أي معلومات شخصية تحدد الهوية مثل الأسماء أو عناوين
              البريد الإلكتروني أو أرقام الهاتف.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">7. حقوقكم</h2>
            <p className="mb-3">لديكم الحق في:</p>
            <ul className="list-disc list-inside space-y-2 text-[#666]">
              <li>الوصول إلى البيانات المخزنة عنكم</li>
              <li>طلب حذف بياناتكم</li>
              <li>الاعتراض على معالجة بياناتكم</li>
              <li>تعطيل ملفات تعريف الارتباط</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">8. الاتصال بنا</h2>
            <p>
              إذا كان لديكم أي أسئلة حول سياسة الخصوصية، يمكنكم التواصل معنا عبر صفحة{' '}
              <a href="#contact" className="text-[#c41e1e] hover:underline">اتصل بنا</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
