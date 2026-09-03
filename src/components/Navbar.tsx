import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUI } from '../contexts/UIContext';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom-print', label: 'Custom Print' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const { ids } = useWishlist();
  const { setSearchOpen } = useUI();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome || open;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="bg-gold text-void text-center font-display text-[0.55rem] tracking-[0.28em] uppercase py-1.5 px-4">
        Free island-wide delivery on orders over LKR 8,000 &nbsp;•&nbsp; Prices include tax
      </div>
      <nav
        className={`transition-all duration-500 border-b ${
          solid ? 'bg-void/90 backdrop-blur-xl border-line/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="ECLIPSE CLOTHING 4.0 home">
            <img src="/logo.png" alt="ECLIPSE CLOTHING 4.0" className="h-12 md:h-14 w-auto drop-shadow-[0_0_14px_rgba(212,175,55,0.35)]" />
          </Link>

          <ul className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <li key={l.to}>
                {l.to.startsWith('/#') ? (
                  <Link to={l.to} className="link-underline font-display text-[0.62rem] tracking-[0.25em] uppercase text-ash hover:text-ivory transition-colors">
                    {l.label}
                  </Link>
                ) : (
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `link-underline font-display text-[0.62rem] tracking-[0.25em] uppercase transition-colors ${isActive && !location.hash ? 'text-gold active' : 'text-ash hover:text-ivory'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="w-10 h-10 flex items-center justify-center text-ash hover:text-gold transition-colors" aria-label="Search">
              <Search size={19} strokeWidth={1.6} />
            </button>
            <Link to="/wishlist" className="relative w-10 h-10 flex items-center justify-center text-ash hover:text-gold transition-colors" aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.6} />
              {ids.length > 0 && (
                <span className="absolute top-1 right-0.5 min-w-4 h-4 px-1 bg-gold text-void text-[0.6rem] font-bold flex items-center justify-center rounded-full">{ids.length}</span>
              )}
            </Link>
            <button type="button" onClick={openCart} className="relative w-10 h-10 flex items-center justify-center text-ash hover:text-gold transition-colors" aria-label="Cart">
              <ShoppingBag size={19} strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute top-1 right-0.5 min-w-4 h-4 px-1 bg-gold text-void text-[0.6rem] font-bold flex items-center justify-center rounded-full">{count}</span>
              )}
            </button>
            <button type="button" onClick={() => setOpen((o) => !o)} className="lg:hidden w-10 h-10 flex items-center justify-center text-ivory hover:text-gold" aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-void/95 backdrop-blur-xl border-t border-line"
            >
              <ul className="wrap py-6 flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <Link to={l.to} className="flex items-center justify-between py-3.5 border-b border-line/60 font-display text-xs tracking-[0.25em] uppercase text-ivory hover:text-gold">
                      {l.label}
                      <span className="text-gold text-[0.6rem]">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-4 grid grid-cols-2 gap-3">
                  <Link to="/shop" className="btn btn-gold btn-sm">Shop Now</Link>
                  <Link to="/custom-print" className="btn btn-outline btn-sm">Custom Print</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
