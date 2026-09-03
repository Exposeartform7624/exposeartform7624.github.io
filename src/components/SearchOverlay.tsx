import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import { PRODUCTS } from '../lib/products';
import type { Product } from '../lib/types';
import { formatLKR } from '../lib/format';

const SUGGESTIONS = ['Oversized', 'Black', 'Custom print', 'Gold', 'Bone', 'New drop'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQ('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      api<Product[]>(`/api/products?search=${encodeURIComponent(q.trim())}&limit=8`)
        .then(setResults)
        .catch(() => {
          const term = q.trim().toLowerCase();
          setResults(PRODUCTS.filter((p) => `${p.name} ${p.description} ${p.category} ${p.fabric} ${p.colours.map((c) => c.name).join(' ')}`.toLowerCase().includes(term)).slice(0, 8));
        })
        .finally(() => setLoading(false));
    }, 280);
    return () => clearTimeout(t);
  }, [q]);

  const goToShop = () => {
    setSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[75] bg-void/95 backdrop-blur-xl overflow-y-auto">
          <div className="wrap pt-8 md:pt-16 pb-16">
            <div className="flex items-center justify-between mb-8">
              <span className="eyebrow">Search Eclipse</span>
              <button type="button" onClick={() => setSearchOpen(false)} className="w-10 h-10 flex items-center justify-center border border-line text-ash hover:text-gold hover:border-gold" aria-label="Close search">
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) goToShop();
              }}
              className="relative border-b border-gold/50 focus-within:border-gold transition-colors"
            >
              <Search size={22} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, colours, styles…"
                className="w-full bg-transparent pl-10 pr-4 py-5 font-display text-lg md:text-3xl uppercase tracking-tight placeholder:text-smoke/60 placeholder:normal-case placeholder:tracking-normal placeholder:font-body outline-none"
              />
            </form>

            {!q.trim() && (
              <div className="mt-8">
                <p className="text-xs text-smoke uppercase tracking-widest mb-3">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)} className="chip">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              {loading && (
                <div className="flex justify-center py-10">
                  <div className="spinner" />
                </div>
              )}
              {!loading && q.trim() && results.length === 0 && <p className="text-ash text-center py-10">No products match “{q}”. Try “oversized” or “custom print”.</p>}
              {!loading && results.length > 0 && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <Link to={`/product/${p.slug}`} onClick={() => setSearchOpen(false)} className="card group block">
                          <div className="aspect-[4/5] overflow-hidden">
                            <img src={p.images[0]} alt={p.name} className="img-zoom w-full h-full object-cover" />
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-semibold truncate">{p.name}</p>
                            <p className="text-xs text-gold font-display mt-1">{formatLKR(p.price)}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <button type="button" onClick={goToShop} className="btn btn-outline mt-8">
                    View all results <ArrowRight size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
