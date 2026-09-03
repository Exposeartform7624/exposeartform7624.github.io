import { Minus, Plus } from 'lucide-react';
import type { Product } from '../lib/types';
import { isLight } from '../lib/format';

interface Props {
  product: Product;
  colour: string;
  size: string;
  qty: number;
  onColour: (c: string) => void;
  onSize: (s: string) => void;
  onQty: (q: number) => void;
  showQty?: boolean;
}

export default function ProductOptions({ product, colour, size, qty, onColour, onSize, onQty, showQty = true }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="label mb-0">Colour</span>
          <span className="text-xs text-ash">{colour}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.colours.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              aria-label={c.name}
              onClick={() => onColour(c.name)}
              className={`swatch ${colour === c.name ? 'active' : ''} ${isLight(c.hex) ? 'border-black/30' : ''}`}
              style={{ background: c.hex, width: 34, height: 34 }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="label mb-0">Size</span>
          <span className="text-xs text-ash">Oversized fit — true to size</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button key={s} type="button" onClick={() => onSize(s)} className={`chip ${size === s ? 'active' : ''}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {showQty && (
        <div>
          <span className="label">Quantity</span>
          <div className="inline-flex items-stretch border border-line bg-charcoal">
            <button type="button" onClick={() => onQty(Math.max(1, qty - 1))} className="px-4 hover:text-gold transition-colors" aria-label="Decrease quantity">
              <Minus size={14} />
            </button>
            <span className="w-12 flex items-center justify-center font-display text-sm border-x border-line">{qty}</span>
            <button type="button" onClick={() => onQty(Math.min(50, qty + 1))} className="px-4 hover:text-gold transition-colors" aria-label="Increase quantity">
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
