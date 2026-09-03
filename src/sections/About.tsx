import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <section id="about" className="section relative bg-charcoal border-y border-line overflow-hidden">
      <div className="glow-orb w-[700px] h-[700px] -left-60 top-1/2 -translate-y-1/2 opacity-40" />
      <div className="wrap relative grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-gold/20" />
          <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-gold/10" />
          <div className="absolute w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
          <img src="/logo.png" alt="ECLIPSE CLOTHING 4.0 logo" className="relative w-64 md:w-80 drop-shadow-[0_0_40px_rgba(212,175,55,0.35)] animate-float" loading="lazy" />
        </motion.div>

        <Reveal>
          <span className="eyebrow">Our Story</span>
          <h2 className="mt-5 font-display font-bold uppercase leading-[1.05] text-[clamp(1.9rem,4.5vw,3.5rem)]">
            About <span className="gold-text">Eclipse</span>
          </h2>
          <p className="mt-6 text-ash leading-relaxed text-base md:text-lg">
            ECLIPSE CLOTHING 4.0 was born in Colombo for the ones who never asked for permission. We make premium oversized streetwear for individuals who move with confidence, wear their identity out loud, and treat every day like a statement.
          </p>
          <p className="mt-4 text-ash leading-relaxed">
            Individuality is our fabric. Every tee is cut heavy, dyed deep and finished with intention — then handed to you to make your own. Print your art, your words, your world. In the dark, the boldest light is yours.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ['4.0', 'Generation of Eclipse'],
              ['240+', 'GSM heavyweight cotton'],
              ['1 of 1', 'Every custom print'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl md:text-3xl gold-text">{n}</p>
                <p className="text-xs text-smoke mt-1 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
