import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import Reveal from '../components/Reveal';
import { PRODUCTS } from '../lib/products';
import type { Product } from '../lib/types';

export default function LatestDrop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latest = PRODUCTS.filter((p) => p.is_new)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 4);
    setProducts(latest);
    setLoading(false);
  }, []);

  return (
    <section id="new" className="section relative bg-charcoal border-y border-line overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-line min-h-[480px] lg:min-h-full group"
          >
            <img src="/images/editorial-1.jpg" alt="Editorial look from the latest Eclipse drop" loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
            <span className="absolute top-5 left-5 badge badge-gold">New Drop</span>
            <div className="absolute bottom-0 inset-x-0 p-8">
              <span className="eyebrow">Season 4.0</span>
              <h2 className="mt-4 font-display font-bold uppercase leading-[1.02] text-[clamp(2rem,4.5vw,3.5rem)]">
                The latest
                <br />
                <span className="gold-text">drop.</span>
              </h2>
              <p className="mt-4 text-ash max-w-sm text-sm leading-relaxed">Fresh silhouettes, deeper colours and new print stories. Limited runs — once it’s gone, it’s gone.</p>
              <Link to="/shop?category=new-arrivals" className="btn btn-gold mt-6">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <div className="flex flex-col">
            <Reveal className="flex items-center justify-between mb-6">
              <p className="font-display text-[0.62rem] tracking-[0.3em] uppercase text-ash">Just landed</p>
              <Link to="/shop?category=new-arrivals" className="text-xs text-gold hover:text-gold-light font-display tracking-widest uppercase inline-flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </Reveal>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ProductGridSkeleton count={2} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
