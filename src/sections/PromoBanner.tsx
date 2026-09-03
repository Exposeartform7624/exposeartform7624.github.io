import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative py-6">
      <div className="wrap">
        <div className="relative overflow-hidden border border-gold/40 min-h-[420px] flex items-center noise">
          <img src="/images/hero.jpg" alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(212,175,55,0.22),transparent_55%)]" />
          <div className="absolute top-0 inset-x-0 gold-line" />
          <div className="absolute bottom-0 inset-x-0 gold-line" />

          <div className="relative p-8 md:p-16 max-w-3xl">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow">
              Limited Season Offer
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display font-extrabold uppercase leading-[0.98] text-[clamp(2rem,6vw,4.5rem)]"
            >
              Your style has <span className="gold-text">no limits.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 text-ash max-w-lg">
              Free island-wide delivery on orders over LKR 8,000. Build your rotation, or build something no one else owns.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/shop" className="btn btn-gold">
                Explore Collection <ArrowRight size={14} />
              </Link>
              <Link to="/custom-print" className="btn btn-outline">
                Design Your Own
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
