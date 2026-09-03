import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Heart, ShoppingBag, X, Zap } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { formatLKR } from '../lib/format';
import ProductOptions from './ProductOptions';
import StarRating from './StarRating';

export default function QuickViewModal() {
  const { quickView: product, closeQuickView, toast } = useUI();
  const { addItem, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const navigate = useNavigate();

  const [colour, setColour] = useState('');
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setColour(product.colours[0]?.name ?? '');
      setSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
      setQty(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeQuickView();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeQuickView]);

  if (!product) return <AnimatePresence />;

  const add = () => {
    addItem(product, { size, colour, qty });
    toast(`${product.name} added to cart`);
    closeQuickView();
    openCart();
  };
  const buyNow = () => {
    addItem(product, { size, colour, qty });
    closeQuickView();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="qv-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeQuickView}
        className="fixed inset-0 z-[70] bg-void/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          key="qv-panel"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-charcoal border border-gold/30 shadow-gold-lg max-h-[92vh] overflow-y-auto grid md:grid-cols-2"
          role="dialog"
          aria-modal="true"
        >
          <button type="button" onClick={closeQuickView} className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-void/70 border border-line text-ivory hover:text-gold hover:border-gold" aria-label="Close">
            <X size={18} />
          </button>

          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] bg-graphite overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.is_new && <span className="badge badge-gold">New Drop</span>}
              {product.is_bestseller && <span className="badge badge-dark">Best Seller</span>}
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <p className="eyebrow">{product.category === 'oversized' ? 'Oversized T-Shirt' : 'Custom Print T-Shirt'}</p>
            <h3 className="mt-3 font-display font-bold text-xl md:text-2xl uppercase leading-tight">{product.name}</h3>
            <div className="mt-2 flex items-center gap-2">
              <StarRating value={Number(product.rating)} size={12} />
              <span className="text-xs text-smoke">
                {Number(product.rating).toFixed(1)} · {product.review_count} reviews
              </span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <p className="font-display text-2xl gold-text">{formatLKR(product.price)}</p>
              {product.compare_at_price && <p className="text-sm text-smoke line-through mb-1">{formatLKR(product.compare_at_price)}</p>}
              <span className="text-[0.6rem] text-smoke uppercase tracking-widest mb-1.5">Prices include tax</span>
            </div>
            <p className="mt-4 text-sm text-ash leading-relaxed line-clamp-3">{product.description}</p>

            <div className="mt-6">
              <ProductOptions product={product} colour={colour} size={size} qty={qty} onColour={setColour} onSize={setSize} onQty={setQty} />
            </div>

            <div className="mt-7 grid grid-cols-[1fr_1fr_auto] gap-2">
              <button type="button" onClick={add} className="btn btn-ghost">
                <ShoppingBag size={14} /> Add
              </button>
              <button type="button" onClick={buyNow} className="btn btn-gold">
                <Zap size={14} /> Buy Now
              </button>
              <button
                type="button"
                onClick={async () => {
                  const s = await toggle(product.id);
                  toast(s ? 'Saved to wishlist' : 'Removed from wishlist', 'info');
                }}
                className={`w-12 flex items-center justify-center border transition-colors ${has(product.id) ? 'bg-gold border-gold text-void' : 'border-line text-ash hover:text-gold hover:border-gold'}`}
                aria-label="Wishlist"
              >
                <Heart size={16} className={has(product.id) ? 'fill-void' : ''} />
              </button>
            </div>

            <Link to={`/product/${product.slug}`} onClick={closeQuickView} className="mt-5 inline-flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-gold hover:text-gold-light">
              View full details <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
