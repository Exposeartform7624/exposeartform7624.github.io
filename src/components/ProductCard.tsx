import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '../lib/types';
import { formatLKR, isLight } from '../lib/format';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUI } from '../contexts/UIContext';
import StarRating from './StarRating';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const { openQuickView, toast } = useUI();
  const navigate = useNavigate();

  const [colour, setColour] = useState(product.colours[0]?.name ?? '');
  const [size, setSize] = useState(product.sizes.includes('M') ? 'M' : product.sizes[0] ?? 'M');

  const saved = has(product.id);

  const handleAdd = () => {
    addItem(product, { size, colour, qty: 1 });
    toast(`${product.name} (${size}, ${colour}) added to cart`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, { size, colour, qty: 1 });
    navigate('/checkout');
  };

  const handleWishlist = async () => {
    const nowSaved = await toggle(product.id);
    toast(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist', 'info');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card group flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-charcoal">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <img src={product.images[0]} alt={product.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && <span className="badge badge-gold">New Drop</span>}
          {product.is_bestseller && <span className="badge badge-dark">Best Seller</span>}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center border transition-all duration-300 backdrop-blur-sm ${
            saved ? 'bg-gold border-gold text-void' : 'bg-void/60 border-line text-ivory hover:border-gold hover:text-gold'
          }`}
        >
          <Heart size={15} className={saved ? 'fill-void' : ''} />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="absolute left-3 right-3 bottom-3 btn btn-sm bg-void/85 backdrop-blur-md border border-gold/40 text-gold hover:bg-gold hover:text-void translate-y-0 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400"
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-smoke font-display">{product.category === 'oversized' ? 'Oversized' : 'Custom Print'}</p>
            <Link to={`/product/${product.slug}`} className="block mt-1 font-semibold text-[0.95rem] leading-snug hover:text-gold transition-colors">
              {product.name}
            </Link>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-sm text-gold">{formatLKR(product.price)}</p>
            {product.compare_at_price && <p className="text-xs text-smoke line-through">{formatLKR(product.compare_at_price)}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StarRating value={Number(product.rating)} size={11} />
          <span className="text-[0.7rem] text-smoke">({product.review_count})</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {product.colours.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={`Colour ${c.name}`}
                onClick={() => setColour(c.name)}
                className={`swatch ${colour === c.name ? 'active' : ''} ${isLight(c.hex) ? 'border-black/30' : ''}`}
                style={{ background: c.hex, width: 20, height: 20 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`text-[0.6rem] font-semibold tracking-wider w-7 h-7 flex items-center justify-center border transition-colors ${
                  size === s ? 'border-gold text-gold' : 'border-line text-smoke hover:text-ivory hover:border-ash'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <button type="button" onClick={handleAdd} className="btn btn-sm btn-ghost">
            <ShoppingBag size={13} /> Add to Cart
          </button>
          <button type="button" onClick={handleBuyNow} className="btn btn-sm btn-gold">
            <Zap size={13} /> Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
