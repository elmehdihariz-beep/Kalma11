const CATEGORIES = ['الكل', 'أسعار', 'محروقات', 'صحة', 'سكن', 'طاقة', 'تعليم', 'خدمات', 'اقتصاد'];

type NewsTickerProps = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function NewsTicker({ activeCategory, onCategoryChange }: NewsTickerProps) {
  const items = CATEGORIES.map(cat => ({
    label: cat,
    active: activeCategory === cat,
  }));

  const tickerContent = [...items, ...items, ...items];

  return (
    <div className="bg-[#1a1a1a] border-b border-[#333] overflow-hidden" dir="rtl">
      <div className="flex items-center">
        {/* Static label */}
        <div className="flex-shrink-0 bg-[#c41e1e] text-white text-[11px] font-black px-4 py-2.5 tracking-wider uppercase">
          تصنيفات
        </div>

        {/* Scrolling track */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {tickerContent.map((item, i) => (
              <button
                key={`${item.label}-${i}`}
                onClick={() => onCategoryChange(item.label)}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-[12px] font-bold transition-colors border-l border-[#333] ${
                  item.active
                    ? 'text-[#c41e1e] bg-[#c41e1e]/10'
                    : 'text-[#999] hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 ${item.active ? 'bg-[#c41e1e]' : 'bg-[#555]'} rounded-full`} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
