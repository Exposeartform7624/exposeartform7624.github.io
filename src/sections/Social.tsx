import { motion } from 'framer-motion';
import { ArrowUpRight, Facebook, Instagram } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { SOCIAL } from '../lib/format';

function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 6.7a4.9 4.9 0 0 1-3.8-4.4V2h-3.4v13.2a2.9 2.9 0 1 1-2-2.7V9a6.3 6.3 0 1 0 5.4 6.2V8.9a8.2 8.2 0 0 0 4.8 1.5V7a4.9 4.9 0 0 1-1-.3Z" />
    </svg>
  );
}

const CHANNELS = [
  { name: 'Instagram', handle: '@eclipseclothing4.0', href: SOCIAL.instagram, icon: <Instagram size={26} strokeWidth={1.4} />, text: 'Daily fits, drops and behind the print.' },
  { name: 'TikTok', handle: '@eclipseclothing4.0', href: SOCIAL.tiktok, icon: <TikTokIcon size={24} />, text: 'Unboxings, styling and street moments.' },
  { name: 'Facebook', handle: 'Eclipse Clothing 4.0', href: SOCIAL.facebook, icon: <Facebook size={26} strokeWidth={1.4} />, text: 'Community, announcements and offers.' },
];

export default function Social() {
  return (
    <section id="social" className="section relative">
      <div className="wrap">
        <SectionHeading eyebrow="Community" title="Follow the" highlight="Eclipse" subtitle="Tag us in your fit. The boldest looks get featured." align="center" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card group p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/10 group-hover:to-transparent transition-all duration-500" />
              <div className="relative flex items-start justify-between">
                <div className="w-14 h-14 flex items-center justify-center border border-gold/40 text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300">{c.icon}</div>
                <ArrowUpRight size={18} className="text-smoke group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="relative mt-7 font-display font-bold text-sm uppercase tracking-widest">{c.name}</h3>
              <p className="relative text-gold text-sm mt-1">{c.handle}</p>
              <p className="relative mt-4 text-sm text-ash">{c.text}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
