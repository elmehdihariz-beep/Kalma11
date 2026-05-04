export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white" dir="rtl">
      {/* Top rule */}
      <div className="h-px bg-[#333]" />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-3">
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>KALMA</span>
              <span className="text-2xl font-black text-[#c41e1e]" style={{ fontFamily: "'Playfair Display', serif" }}>1</span>
            </div>
            <p className="text-[#777] text-[13px] leading-relaxed">
              لمغارية عندهم كلمة وحدة. منصة مغربية حرة للتعبير عن رأي المواطن.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '+250K', label: 'صوت إجمالي' },
              { val: '+120', label: 'موضوع مطروح' },
              { val: '+50K', label: 'مستخدم نشط' },
              { val: '100%', label: 'مغربي وافخر' },
            ].map(s => (
              <div key={s.label} className="text-center bg-[#222] p-3 border border-[#333]">
                <div className="text-lg font-black text-[#c41e1e]">{s.val}</div>
                <div className="text-[10px] text-[#666] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[13px] mb-3 pb-2 border-b border-[#333]">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { label: 'الرئيسية', hash: '' },
                { label: 'عن المنصة', hash: '#about' },
                { label: 'اتصل بنا', hash: '#contact' },
                { label: 'سياسة الخصوصية', hash: '#privacy' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.hash}
                    className="text-[#777] text-[13px] hover:text-[#c41e1e] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold text-[13px] mb-3 pb-2 border-b border-[#333]">عن المنصة</h4>
            <p className="text-[#777] text-[13px] leading-relaxed">
              KALMA 1 منصة مستقلة تعمل على رصد القضايا الاقتصادية والاجتماعية في المغرب وإتاحة الفرصة للمواطنين للتصويت والتعبير عن مواقفهم.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#333] mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-[12px]">
            &copy; 2026 KALMA 1
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="text-[#555] text-[11px] hover:text-[#999] transition-colors">سياسة الخصوصية</a>
            <span className="text-[#333]">|</span>
            <a href="#about" className="text-[#555] text-[11px] hover:text-[#999] transition-colors">عن المنصة</a>
            <span className="text-[#333]">|</span>
            <a href="#contact" className="text-[#555] text-[11px] hover:text-[#999] transition-colors">اتصل بنا</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#c41e1e] text-sm">&#9829;</span>
            <span className="text-[#555] text-[12px]">صنع بالمغرب</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
