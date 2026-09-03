import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { BadgeCheck } from 'lucide-react';
import { api } from '../lib/api';
import type { Review } from '../lib/types';
import StarRating from './StarRating';

interface Props {
  productId: number;
  onReviewAdded?: () => void;
}

export default function ReviewsPanel({ productId, onReviewAdded }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', rating: 5, title: '', body: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api<Review[]>(`/api/reviews?product_id=${productId}`)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(load, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (form.body.trim().length < 10) errs.body = 'Please write at least 10 characters';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setServerError('');
    try {
      await api('/api/reviews', { method: 'POST', body: JSON.stringify({ product_id: productId, ...form }) });
      setForm({ name: '', rating: 5, title: '', body: '' });
      setSuccess(true);
      load();
      onReviewAdded?.();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => r.rating === n).length }));

  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
      <div>
        <span className="eyebrow">Customer Reviews</span>
        <div className="mt-4 flex items-end gap-4">
          <p className="font-display text-5xl gold-text leading-none">{avg ? avg.toFixed(1) : '—'}</p>
          <div className="pb-1">
            <StarRating value={avg} size={16} />
            <p className="text-xs text-ash mt-1">
              {reviews.length} review{reviews.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {dist.map((d) => (
            <div key={d.n} className="flex items-center gap-3 text-xs">
              <span className="w-3 text-ash">{d.n}</span>
              <div className="flex-1 h-1.5 bg-slate overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-dark to-gold-light" style={{ width: reviews.length ? `${(d.c / reviews.length) * 100}%` : 0 }} />
              </div>
              <span className="w-5 text-smoke text-right">{d.c}</span>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="mt-10 card p-6 space-y-4" noValidate>
          <h4 className="font-display text-xs tracking-[0.25em] uppercase">Write a review</h4>
          <div>
            <span className="label">Your rating</span>
            <StarRating value={form.rating} size={22} interactive onChange={(v) => setForm({ ...form, rating: v })} />
          </div>
          <div>
            <label className="label" htmlFor="rv-name">Name *</label>
            <input id="rv-name" className={`input ${errors.name ? 'error' : ''}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="label" htmlFor="rv-title">Title</label>
            <input id="rv-title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Sum it up" />
          </div>
          <div>
            <label className="label" htmlFor="rv-body">Review *</label>
            <textarea id="rv-body" rows={4} className={`input resize-none ${errors.body ? 'error' : ''}`} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="How does it fit? How's the quality?" />
            {errors.body && <p className="text-xs text-red-400 mt-1">{errors.body}</p>}
          </div>
          {serverError && <p className="text-xs text-red-400">{serverError}</p>}
          {success && <p className="text-xs text-gold">Thank you — your review is live.</p>}
          <button type="submit" disabled={submitting} className="btn btn-gold w-full">
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>

      <div>
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card p-6 space-y-3">
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-display text-sm uppercase tracking-widest">No reviews yet</p>
            <p className="text-sm text-ash mt-2">Be the first to share how it wears.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <StarRating value={r.rating} size={12} />
                    {r.title && <h5 className="mt-2 font-semibold">{r.title}</h5>}
                  </div>
                  <span className="text-xs text-smoke shrink-0">{new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="mt-3 text-sm text-ash leading-relaxed">{r.body}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="font-semibold">{r.name}</span>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-gold">
                      <BadgeCheck size={13} /> Verified buyer
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
