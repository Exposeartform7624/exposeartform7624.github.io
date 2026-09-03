import { useState, type FormEvent } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { api } from '../lib/api';
import { WHATSAPP_DISPLAY, whatsappLink } from '../lib/format';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (form.phone && !/^[+\d][\d\s-]{8,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number';
    if (form.message.trim().length < 10) e.message = 'Please write at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await api('/api/contact', { method: 'POST', body: JSON.stringify(form) });
      setStatus('done');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section id="contact" className="section relative bg-charcoal border-y border-line overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] -right-60 -bottom-60 opacity-40" />
      <div className="wrap relative grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Contact" title="Get in" highlight="touch" subtitle="Questions about sizing, custom prints or bulk orders? We reply fast — usually within the hour on WhatsApp." />

          <Reveal delay={0.1} className="mt-10 space-y-5">
            <a href={whatsappLink('Hi ECLIPSE CLOTHING 4.0!')} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-gold/40 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                <Phone size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">WhatsApp</p>
                <p className="font-display text-base text-ivory group-hover:text-gold transition-colors">{WHATSAPP_DISPLAY}</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-line text-gold">
                <Mail size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">Email</p>
                <a href="mailto:hello@eclipseclothing.lk" className="text-ivory hover:text-gold">hello@eclipseclothing.lk</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-line text-gold">
                <MapPin size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">Based in</p>
                <p className="text-ivory">Colombo, Sri Lanka · Island-wide delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-line text-gold">
                <Clock size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[0.6rem] font-display tracking-[0.25em] uppercase text-smoke">Hours</p>
                <p className="text-ivory">Mon – Sat, 9:00 – 21:00</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={whatsappLink('Hi ECLIPSE CLOTHING 4.0! I have a question.')} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <a href="#contact-form" className="btn btn-outline">
              Contact Us
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form id="contact-form" onSubmit={submit} className="card p-6 md:p-10 space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="c-name">Name *</label>
                <input id="c-name" className={`input ${errors.name ? 'error' : ''}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label" htmlFor="c-email">Email *</label>
                <input id="c-email" type="email" className={`input ${errors.email ? 'error' : ''}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="c-phone">Phone</label>
              <input id="c-phone" type="tel" className={`input ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+94 7X XXX XXXX" />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="label" htmlFor="c-msg">Message *</label>
              <textarea id="c-msg" rows={5} className={`input resize-none ${errors.message ? 'error' : ''}`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you need…" />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>
            {serverError && <p className="text-sm text-red-400">{serverError}</p>}
            {status === 'done' && <p className="text-sm text-gold">Message received. We’ll get back to you shortly.</p>}
            <button type="submit" disabled={status === 'loading'} className="btn btn-gold w-full sm:w-auto">
              {status === 'loading' ? 'Sending…' : <>Send Message <Send size={14} /></>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
