import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import { useWishlist } from '../contexts/WishlistContext';
import { api } from '../lib/api';
import { PRODUCTS } from '../lib/products';
import type { Product } from '../lib/types';

export default function Wishlist() {
  const { ids, loading: wlLoading } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wlLoading) return;
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    api<Product[]>(`/api/products?ids=${ids.join(',')}`)
      .then((list) => setProducts(ids.map((id) => list.find((p) => p.id === id)).filter(Boolean) as Product[]))
      .catch(() => setProducts(ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[]))
      .finally(() => setLoading(false));
  }, [ids, wlLoading]);

  return (
    <>
      <Seo title="Wishlist — ECLIPSE CLOTHING 4.0" description="Your saved ECLIPSE pieces." />
      <div className="wrap pt-32 md:pt-40 pb-24">
        <span className="eyebrow">Saved</span>
        <h1 className="mt-4 font-display font-bold uppercase text-3xl md:text-5xl">
          Your <span className="gold-text">wishlist</span>
        </h1>
        <p className="mt-3 text-ash">{ids.length} item{ids.length === 1 ? '' : 's'} saved</p>

        <div className="mt-12">
          {loading || wlLoading ? (
            <ProductGridSkeleton count={4} />
          ) : products.length === 0 ? (
            <div className="card p-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center">
                <Heart size={24} className="text-gold" strokeWidth={1.4} />
              </div>
              <p className="mt-6 font-display text-sm uppercase tracking-widest">Nothing saved yet</p>
              <p className="text-sm text-ash mt-2">Tap the heart on any product to keep it here.</p>
              <Link to="/shop" className="btn btn-gold mt-8">
                Browse the collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
