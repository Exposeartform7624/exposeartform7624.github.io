const ITEMS = ['Oversized Fit', 'Custom Prints', 'Heavyweight Cotton', 'Wear the Dark', 'Multiple Colours', 'Made in Sri Lanka', 'Premium Streetwear', 'Define Your Style'];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-gold/25 bg-charcoal overflow-hidden py-4">
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-display text-[0.62rem] tracking-[0.35em] uppercase text-ash whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rotate-45 bg-gold inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
