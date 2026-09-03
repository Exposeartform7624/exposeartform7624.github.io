import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import Reveal from '../components/Reveal';
import { PRODUCTS } from '../lib/products';
import { CATEGORIES } from '../lib/format';
import type { Product } from '../lib/types';

export default function ShopEclipse() {
  const [tab, setTab] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const categoryProducts = PRODUCTS.filter((p) => {
      if (tab === 'oversized' || tab === 'custom-print') return p.category === tab;
      if (tab === 'new-arrivals') return p.is_new;
      if (tab === 'best-sellers') return p.is_bestseller;
      return true;
    }).slice(0, 8);
    setProducts(categoryProducts);
    setLoading(false);
  }, [tab]);

  return (
    <section id="shop" className="section relative">
      <div className="glow-orb w-[500px] h-[500px] right-0 -top-40 opacity-30" />
      <div className="wrap relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading eyebrow="The Collection" title="Shop" highlight="Eclipse" subtitle="Heavyweight oversized tees and custom prints built for the streets of Colombo and beyond." />
          <Reveal delay={0.1} className="lg:text-right">
            <p className="font-display text-xl md:text-2xl gold-text">From LKR 2,650</p>
            <p className="text-xs text-smoke uppercase tracking-[0.25em] mt-1">Prices include tax</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5 md:mx-0 md:px-0">
          {CATEGORIES.map((c) => (
            <button key={c.key} type="button" onClick={() => setTab(c.key)} className={`chip whitespace-nowrap px-5 ${tab === c.key ? 'active' : ''}`}>
              {c.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-8">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <div className="card p-10 text-center text-ash">No products in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link to={tab === 'all' ? '/shop' : `/shop?category=${tab}`} className="btn btn-outline">
            View All Products <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
