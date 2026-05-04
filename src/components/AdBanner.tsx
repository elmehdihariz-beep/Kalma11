type AdSlotProps = {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
};

export function AdBanner({ slot, format = 'auto', className = '' }: AdSlotProps) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-center text-[10px] text-gray-600 mb-1">إعلان</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function InFeedAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 text-center" dir="rtl">
        <div className="text-[10px] text-gray-600 mb-2">إعلان</div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="fluid"
          data-ad-layout-key="-6t+ed+2i-1n-4w"
        />
      </div>
    </div>
  );
}

export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-[10px] text-gray-600 mb-1 text-center">إعلان</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </div>
  );
}
