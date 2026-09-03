import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { api } from '../lib/api';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const r = await api<{ ok: boolean; already: boolean }>('/api/newsletter', { method: 'POST', body: JSON.stringify({ email, source: compact ? 'footer' : 'home' }) });
      setStatus('done');
      setMessage(r.already ? "You're already in the inner circle." : 'Welcome to the inner circle.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={submit} className="w-full" noValidate>
      <div className={`flex ${compact ? '' : 'flex-col sm:flex-row'} gap-2`}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="your@email.com"
          className={`input ${status === 'error' ? 'error' : ''} ${compact ? 'py-3 text-sm' : ''}`}
          aria-label="Email address"
        />
        <button type="submit" disabled={status === 'loading'} className={`btn btn-gold ${compact ? 'btn-sm px-4' : ''}`}>
          {status === 'done' ? <Check size={15} /> : compact ? <ArrowRight size={15} /> : <>Subscribe <ArrowRight size={14} /></>}
        </button>
      </div>
      {message && <p className={`mt-2 text-xs ${status === 'error' ? 'text-red-400' : 'text-gold'}`}>{message}</p>}
    </form>
  );
}
