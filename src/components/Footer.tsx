import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { SOCIAL, WHATSAPP_DISPLAY, whatsappLink } from '../lib/format';
import NewsletterForm from './NewsletterForm';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 6.7a4.9 4.9 0 0 1-3.8-4.4V2h-3.4v13.2a2.9 2.9 0 1 1-2-2.7V9a6.3 6.3 0 1 0 5.4 6.2V8.9a8.2 8.2 0 0 0 4.8 1.5V7a4.9 4.9 0 0 1-1-.3Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-line overflow-hidden">
      <div className="gold-line absolute top-0 inset-x-0" />
      <div className="glow-orb w-[600px] h-[300px] -bottom-40 left-1/2 -translate-x-1/2 opacity-40" />

      <div className="wrap relative pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <img src="/logo.png" alt="ECLIPSE CLOTHING 4.0" className="h-20 w-auto" />
            <p className="mt-5 font-display font-bold text-sm tracking-wide uppercase leading-relaxed">
              Wear the dark. <span className="gold-text">Define your style.</span>
            </p>
            <p className="mt-4 text-sm text-ash leading-relaxed max-w-sm">
              Premium oversized streetwear and custom print T-shirts from Sri Lanka. Designed for those who stand apart. Every piece is crafted with heavyweight cotton and finished with intent.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: SOCIAL.instagram, label: 'Instagram', icon: <Instagram size={17} strokeWidth={1.6} /> },
                { href: SOCIAL.tiktok, label: 'TikTok', icon: <TikTokIcon size={16} /> },
                { href: SOCIAL.facebook, label: 'Facebook', icon: <Facebook size={17} strokeWidth={1.6} /> },
                { href: whatsappLink('Hi ECLIPSE, I have a question.'), label: 'WhatsApp', icon: <MessageCircle size={17} strokeWidth={1.6} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center border border-line text-ash hover:text-gold hover:border-gold/60 hover:shadow-gold transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[0.62rem] tracking-[0.3em] uppercase text-gold mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-ash">
              <li><Link to="/shop" className="hover:text-gold transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=oversized" className="hover:text-gold transition-colors">Oversized T-Shirts</Link></li>
              <li><Link to="/shop?category=custom-print" className="hover:text-gold transition-colors">Custom Print T-Shirts</Link></li>
              <li><Link to="/shop?category=new-arrivals" className="hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=best-sellers" className="hover:text-gold transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[0.62rem] tracking-[0.3em] uppercase text-gold mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-ash">
              <li><Link to="/#about" className="hover:text-gold transition-colors">About Eclipse</Link></li>
              <li><Link to="/custom-print" className="hover:text-gold transition-colors">Create Your Custom Tee</Link></li>
              <li><Link to="/#why" className="hover:text-gold transition-colors">Why Eclipse</Link></li>
              <li><Link to="/wishlist" className="hover:text-gold transition-colors">Wishlist</Link></li>
              <li><Link to="/#contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[0.62rem] tracking-[0.3em] uppercase text-gold mb-5">Join the inner circle</h4>
            <p className="text-sm text-ash mb-4">Early access to drops, custom print offers and exclusive releases.</p>
            <NewsletterForm compact />
            <p className="mt-6 text-sm text-ash">
              WhatsApp: <a href={whatsappLink('Hi ECLIPSE!')} target="_blank" rel="noreferrer" className="text-ivory hover:text-gold">{WHATSAPP_DISPLAY}</a>
            </p>
            <p className="text-sm text-ash">Colombo, Sri Lanka · Island-wide delivery</p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-smoke">
          <p>© 2026 ECLIPSE CLOTHING 4.0. All Rights Reserved.</p>
          <p className="font-display text-[0.55rem] tracking-[0.25em] uppercase">Prices include tax · Made in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
