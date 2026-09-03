import { motion } from 'framer-motion';
import { BadgePercent, Crown, Palette, PenTool } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const FEATURES = [
  { icon: Crown, title: 'Premium Streetwear', text: 'Heavyweight 240+ GSM cotton, reinforced seams and a true oversized silhouette that drapes exactly how it should.' },
  { icon: PenTool, title: 'Custom Prints', text: 'Your artwork, photo or text printed with high-density inks that stay sharp wash after wash. One of one, always.' },
  { icon: Palette, title: 'Multiple Colours', text: 'Eight deep, muted bases from Void Black to Bone and Oxblood — curated to keep every print looking intentional.' },
  { icon: BadgePercent, title: 'Affordable Premium', text: 'Luxury quality from LKR 2,650 with tax included. No hidden costs, no compromises on fabric or finish.' },
];

export default function WhyEclipse() {
  return (
    <section id="why" className="section relative">
      <div className="wrap">
        <SectionHeading eyebrow="Why Eclipse" title="Built different." highlight="Worn louder." subtitle="What sets an Eclipse tee apart from everything else in your wardrobe." align="center" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="card relative p-8 overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/15 transition-colors duration-500" />
              <div className="relative w-14 h-14 flex items-center justify-center border border-gold/40 text-gold group-hover:bg-gold group-hover:text-void group-hover:shadow-gold transition-all duration-300">
                <f.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-display font-bold text-xs tracking-[0.2em] uppercase">{f.title}</h3>
              <p className="mt-4 text-sm text-ash leading-relaxed">{f.text}</p>
              <div className="mt-6 h-px w-10 bg-gold/50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
