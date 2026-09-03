import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, MessageCircle, Package, Truck } from 'lucide-react';
import Seo from '../components/Seo';
import { api } from '../lib/api';
import { formatLKR, whatsappLink } from '../lib/format';
import type { Order } from '../lib/types';
import { useUI } from '../contexts/UIContext';

const PAYMENT_LABEL: Record<string, string> = { cod: 'Cash on Delivery', bank: 'Bank Transfer', whatsapp: 'Confirm via WhatsApp' };

export default function OrderConfirmation() {
  const { number } = useParams();
  const location = useLocation();
  const { toast } = useUI();
  const [order, setOrder] = useState<Order | null>((location.state as Order | null) || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState('');

  useEffect(() => {
    if (order || !number) return;
    api<Order>(`/api/orders?number=${encodeURIComponent(number)}`)
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [number, order]);

  if (loading) {
    return (
      <div className="wrap pt-48 pb-32 flex justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="wrap pt-48 pb-32 text-center">
        <span className="eyebrow justify-center">Order</span>
        <h1 className="mt-4 font-display font-bold text-3xl uppercase">Order not found</h1>
        <p className="text-ash mt-3">{error || 'We couldn’t find that order number.'}</p>
        <Link to="/shop" className="btn btn-gold mt-8">
          Back to shop
        </Link>
      </div>
    );
  }

  const waMsg = `Hi ECLIPSE CLOTHING 4.0! I just placed order ${order.order_number}.\n\n${order.items.map((i) => `• ${i.product_name} — ${i.size}, ${i.colour} × ${i.qty}`).join('\n')}\n\nTotal: ${formatLKR(order.total)}\nPayment: ${PAYMENT_LABEL[order.payment_method]}\n\nPlease confirm my order.`;

  return (
    <>
      <Seo title={`Order ${order.order_number} confirmed — ECLIPSE CLOTHING 4.0`} />
      <div className="wrap pt-32 md:pt-40 pb-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full border border-gold/50 flex items-center justify-center shadow-gold-lg animate-pulse-gold">
            <CheckCircle2 size={36} className="text-gold" strokeWidth={1.5} />
          </div>
          <span className="eyebrow justify-center mt-8">Order confirmed</span>
          <h1 className="mt-4 font-display font-extrabold uppercase text-3xl md:text-5xl leading-none">
            You’re in the <span className="gold-text">dark.</span>
          </h1>
          <p className="mt-4 text-ash">Thank you, {order.customer_name.split(' ')[0]}. Your order has been received and we’ll confirm it on WhatsApp shortly.</p>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(order.order_number);
              toast('Order number copied', 'info');
            }}
            className="mt-6 inline-flex items-center gap-3 border border-gold/40 px-5 py-3 hover:bg-gold/5"
          >
            <span className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">Order No.</span>
            <span className="font-display text-lg gold-text">{order.order_number}</span>
            <Copy size={14} className="text-gold" />
          </button>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-[1fr_1fr] gap-6">
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-xs tracking-[0.25em] uppercase mb-5 flex items-center gap-2">
              <Package size={15} className="text-gold" /> Items
            </h2>
            <ul className="space-y-4">
              {order.items.map((i) => (
                <li key={i.id} className="flex gap-3">
                  {i.image && <img src={i.image} alt={i.product_name} className="w-14 h-18 object-cover border border-line" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{i.product_name}</p>
                    <p className="text-xs text-ash">
                      {i.size} · {i.colour} · × {i.qty}
                    </p>
                  </div>
                  <p className="text-sm font-display text-gold">{formatLKR(i.line_total)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 pt-4 border-t border-line space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ash">Subtotal</dt>
                <dd>{formatLKR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ash">Delivery</dt>
                <dd>{Number(order.shipping) === 0 ? 'Free' : formatLKR(order.shipping)}</dd>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-line">
                <dt className="font-display text-[0.6rem] tracking-[0.25em] uppercase text-ash">Total</dt>
                <dd className="font-display text-xl gold-text">{formatLKR(order.total)}</dd>
              </div>
            </dl>
            <p className="text-[0.6rem] text-smoke uppercase tracking-widest mt-2">Prices include tax</p>
          </div>

          <div className="space-y-6">
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-xs tracking-[0.25em] uppercase mb-5 flex items-center gap-2">
                <Truck size={15} className="text-gold" /> Delivery to
              </h2>
              <p className="text-sm font-semibold">{order.customer_name}</p>
              <p className="text-sm text-ash mt-1">
                {order.address}
                <br />
                {order.city} {order.postal_code}
              </p>
              <p className="text-sm text-ash mt-2">{order.phone}</p>
              {order.email && <p className="text-sm text-ash">{order.email}</p>}
              {order.notes && <p className="text-xs text-smoke mt-3 italic">“{order.notes}”</p>}
              <div className="mt-5 pt-4 border-t border-line">
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">Payment</p>
                <p className="text-sm mt-1">{PAYMENT_LABEL[order.payment_method]}</p>
                {order.payment_method === 'bank' && (
                  <div className="mt-3 text-xs text-ash space-y-1 bg-void/60 border border-line p-3">
                    <p>Bank: Commercial Bank of Ceylon</p>
                    <p>Account: ECLIPSE CLOTHING 4.0</p>
                    <p>Account No: 8001 2345 6789</p>
                    <p>Branch: Colombo 03</p>
                    <p className="text-gold pt-1">Reference: {order.order_number}</p>
                  </div>
                )}
              </div>
            </div>

            <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full">
              <MessageCircle size={16} /> Confirm on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-outline w-full">
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
          {[
            ['01', 'Order received', 'We’ve logged your order'],
            ['02', 'Confirmation', 'We confirm on WhatsApp within hours'],
            ['03', 'Delivered', '2–5 working days island-wide'],
          ].map(([n, t, d], i) => (
            <div key={n} className={`border p-5 ${i === 0 ? 'border-gold/50' : 'border-line'}`}>
              <p className="font-display text-gold text-xs">{n}</p>
              <p className="mt-2 text-sm font-semibold">{t}</p>
              <p className="text-xs text-smoke mt-1">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
