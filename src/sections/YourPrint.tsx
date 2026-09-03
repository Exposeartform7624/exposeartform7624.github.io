import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import { TEE_COLOURS, isLight } from '../lib/format';

export default function YourPrint() {
  return (
    <section id="oversized" className="relative py-6">
      <div className="wrap">
        <div className="relative overflow-hidden border border-line bg-charcoal grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden group">
            <img src="/images/editorial-2.jpg" alt="Stack of oversized T-shirts in multiple colours" loading="lazy" className="img-zoom w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-charcoal" />
            <span className="absolute top-5 left-5 badge badge-gold">
              <Sparkles size={11} /> Oversized Custom Print
            </span>
          </div>

          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="glow-orb w-80 h-80 -right-20 -bottom-20 opacity-40" />
            <Reveal>
              <span className="eyebrow">Oversized T-Shirts</span>
              <h2 className="mt-5 font-display font-bold uppercase leading-[1.02] text-[clamp(1.9rem,4.5vw,3.5rem)]">
                Your style.
                <br />
                <span className="gold-text">Your print.</span>
              </h2>
              <p className="mt-6 text-ash leading-relaxed max-w-md">
                Create your own oversized T-shirt with a custom print. Pick a heavyweight tee, choose your colour, and send us your artwork, photo or text — we’ll bring it to life with a premium print that’s made to last.
              </p>

              <div className="mt-8">
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke mb-3">Available in multiple colours</p>
                <div className="flex flex-wrap items-center gap-3">
                  {TEE_COLOURS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border ${isLight(c.hex) ? 'border-black/30' : 'border-white/15'} shadow-inner`}
                      style={{ background: c.hex }}
                    />
                  ))}
                  <span className="text-xs text-ash ml-1">{TEE_COLOURS.length} colours</span>
                </div>
              </div>

              <Link to="/custom-print" className="btn btn-gold mt-10 self-start">
                Create Your Custom Tee <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
