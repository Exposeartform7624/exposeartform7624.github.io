import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, PenTool } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden noise" id="top">
      <img src="/images/hero.jpg" alt="Models wearing ECLIPSE oversized streetwear T-shirts" className="absolute inset-0 w-full h-full object-cover object-[65%_center] md:object-center" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="glow-orb w-[520px] h-[520px] -left-40 top-1/3 opacity-50" />

      <div className="wrap relative z-10 pt-32 pb-24 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <motion.img
            src="/logo.png"
            alt="ECLIPSE CLOTHING 4.0"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease }}
            className="h-32 md:h-44 w-auto -ml-2 drop-shadow-[0_0_40px_rgba(212,175,55,0.35)] animate-float"
          />

          <motion.span initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="eyebrow mt-6">
            Luxury Streetwear · Sri Lanka
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="mt-5 font-display font-extrabold uppercase leading-[0.98] tracking-tight text-[clamp(2.1rem,7vw,5.4rem)]"
          >
            Wear the dark.
            <br />
            <span className="gold-text">Define your style.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease }} className="mt-6 max-w-xl text-base md:text-lg text-ash leading-relaxed">
            Premium oversized streetwear and custom print T-shirts designed for those who stand apart.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease }} className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="btn btn-gold">
              Shop Now <ArrowRight size={15} />
            </Link>
            <Link to="/custom-print" className="btn btn-outline">
              <PenTool size={14} /> Custom Print
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-12 grid grid-cols-3 gap-4 max-w-lg border-t border-line/70 pt-6">
            {[
              ['From LKR 2,650', 'Prices include tax'],
              ['Island-wide', 'Fast delivery'],
              ['Custom Prints', 'Your design, your tee'],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-display text-[0.7rem] md:text-xs text-gold tracking-wider uppercase">{a}</p>
                <p className="text-[0.7rem] md:text-xs text-smoke mt-1">{b}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#shop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-smoke hover:text-gold transition-colors"
        aria-label="Scroll to shop"
      >
        <span className="font-display text-[0.5rem] tracking-[0.35em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.a>

      <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 vertical-text font-display text-[0.55rem] tracking-[0.5em] uppercase text-smoke/70">
        Eclipse Clothing 4.0 — Est. Colombo
      </div>
    </section>
  );
}
