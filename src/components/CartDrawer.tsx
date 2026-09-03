import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { FREE_SHIPPING_THRESHOLD, formatLKR, whatsappLink } from '../lib/format';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count } = useCart();
  const navigate = useNavigate();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const waMessage = () => {
    const lines = items.map((i) => `• ${i.name} — Size ${i.size}, ${i.colour} × ${i.qty} = ${formatLKR(i.price * i.qty)}`);
    return `Hi ECLIPSE CLOTHING 4.0! I'd like to order:\n\n${lines.join('\n')}\n\nSubtotal: ${formatLKR(subtotal)}\n\nPlease confirm availability and delivery details.`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 z-[70] bg-void/70 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-charcoal border-l border-line flex flex-col shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.8)]"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-line">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <h2 className="font-display text-xs tracking-[0.25em] uppercase">Your Cart</h2>
                <span className="text-xs text-smoke">({count})</span>
              </div>
              <button type="button" onClick={closeCart} className="w-9 h-9 flex items-center justify-center text-ash hover:text-gold" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-line bg-void/40">
                <p className="text-xs text-ash">
                  {remaining > 0 ? (
                    <>
                      Add <span className="text-gold font-semibold">{formatLKR(remaining)}</span> more for free delivery
                    </>
                  ) : (
                    <span className="text-gold">You've unlocked free island-wide delivery</span>
                  )}
                </p>
                <div className="mt-2 h-1 bg-slate overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-gold-dark to-gold-light" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-16">
                  <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center animate-pulse-gold">
                    <ShoppingBag size={28} className="text-gold" strokeWidth={1.4} />
                  </div>
                  <div>
                    <p className="font-display text-sm uppercase tracking-widest">Your cart is empty</p>
                    <p className="text-sm text-ash mt-2">Time to wear the dark.</p>
                  </div>
                  <Link to="/shop" onClick={closeCart} className="btn btn-gold">
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((i) => (
                    <li key={i.key} className="flex gap-4">
                      <Link to={`/product/${i.slug}`} onClick={closeCart} className="w-20 h-24 shrink-0 bg-graphite overflow-hidden border border-line">
                        <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/product/${i.slug}`} onClick={closeCart} className="font-semibold text-sm leading-snug hover:text-gold truncate">
                            {i.name}
                          </Link>
                          <button type="button" onClick={() => removeItem(i.key)} className="text-smoke hover:text-red-400 shrink-0" aria-label="Remove">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-ash mt-1">
                          Size {i.size} · {i.colour}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-stretch border border-line">
                            <button type="button" onClick={() => updateQty(i.key, i.qty - 1)} className="px-2.5 hover:text-gold" aria-label="Decrease">
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs flex items-center justify-center border-x border-line">{i.qty}</span>
                            <button type="button" onClick={() => updateQty(i.key, i.qty + 1)} className="px-2.5 hover:text-gold" aria-label="Increase">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-display text-xs text-gold">{formatLKR(i.price * i.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-line px-6 py-5 space-y-4 bg-void/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ash">Subtotal</span>
                  <span className="font-display text-base gold-text">{formatLKR(subtotal)}</span>
                </div>
                <p className="text-[0.65rem] text-smoke uppercase tracking-widest">Prices include tax · Delivery calculated at checkout</p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                  className="btn btn-gold w-full"
                >
                  Checkout <ArrowRight size={14} />
                </button>
                <a href={whatsappLink(waMessage())} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full">
                  <MessageCircle size={15} /> Order via WhatsApp
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
