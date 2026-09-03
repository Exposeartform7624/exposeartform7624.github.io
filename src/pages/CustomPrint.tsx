import { useMemo, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileImage, MessageCircle, Minus, Palette, Plus, Ruler, Shirt, Upload } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { api } from '../lib/api';
import { SIZES, TEE_COLOURS, WHATSAPP_DISPLAY, formatLKR, isLight, whatsappLink } from '../lib/format';

const BASE_PRICE = 3450;
const BOTH_SIDES_EXTRA = 600;
const PLACEMENTS = [
  { key: 'Front', label: 'Front', extra: 0 },
  { key: 'Back', label: 'Back', extra: 0 },
  { key: 'Front + Back', label: 'Front + Back', extra: BOTH_SIDES_EXTRA },
];

const STEPS = [
  { icon: Palette, t: 'Choose your T-shirt colour' },
  { icon: Ruler, t: 'Choose your size' },
  { icon: Upload, t: 'Send us your design' },
  { icon: CheckCircle2, t: 'Confirm your order' },
  { icon: Shirt, t: 'Get your custom Eclipse T-shirt' },
];

export default function CustomPrint() {
  const [colour, setColour] = useState(TEE_COLOURS[0]);
  const [size, setSize] = useState('M');
  const [placement, setPlacement] = useState(PLACEMENTS[0]);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState<number | null>(null);
  const [serverError, setServerError] = useState('');

  const unit = BASE_PRICE + placement.extra;
  const discount = qty >= 5 ? 0.1 : qty >= 3 ? 0.05 : 0;
  const total = useMemo(() => Math.round(unit * qty * (1 - discount)), [unit, qty, discount]);

  const onFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f && f.type.startsWith('image/') ? URL.createObjectURL(f) : null);
  };

  const message = () =>
    `Hi ECLIPSE CLOTHING 4.0! I'd like a custom print tee.${ref ? `\nRef: #CP-${ref}` : ''}\n\n• Colour: ${colour.name}\n• Size: ${size}\n• Print: ${placement.label}\n• Quantity: ${qty}\n• Estimated: ${formatLKR(total)}${
      name ? `\n• Name: ${name}` : ''
    }${notes ? `\n• Notes: ${notes}` : ''}${file ? `\n• Design file: ${file.name} (I'll attach it here)` : '\n\nI will send my design here.'}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!/^[+\d][\d\s-]{8,}$/.test(phone)) errs.phone = 'Please enter a valid phone number';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setServerError('');
    try {
      const r = await api<{ id: number }>('/api/custom-orders', {
        method: 'POST',
        body: JSON.stringify({ name, phone, colour: colour.name, size, placement: placement.key, quantity: qty, notes, design_file_name: file?.name || '', estimated_price: total }),
      });
      setRef(r.id);
      const msg = `Hi ECLIPSE CLOTHING 4.0! I'd like a custom print tee.\nRef: #CP-${r.id}\n\n• Colour: ${colour.name}\n• Size: ${size}\n• Print: ${placement.label}\n• Quantity: ${qty}\n• Estimated: ${formatLKR(total)}\n• Name: ${name}${notes ? `\n• Notes: ${notes}` : ''}${
        file ? `\n• Design file: ${file.name} (I'll attach it here)` : '\n\nI will send my design here.'
      }`;
      window.open(whatsappLink(msg), '_blank', 'noopener');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Create Your Custom Print T-Shirt — ECLIPSE CLOTHING 4.0" description="Design your own oversized custom print T-shirt. Choose colour, size and print placement, send your artwork and order via WhatsApp. From LKR 3,450, tax included." />

      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden border-b border-line">
        <img src="/images/custom-print.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/80 to-void" />
        <div className="wrap relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Custom Print Studio</span>
            <h1 className="mt-4 font-display font-extrabold uppercase leading-[0.98] text-[clamp(2.2rem,6.5vw,5rem)]">
              Your style.
              <br />
              <span className="gold-text">Your print.</span>
            </h1>
            <p className="mt-6 max-w-xl text-ash text-lg">Build your oversized custom tee below. We’ll confirm the mock-up and final price with you on WhatsApp before printing.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
            {STEPS.map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center gap-3 border border-line bg-void/60 backdrop-blur p-3">
                <span className="font-display text-gold text-xs">0{i + 1}</span>
                <s.icon size={16} className="text-gold shrink-0" strokeWidth={1.6} />
                <span className="text-[0.68rem] text-ash leading-tight">{s.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-20 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">
        <form onSubmit={submit} className="space-y-10" noValidate>
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-gold">01</span>
              <h2 className="font-display text-xs tracking-[0.25em] uppercase">Choose your T-shirt colour</h2>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {TEE_COLOURS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColour(c)}
                  className={`group flex flex-col items-center gap-2 p-2 border transition-all ${colour.name === c.name ? 'border-gold shadow-gold' : 'border-line hover:border-ash'}`}
                >
                  <span className={`w-10 h-10 rounded-full border ${isLight(c.hex) ? 'border-black/30' : 'border-white/10'}`} style={{ background: c.hex }} />
                  <span className={`text-[0.6rem] text-center leading-tight ${colour.name === c.name ? 'text-gold' : 'text-ash'}`}>{c.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-gold">02</span>
              <h2 className="font-display text-xs tracking-[0.25em] uppercase">Choose your size & print</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <span className="label">Size</span>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button key={s} type="button" onClick={() => setSize(s)} className={`chip ${size === s ? 'active' : ''}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="label">Print placement</span>
                <div className="flex flex-wrap gap-2">
                  {PLACEMENTS.map((p) => (
                    <button key={p.key} type="button" onClick={() => setPlacement(p)} className={`chip ${placement.key === p.key ? 'active' : ''}`}>
                      {p.label}
                      {p.extra > 0 && <span className="ml-1.5 opacity-70">+{p.extra}</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="label">Quantity</span>
                <div className="inline-flex items-stretch border border-line bg-charcoal">
                  <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 hover:text-gold" aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span className="w-12 flex items-center justify-center font-display text-sm border-x border-line">{qty}</span>
                  <button type="button" onClick={() => setQty(Math.min(200, qty + 1))} className="px-4 hover:text-gold" aria-label="Increase">
                    <Plus size={14} />
                  </button>
                </div>
                <p className="text-xs text-smoke mt-2">3+ pieces: 5% off · 5+ pieces: 10% off</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-gold">03</span>
              <h2 className="font-display text-xs tracking-[0.25em] uppercase">Send us your design</h2>
            </div>
            <label className={`block border border-dashed p-8 text-center cursor-pointer transition-colors ${file ? 'border-gold/60 bg-gold/5' : 'border-line hover:border-gold/50'}`}>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
              {preview ? (
                <img src={preview} alt="Design preview" className="mx-auto max-h-48 object-contain" />
              ) : (
                <FileImage size={32} className="mx-auto text-gold" strokeWidth={1.3} />
              )}
              <p className="mt-4 text-sm">{file ? file.name : 'Click to choose your artwork, photo or logo'}</p>
              <p className="text-xs text-smoke mt-1">PNG, JPG or PDF · You’ll attach the file in WhatsApp for the final print</p>
            </label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="input resize-none mt-4" placeholder="Design notes — print size, position, text to include, colours…" />
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-gold">04</span>
              <h2 className="font-display text-xs tracking-[0.25em] uppercase">Your details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="cp-name">Name *</label>
                <input id="cp-name" className={`input ${errors.name ? 'error' : ''}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label" htmlFor="cp-phone">WhatsApp number *</label>
                <input id="cp-phone" type="tel" className={`input ${errors.phone ? 'error' : ''}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 7X XXX XXXX" />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </Reveal>

          {serverError && <p className="text-sm text-red-400">{serverError}</p>}
          {ref && (
            <div className="card p-5 border-gold/50 flex items-start gap-3">
              <CheckCircle2 className="text-gold shrink-0" size={20} />
              <div>
                <p className="font-semibold">
                  Request saved — Ref <span className="text-gold">#CP-{ref}</span>
                </p>
                <p className="text-sm text-ash mt-1">WhatsApp should have opened with your details. If not, tap the button below.</p>
                <a href={whatsappLink(message())} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm mt-3">
                  <MessageCircle size={14} /> Open WhatsApp
                </a>
              </div>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn btn-whatsapp w-full sm:w-auto text-sm px-10 py-5">
            <MessageCircle size={18} /> {submitting ? 'Saving…' : 'Order via WhatsApp'}
          </button>
          <p className="text-xs text-smoke -mt-4">Sends your order to {WHATSAPP_DISPLAY}. No payment is taken until we confirm your mock-up.</p>
        </form>

        <aside className="card p-6 md:p-8 lg:sticky lg:top-32">
          <span className="eyebrow">Your custom tee</span>
          <div className="mt-6 relative aspect-[4/5] border border-line overflow-hidden flex items-center justify-center" style={{ background: `radial-gradient(ellipse at center, ${colour.hex} 0%, #0a0a0a 120%)` }}>
            <Shirt size={180} strokeWidth={0.6} className={isLight(colour.hex) ? 'text-black/70' : 'text-white/60'} style={{ color: colour.hex, filter: `drop-shadow(0 0 30px rgba(212,175,55,0.35))` }} />
            {preview && <img src={preview} alt="" className="absolute w-24 h-24 object-contain top-[36%] left-1/2 -translate-x-1/2 mix-blend-normal" />}
            {!preview && (
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-20 h-20 border border-dashed border-gold/60 flex items-center justify-center text-[0.55rem] font-display tracking-widest text-gold uppercase text-center px-2">
                Your design
              </div>
            )}
            <span className="absolute bottom-3 left-3 badge badge-dark">{placement.label}</span>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ash">Colour</dt>
              <dd className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: colour.hex }} />
                {colour.name}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Size</dt>
              <dd>{size}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Print</dt>
              <dd>{placement.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Unit price</dt>
              <dd>{formatLKR(unit)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Quantity</dt>
              <dd>× {qty}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold">
                <dt>Bulk discount</dt>
                <dd>−{Math.round(discount * 100)}%</dd>
              </div>
            )}
            <div className="flex justify-between items-end pt-3 border-t border-line">
              <dt className="font-display text-[0.6rem] tracking-[0.25em] uppercase text-ash">Estimated total</dt>
              <dd className="font-display text-2xl gold-text">{formatLKR(total)}</dd>
            </div>
          </dl>
          <p className="text-[0.62rem] text-smoke uppercase tracking-widest mt-3">Prices include tax · Final price confirmed on WhatsApp</p>
        </aside>
      </section>
    </>
  );
}
