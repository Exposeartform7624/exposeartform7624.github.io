import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Heart, MessageCircle, RotateCcw, ShieldCheck, ShoppingBag, Truck, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import ProductOptions from '../components/ProductOptions';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import ReviewsPanel from '../components/ReviewsPanel';
import StarRating from '../components/StarRating';
import { api } from '../lib/api';
import { PRODUCTS } from '../lib/products';
import { formatLKR, whatsappLink } from '../lib/format';
import type { Product } from '../lib/types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUI } from '../contexts/UIContext';

const SIZE_GUIDE = [
  ['S', '52', '70'],
  ['M', '55', '72'],
  ['L', '58', '74'],
  ['XL', '61', '76'],
  ['XXL', '64', '78'],
];

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const { toast } = useUI();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState<string | null>('details');

  const load = useCallback(() => {
    if (!slug) return;
    api<Product>(`/api/products?slug=${encodeURIComponent(slug)}`)
      .then((p) => {
        setProduct(p);
        setColour(p.colours[0]?.name ?? '');
        setSize(p.sizes.includes('M') ? 'M' : p.sizes[0]);
        setActiveImg(0);
        setQty(1);
        return api<Product[]>(`/api/products?category=${p.category}&exclude=${p.id}&limit=4`).then(setRelated);
      })
      .catch(() => {
        const local = PRODUCTS.find((p) => p.slug === slug);
        if (!local) {
          setNotFound(true);
          return;
        }
        setProduct(local);
        setColour(local.colours[0]?.name ?? '');
        setSize(local.sizes.includes('M') ? 'M' : local.sizes[0]);
        setActiveImg(0);
        setQty(1);
        setRelated(PRODUCTS.filter((p) => p.category === local.category && p.id !== local.id).slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="wrap pt-40 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="skeleton aspect-[4/5]" />
          <div className="space-y-4">
            <div className="skeleton h-3 w-32" />
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="wrap pt-48 pb-32 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-4 font-display font-bold text-3xl uppercase">Product not found</h1>
        <Link to="/shop" className="btn btn-gold mt-8">
          Back to shop
        </Link>
      </div>
    );
  }

  const saved = has(product.id);
  const add = () => {
    addItem(product, { size, colour, qty });
    toast(`${product.name} added to cart`);
    openCart();
  };
  const buyNow = () => {
    addItem(product, { size, colour, qty });
    navigate('/checkout');
  };
  const waMsg = `Hi ECLIPSE CLOTHING 4.0! I'd like to order:\n\n• ${product.name}\n• Colour: ${colour}\n• Size: ${size}\n• Quantity: ${qty}\n• Price: ${formatLKR(product.price * qty)}\n\nPlease confirm availability.`;

  const panels = [
    {
      key: 'details',
      title: 'Details & Fabric',
      body: (
        <ul className="space-y-2 text-sm text-ash">
          <li>• {product.fabric}</li>
          <li>• {product.fit}</li>
          <li>• Drop shoulder, ribbed crew neck, double-stitched hems</li>
          <li>• Pre-shrunk. Designed and finished in Sri Lanka</li>
        </ul>
      ),
    },
    {
      key: 'size',
      title: 'Size Guide',
      body: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[0.6rem] font-display tracking-widest uppercase text-smoke">
                <th className="py-2">Size</th>
                <th className="py-2">Chest (cm)</th>
                <th className="py-2">Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE.map(([s, c, l]) => (
                <tr key={s} className={`border-t border-line ${size === s ? 'text-gold' : 'text-ash'}`}>
                  <td className="py-2 font-semibold">{s}</td>
                  <td className="py-2">{c}</td>
                  <td className="py-2">{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-smoke mt-3">Oversized fit. For a relaxed look choose your usual size; size down for a closer fit.</p>
        </div>
      ),
    },
    {
      key: 'care',
      title: 'Care',
      body: <p className="text-sm text-ash leading-relaxed">Machine wash cold, inside out. Do not bleach. Tumble dry low or hang dry. Iron inside out on low — never directly on the print.</p>,
    },
    {
      key: 'delivery',
      title: 'Delivery & Returns',
      body: (
        <p className="text-sm text-ash leading-relaxed">
          Island-wide delivery in 2–5 working days. LKR 350 flat rate, free on orders over LKR 8,000. Exchanges accepted within 7 days on unworn, unwashed items with tags. Custom prints are final sale.
        </p>
      ),
    },
  ];

  return (
    <>
      <Seo title={`${product.name} — ${formatLKR(product.price)} | ECLIPSE CLOTHING 4.0`} description={product.description.slice(0, 155)} />

      <div className="wrap pt-32 md:pt-40 pb-20">
        <nav className="flex items-center gap-2 text-xs text-smoke mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-gold">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-gold">{product.category === 'oversized' ? 'Oversized' : 'Custom Print'}</Link>
          <ChevronRight size={12} />
          <span className="text-ash truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-24 shrink-0 overflow-hidden border transition-all ${activeImg === i ? 'border-gold shadow-gold' : 'border-line hover:border-ash'}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <motion.div key={activeImg} initial={{ opacity: 0.4, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative flex-1 aspect-[4/5] overflow-hidden border border-line bg-graphite">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && <span className="badge badge-gold">New Drop</span>}
                {product.is_bestseller && <span className="badge badge-dark">Best Seller</span>}
              </div>
            </motion.div>
          </div>

          <div>
            <span className="eyebrow">{product.category === 'oversized' ? 'Oversized T-Shirt' : 'Custom Print T-Shirt'}</span>
            <h1 className="mt-4 font-display font-bold uppercase leading-[1.05] text-[clamp(1.6rem,3.5vw,2.75rem)]">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <StarRating value={Number(product.rating)} size={14} />
              <a href="#reviews" className="text-xs text-ash hover:text-gold">
                {Number(product.rating).toFixed(1)} · {product.review_count} review{product.review_count === 1 ? '' : 's'}
              </a>
              <span className="text-xs text-smoke">·</span>
              <span className={`text-xs ${product.stock > 5 ? 'text-gold' : 'text-red-400'}`}>{product.stock > 5 ? 'In stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Sold out'}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-3xl gold-text">{formatLKR(product.price)}</p>
              {product.compare_at_price && <p className="text-base text-smoke line-through mb-1">{formatLKR(product.compare_at_price)}</p>}
            </div>
            <p className="text-[0.62rem] uppercase tracking-[0.25em] text-smoke mt-1">Prices include tax</p>

            <p className="mt-6 text-ash leading-relaxed">{product.description}</p>

            <div className="mt-8 card p-6">
              <ProductOptions product={product} colour={colour} size={size} qty={qty} onColour={setColour} onSize={setSize} onQty={setQty} />
            </div>

            <div className="mt-6 grid grid-cols-[1fr_1fr_auto] gap-2">
              <button type="button" onClick={add} disabled={product.stock === 0} className="btn btn-ghost">
                <ShoppingBag size={15} /> Add to Cart
              </button>
              <button type="button" onClick={buyNow} disabled={product.stock === 0} className="btn btn-gold">
                <Zap size={15} /> Buy Now
              </button>
              <button
                type="button"
                onClick={async () => {
                  const s = await toggle(product.id);
                  toast(s ? 'Saved to wishlist' : 'Removed from wishlist', 'info');
                }}
                className={`w-14 flex items-center justify-center border transition-colors ${saved ? 'bg-gold border-gold text-void' : 'border-line text-ash hover:text-gold hover:border-gold'}`}
                aria-label="Wishlist"
              >
                <Heart size={18} className={saved ? 'fill-void' : ''} />
              </button>
            </div>
            <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full mt-2">
              <MessageCircle size={15} /> Order via WhatsApp
            </a>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, t: 'Island-wide delivery' },
                { icon: ShieldCheck, t: 'Premium 240+ GSM' },
                { icon: RotateCcw, t: '7-day exchange' },
              ].map((b) => (
                <div key={b.t} className="border border-line p-3">
                  <b.icon size={18} className="mx-auto text-gold" strokeWidth={1.5} />
                  <p className="mt-2 text-[0.62rem] text-ash uppercase tracking-wider">{b.t}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line">
              {panels.map((p) => (
                <div key={p.key} className="border-b border-line">
                  <button type="button" onClick={() => setOpenPanel(openPanel === p.key ? null : p.key)} className="w-full flex items-center justify-between py-4 text-left">
                    <span className="font-display text-[0.65rem] tracking-[0.22em] uppercase">{p.title}</span>
                    <ChevronDown size={16} className={`text-gold transition-transform ${openPanel === p.key ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div initial={false} animate={{ height: openPanel === p.key ? 'auto' : 0, opacity: openPanel === p.key ? 1 : 0 }} className="overflow-hidden">
                    <div className="pb-5">{p.body}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="reviews" className="mt-24 pt-16 border-t border-line">
          <ReviewsPanel productId={product.id} onReviewAdded={load} />
        </div>

        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 className="mt-3 font-display font-bold uppercase text-2xl md:text-3xl">
                Complete the <span className="gold-text">look</span>
              </h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex text-xs font-display tracking-widest uppercase text-gold hover:text-gold-light items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          {related.length === 0 ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
