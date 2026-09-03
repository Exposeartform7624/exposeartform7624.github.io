import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Palette, Ruler, Shirt, Upload } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { WHATSAPP_DISPLAY, whatsappLink } from '../lib/format';

const STEPS = [
  { icon: Palette, title: 'Choose your T-shirt colour', text: 'Black, Bone, Charcoal, Oxblood, Forest and more heavyweight bases.' },
  { icon: Ruler, title: 'Choose your size', text: 'S to XXL in a true oversized cut. Check our size guide for the perfect drop.' },
  { icon: Upload, title: 'Send us your design', text: 'Artwork, photo, logo or text — PNG, JPG or PDF. We’ll check print quality for you.' },
  { icon: CheckCircle2, title: 'Confirm your order', text: 'We share a mock-up and final price. Approve it, and we start printing.' },
  { icon: Shirt, title: 'Get your custom Eclipse T-shirt', text: 'Delivered island-wide in 3–5 working days. Wear it like you mean it.' },
];

export default function MakeItYours() {
  return (
    <section id="custom" className="section relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/custom-print.jpg" alt="" aria-hidden className="w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void" />
        <div className="absolute inset-0 grid-lines" />
      </div>

      <div className="wrap relative">
        <SectionHeading eyebrow="Custom Orders" title="Make it" highlight="yours." subtitle="Five steps between your idea and a one-of-one Eclipse tee. Simple, fast, and handled personally over WhatsApp." align="center" />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card relative p-6 group"
            >
              <span className="absolute top-4 right-5 font-display text-4xl font-black text-line group-hover:text-gold/30 transition-colors">0{i + 1}</span>
              <div className="w-12 h-12 flex items-center justify-center border border-gold/40 text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300">
                <s.icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 font-display text-[0.7rem] tracking-[0.15em] uppercase leading-relaxed">{s.title}</h3>
              <p className="mt-3 text-sm text-ash leading-relaxed">{s.text}</p>
              {i < STEPS.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gold/40" />}
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <a href={whatsappLink('Hi ECLIPSE CLOTHING 4.0! I want to order a custom print T-shirt.')} target="_blank" rel="noreferrer" className="btn btn-whatsapp text-sm px-10 py-5">
            <MessageCircle size={18} /> Order via WhatsApp
          </a>
          <p className="text-sm text-ash">
            {WHATSAPP_DISPLAY} · or use the{' '}
            <Link to="/custom-print" className="text-gold hover:text-gold-light underline underline-offset-4">
              custom tee builder
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
