import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import { api } from '../lib/api';
import { PRODUCTS } from '../lib/products';
import { CATEGORIES, SIZES, TEE_COLOURS, categoryLabel, formatLKR, isLight } from '../lib/format';
import type { Product } from '../lib/types';

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'Newest' },
  { key: 'popular', label: 'Most Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
];

const PRICE_MAX = 5000;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const q = params.get('q') || '';
  const colour = params.get('colour') || '';
  const size = params.get('size') || '';
  const sort = params.get('sort') || 'featured';
  const max = Number(params.get('max') || PRICE_MAX);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(q);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === '' || v === 'all' || (k === 'sort' && v === 'featured') || (k === 'max' && Number(v) >= PRICE_MAX)) next.delete(k);
      else next.set(k, v);
    });
    setParams(next, { replace: true });
  };

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== q) update({ q: searchInput });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    if (category !== 'all') sp.set('category', category);
    if (q) sp.set('search', q);
    if (colour) sp.set('colour', colour);
    if (size) sp.set('size', size);
    if (sort && sort !== 'featured') sp.set('sort', sort);
    if (max < PRICE_MAX) sp.set('max', String(max));
    return sp.toString();
  }, [category, q, colour, size, sort, max]);

  useEffect(() => {
    setLoading(true);
    api<Product[]>(`/api/products?${queryString}`)
      .then(setProducts)
      .catch(() => {
        const filtered = PRODUCTS.filter((p) => {
          if (category === 'oversized' || category === 'custom-print') return p.category === category;
          if (category === 'new-arrivals') return p.is_new;
          if (category === 'best-sellers') return p.is_bestseller;
          if (q && !`${p.name} ${p.description} ${p.category} ${p.fabric}`.toLowerCase().includes(q.toLowerCase())) return false;
          if (colour && !p.colours.some((c) => c.name.toLowerCase() === colour.toLowerCase())) return false;
          if (size && !p.sizes.includes(size)) return false;
          if (p.price > max) return false;
          return true;
        });
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  const activeCount = [category !== 'all', !!colour, !!size, max < PRICE_MAX, !!q].filter(Boolean).length;
  const clearAll = () => setParams({}, { replace: true });

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="label">Category</h4>
        <ul className="space-y-1">
          {CATEGORIES.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => update({ category: c.key })}
                className={`w-full text-left py-2 text-sm transition-colors flex items-center justify-between group ${category === c.key ? 'text-gold' : 'text-ash hover:text-ivory'}`}
              >
                {c.label}
                <span className={`w-1.5 h-1.5 rotate-45 ${category === c.key ? 'bg-gold' : 'bg-transparent group-hover:bg-line'}`} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="label">Colour</h4>
        <div className="flex flex-wrap gap-2.5">
          {TEE_COLOURS.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              aria-label={c.name}
              onClick={() => update({ colour: colour === c.name ? null : c.name })}
              className={`swatch ${colour === c.name ? 'active' : ''} ${isLight(c.hex) ? 'border-black/30' : ''}`}
              style={{ background: c.hex, width: 30, height: 30 }}
            />
          ))}
        </div>
        {colour && <p className="text-xs text-gold mt-2">{colour}</p>}
      </div>

      <div>
        <h4 className="label">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} type="button" onClick={() => update({ size: size === s ? null : s })} className={`chip ${size === s ? 'active' : ''}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h4 className="label mb-0">Max price</h4>
          <span className="text-xs text-gold font-display">{max >= PRICE_MAX ? 'Any' : formatLKR(max)}</span>
        </div>
        <input
          type="range"
          min={2500}
          max={PRICE_MAX}
          step={50}
          value={max}
          onChange={(e) => update({ max: e.target.value })}
          className="w-full mt-3 accent-gold"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-[0.65rem] text-smoke mt-1">
          <span>LKR 2,500</span>
          <span>LKR 5,000+</span>
        </div>
      </div>

      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="btn btn-ghost btn-sm w-full">
          <X size={12} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Seo title={`${categoryLabel(category)} — ECLIPSE CLOTHING 4.0`} description="Shop premium oversized T-shirts and custom print tees. Filter by colour, size and price. From LKR 2,650, prices include tax." />

      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden border-b border-line bg-charcoal">
        <div className="absolute inset-0 grid-lines" />
        <div className="glow-orb w-[500px] h-[500px] -right-40 -top-40 opacity-40" />
        <div className="wrap relative">
          <span className="eyebrow">Shop Eclipse</span>
          <motion.h1 key={category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display font-bold uppercase leading-none text-[clamp(2rem,6vw,4.5rem)]">
            {category === 'all' ? (
              <>
                All <span className="gold-text">Products</span>
              </>
            ) : (
              <span className="gold-text">{categoryLabel(category)}</span>
            )}
          </motion.h1>
          <p className="mt-4 text-ash">
            From <span className="text-gold">LKR 2,650</span> · Prices include tax · Free delivery over LKR 8,000
          </p>
        </div>
      </section>

      <section className="wrap py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search products…" className="input pl-11" aria-label="Search products" />
            {searchInput && (
              <button type="button" onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-ivory" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1 md:flex-none">
              <select value={sort} onChange={(e) => update({ sort: e.target.value })} className="input appearance-none pr-10 cursor-pointer md:w-56" aria-label="Sort products">
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
            </div>
            <button type="button" onClick={() => setFiltersOpen(true)} className="btn btn-ghost lg:hidden">
              <SlidersHorizontal size={14} /> Filters {activeCount > 0 && <span className="bg-gold text-void text-[0.6rem] px-1.5 rounded-full">{activeCount}</span>}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block sticky top-32 self-start">{Filters}</aside>

          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-smoke uppercase tracking-widest">{loading ? 'Loading…' : `${products.length} product${products.length === 1 ? '' : 's'}`}</p>
              {q && (
                <p className="text-xs text-ash">
                  Results for “<span className="text-gold">{q}</span>”
                </p>
              )}
            </div>

            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : products.length === 0 ? (
              <div className="card p-14 text-center">
                <p className="font-display text-sm uppercase tracking-widest">Nothing found</p>
                <p className="text-sm text-ash mt-2">Try a different search or clear your filters.</p>
                <button type="button" onClick={clearAll} className="btn btn-outline btn-sm mt-6">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-[70] bg-void/70 backdrop-blur-sm lg:hidden" />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 bottom-0 z-[80] w-full max-w-xs bg-charcoal border-r border-line p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xs tracking-[0.25em] uppercase">Filters</h3>
                <button type="button" onClick={() => setFiltersOpen(false)} className="text-ash hover:text-gold" aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              {Filters}
              <button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-gold w-full mt-8">
                Show {products.length} results
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
