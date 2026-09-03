import { Star } from 'lucide-react';

interface Props {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
  className?: string;
}

export default function StarRating({ value, size = 14, interactive = false, onChange, className = '' }: Props) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} role={interactive ? 'radiogroup' : undefined}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} disabled:cursor-default`}
          >
            <Star size={size} className={filled ? 'fill-gold text-gold' : 'text-line fill-transparent'} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}
