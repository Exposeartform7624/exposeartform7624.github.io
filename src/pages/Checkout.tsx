import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Landmark, Lock, MessageCircle, Minus, Plus, Trash2 } from 'lucide-react';
import Seo from '../components/Seo';
import { useCart } from '../contexts/CartContext';
import { api } from '../lib/api';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, formatLKR } from '../lib/format';
import type { Order } from '../lib/types';

const PAYMENTS = [
  { key: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Banknote },
  { key: 'bank', label: 'Bank Transfer', desc: 'Details shown after order', icon: Landmark },
  { key: 'whatsapp', label: 'Confirm via WhatsApp', desc: 'We finalise payment with you', icon: MessageCircle },
] as const;

export default function Checkout() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postal_code: '', notes: '' });
  const [payment, setPayment] = useState<'cod' | 'bank' | 'whatsapp'>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.address.trim().length < 5) e.address = 'Delivery address is required';
    if (!form.city.trim()) e.city = 'City is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');
    try {
      const order = await api<Order>('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ customer: form, items: items.map((i) => ({ product_id: i.product_id, qty: i.qty, size: i.size, colour: i.colour })), payment_method: payment }),
      });
      clear();
      navigate(`/order/${order.order_number}`, { state: order });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Seo title="Checkout — ECLIPSE CLOTHING 4.0" />
        <div className="wrap pt-48 pb-32 text-center">
          <span className="eyebrow justify-center">Checkout</span>
          <h1 className="mt-4 font-display font-bold text-3xl uppercase">Your cart is empty</h1>
          <p className="text-ash mt-3">Add something bold before you check out.</p>
          <Link to="/shop" className="btn btn-gold mt-8">
            Shop Now
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Checkout — ECLIPSE CLOTHING 4.0" description="Secure checkout for your ECLIPSE order. Cash on delivery, bank transfer or WhatsApp confirmation." />
      <div className="wrap pt-32 md:pt-40 pb-24">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs text-ash hover:text-gold mb-6">
          <ArrowLeft size={14} /> Continue shopping
        </Link>
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">Secure checkout</span>
            <h1 className="mt-3 font-display font-bold uppercase text-3xl md:text-4xl">
              Complete your <span className="gold-text">order</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-smoke">
            <Lock size={13} className="text-gold" /> Your details are private
          </div>
        </div>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start" noValidate>
          <div className="space-y-10">
            <section className="card p-6 md:p-8">
              <h2 className="font-display text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
                <span className="text-gold">01</span> Delivery details
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="co-name">Full name *</label>
                  <input id="co-name" className={`input ${errors.name ? 'error' : ''}`} value={form.name} onChange={set('name')} placeholder="Your full name" />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="co-phone">Phone *</label>
                  <input id="co-phone" type="tel" className={`input ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={set('phone')} placeholder="+94 7X XXX XXXX" />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="co-email">Email</label>
                  <input id="co-email" type="email" className={`input ${errors.email ? 'error' : ''}`} value={form.email} onChange={set('email')} placeholder="you@email.com" />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="co-address">Address *</label>
                  <input id="co-address" className={`input ${errors.address ? 'error' : ''}`} value={form.address} onChange={set('address')} placeholder="House no., street, area" />
                  {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="co-city">City *</label>
                  <input id="co-city" className={`input ${errors.city ? 'error' : ''}`} value={form.city} onChange={set('city')} placeholder="Colombo" />
                  {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="co-postal">Postal code</label>
                  <input id="co-postal" className="input" value={form.postal_code} onChange={set('postal_code')} placeholder="00100" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="co-notes">Order notes</label>
                  <textarea id="co-notes" rows={3} className="input resize-none" value={form.notes} onChange={set('notes')} placeholder="Delivery instructions, gift note, etc." />
                </div>
              </div>
            </section>

            <section className="card p-6 md:p-8">
              <h2 className="font-display text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
                <span className="text-gold">02</span> Payment method
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {PAYMENTS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPayment(p.key)}
                    className={`text-left p-4 border transition-all ${payment === p.key ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-ash'}`}
                  >
                    <p.icon size={20} className={payment === p.key ? 'text-gold' : 'text-ash'} strokeWidth={1.6} />
                    <p className="mt-3 text-sm font-semibold">{p.label}</p>
                    <p className="text-xs text-smoke mt-1">{p.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="card p-6 md:p-8 lg:sticky lg:top-32">
            <h2 className="font-display text-xs tracking-[0.25em] uppercase mb-6">Order summary</h2>
            <ul className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.key} className="flex gap-3">
                  <img src={i.image} alt={i.name} className="w-16 h-20 object-cover border border-line" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{i.name}</p>
                    <p className="text-xs text-ash">
                      {i.size} · {i.colour}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-stretch border border-line">
                        <button type="button" onClick={() => updateQty(i.key, i.qty - 1)} className="px-2 hover:text-gold" aria-label="Decrease">
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center text-xs flex items-center justify-center border-x border-line">{i.qty}</span>
                        <button type="button" onClick={() => updateQty(i.key, i.qty + 1)} className="px-2 hover:text-gold" aria-label="Increase">
                          <Plus size={11} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-display text-gold">{formatLKR(i.price * i.qty)}</span>
                        <button type="button" onClick={() => removeItem(i.key)} className="text-smoke hover:text-red-400" aria-label="Remove">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 pt-5 border-t border-line space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ash">Subtotal</dt>
                <dd>{formatLKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ash">Delivery</dt>
                <dd className={shipping === 0 ? 'text-gold' : ''}>{shipping === 0 ? 'Free' : formatLKR(shipping)}</dd>
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-line">
                <dt className="font-display text-[0.6rem] tracking-[0.25em] uppercase text-ash">Total</dt>
                <dd className="font-display text-2xl gold-text">{formatLKR(total)}</dd>
              </div>
            </dl>
            <p className="text-[0.62rem] text-smoke uppercase tracking-widest mt-2">Prices include tax</p>

            {serverError && <p className="mt-4 text-sm text-red-400">{serverError}</p>}

            <button type="submit" disabled={submitting} className="btn btn-gold w-full mt-6">
              {submitting ? 'Placing order…' : `Place Order · ${formatLKR(total)}`}
            </button>
            <p className="mt-3 text-xs text-smoke text-center flex items-center justify-center gap-1.5">
              <Lock size={11} /> We’ll confirm your order on WhatsApp
            </p>
          </aside>
        </form>
      </div>
    </>
  );
}
