import { ArrowRight, Shield, Users, Vote, Globe } from 'lucide-react';

export default function About() {
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

        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>عن KALMA 1</h1>
        <p className="text-[#999] text-[12px] mb-10">منصة مغربية مستقلة للتعبير والتصويت</p>

        <div className="h-px bg-[#ddd] mb-8" />

        <div className="space-y-8 text-[#444] leading-[1.9] text-[14px]">
          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">من نحن</h2>
            <p>
              KALMA 1 هي منصة رقمية مغربية مستقلة تتيح للمواطنين التعبير عن آرائهم في القضايا
              الاقتصادية والاجتماعية التي تؤثر على حياتهم اليومية. اسم "كلمة" يعبر عن حق كل مغربي
              في أن يكون له صوت مسموع.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">رسالتنا</h2>
            <p>
              نؤمن بأن الصوت الجماعي للمواطنين أقوى من أي مصلحة خاصة. رسالتنا هي إعطاء منصة
              حرة وشفافة للمغاربة للتعبير عن مواقفهم من القضايا التي تهمهم، من ارتفاع الأسعار
              إلى جودة الخدمات العامة.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">كيف نعمل</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                {
                  icon: Vote,
                  title: 'تصويت شفاف',
                  desc: 'كل موضوع يخضع لتصويت مفتوح حيث يمكن للمستخدمين الموافقة أو الاعتراض.',
                },
                {
                  icon: Shield,
                  title: 'حماية الهوية',
                  desc: 'لا نجمع بيانات شخصية. نستخدم بصمة المتصفح فقط لضمان نزاهة التصويت.',
                },
                {
                  icon: Users,
                  title: 'مجتمع نشط',
                  desc: 'آلاف المغاربة يشاركون يومياً آراءهم في القضايا التي تهمهم.',
                },
                {
                  icon: Globe,
                  title: 'وصول واسع',
                  desc: 'منصة متاحة لجميع المغاربة داخل المغرب وخارجه.',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="bg-white border border-[#ddd] p-5 hover:border-[#c41e1e]/30 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-[#c41e1e] mb-3" />
                  <h3 className="font-black text-[14px] text-[#1a1a1a] mb-1">{item.title}</h3>
                  <p className="text-[#888] text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">الاستقلالية</h2>
            <p>
              KALMA 1 منصة مستقلة تماماً لا تتبع لأي حزب سياسي أو جهة حكومية أو مجموعة مصالح.
              المحتوى يعكس آراء المستخدمين وليس موقف المنصة. نحن لا نتدخل في نتائج التصويت
              ولا نحابي أي طرف.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">الإعلانات</h2>
            <p>
              لضمان استمرارية المنصة وتغطية تكاليف التشغيل، نعرض إعلانات عبر Google AdSense.
              الإعلانات لا تؤثر على محتوى الموقع أو نتائج التصويت. نختار إعلانات مناسبة
              لجمهورنا المغربي.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-black text-[#1a1a1a] mb-3">المساهمة</h2>
            <p>
              يمكنكم المساهمة في إثراء المنصة بإضافة مواضيع جديدة عبر زر "إضافة موضوع".
              نرحب بجميع القضايا التي تهم المواطن المغربي بشرط احترام الآداب العامة
              وتجنب التحريض أو الكراهية.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
