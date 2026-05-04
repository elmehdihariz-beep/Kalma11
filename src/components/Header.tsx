import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

type HeaderProps = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onSearch: (q: string) => void;
};

const CATEGORIES = ['الكل', 'أسعار', 'محروقات', 'صحة', 'سكن', 'طاقة', 'تعليم', 'خدمات', 'اقتصاد'];

export default function Header({ activeCategory, onCategoryChange, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f2] border-b-2 border-[#1a1a1a]">
      {/* Top thin rule */}
      <div className="h-[3px] bg-[#c41e1e]" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Masthead */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => { onCategoryChange('الكل'); onSearch(''); }}
          >
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl font-black text-[#1a1a1a] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>KALMA</span>
              <span className="text-3xl font-black text-[#c41e1e] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>1</span>
            </div>
          </div>

          {/* Date + tagline */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-[#888] tracking-wide uppercase">السبت 2 ماي 2026</span>
            <span className="text-[11px] text-[#555] mt-0.5" style={{ fontStyle: 'italic' }}>لمغارية عندهم كلمة وحدة</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {searchOpen ? (
              <div className="flex items-center gap-2 border border-[#ccc] bg-white px-3 py-1">
                <input
                  autoFocus
                  type="text"
                  value={searchVal}
                  onChange={e => { setSearchVal(e.target.value); onSearch(e.target.value); }}
                  placeholder="ابحث..."
                  className="bg-transparent text-[#1a1a1a] text-sm outline-none w-36 text-right"
                  dir="rtl"
                />
                <button onClick={() => { setSearchOpen(false); setSearchVal(''); onSearch(''); }}>
                  <X className="w-4 h-4 text-[#888]" />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 text-[#555] hover:text-[#1a1a1a] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            )}
            <button
              className="md:hidden p-2 text-[#555] hover:text-[#1a1a1a]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Double rule */}
        <div className="border-t border-[#1a1a1a]" />
        <div className="border-t border-[#ddd] mt-px" />
        <div className="border-t border-[#1a1a1a]" />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-t border-[#ddd] px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { onCategoryChange(cat); setMenuOpen(false); }}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#c41e1e] text-white'
                    : 'bg-white text-[#444] border border-[#ddd] hover:bg-[#f0ece5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
