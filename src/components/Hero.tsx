import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24" dir="rtl">
        <div className="flex flex-col items-center text-center">
          {/* Overline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c41e1e]" />
            <span className="text-[#c41e1e] text-xs font-bold tracking-widest uppercase">صوت الشارع</span>
            <div className="h-px w-8 bg-[#c41e1e]" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            لمغارية عندهم
          </h1>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-white">كلمة </span>
            <span className="text-[#c41e1e]">وحدة</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#999] text-base md:text-lg max-w-xl leading-relaxed mb-10">
            منصة تجمع المغاربة حول القضايا اللي تهمنا جميعاً.
            <br />
            لنقول كلمتنا ونوقفو جشع الشركات وتجار الأزمات.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 text-center mb-10">
            <div>
              <div className="text-2xl font-black text-white">+250K</div>
              <div className="text-[#666] text-xs mt-0.5">صوت</div>
            </div>
            <div className="w-px h-10 bg-[#333]" />
            <div>
              <div className="text-2xl font-black text-white">+120</div>
              <div className="text-[#666] text-xs mt-0.5">موضوع</div>
            </div>
            <div className="w-px h-10 bg-[#333]" />
            <div>
              <div className="text-2xl font-black text-white">+50K</div>
              <div className="text-[#666] text-xs mt-0.5">مشارك</div>
            </div>
          </div>

          <ChevronDown className="w-5 h-5 text-[#c41e1e] animate-bounce" />
        </div>
      </div>

      {/* Bottom edge */}
      <div className="h-px bg-[#333]" />
    </section>
  );
}
