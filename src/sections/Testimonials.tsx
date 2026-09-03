import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck, Quote } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import StarRating from '../components/StarRating';
import { api } from '../lib/api';
import type { Review } from '../lib/types';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Review[]>('/api/reviews?featured=1&limit=6')
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="reviews" className="section relative">
      <div className="wrap">
        <SectionHeading eyebrow="Customer Reviews" title="Worn by" highlight="the bold." subtitle="Real words from the Eclipse community across Sri Lanka." />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [0, 1, 2].map((i) => (
                <div key={i} className="card p-7 space-y-3">
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-5/6" />
                </div>
              ))
            : reviews.map((r, i) => (
                <motion.figure
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                  className="card relative p-7 flex flex-col"
                >
                  <Quote size={28} className="absolute top-5 right-5 text-gold/20" />
                  <StarRating value={r.rating} size={13} />
                  {r.title && <h3 className="mt-4 font-semibold">{r.title}</h3>}
                  <blockquote className="mt-3 text-sm text-ash leading-relaxed flex-1">“{r.body}”</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-line flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        {r.name}
                        {r.verified && <BadgeCheck size={14} className="text-gold" />}
                      </p>
                      {r.product && (
                        <Link to={`/product/${r.product.slug}`} className="text-xs text-smoke hover:text-gold">
                          {r.product.name}
                        </Link>
                      )}
                    </div>
                    <span className="font-display text-[0.55rem] tracking-widest uppercase text-gold/70">Eclipse</span>
                  </figcaption>
                </motion.figure>
              ))}
        </div>
      </div>
    </section>
  );
}
