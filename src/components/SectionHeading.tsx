import Reveal from './Reveal';

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ eyebrow, title, highlight, subtitle, align = 'left', className = '' }: Props) {
  return (
    <Reveal className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <span className={`eyebrow mb-5 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</span>}
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.75rem,4.2vw,3.25rem)]">
        {title} {highlight && <span className="gold-text">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-5 text-ash text-base md:text-lg leading-relaxed max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}
