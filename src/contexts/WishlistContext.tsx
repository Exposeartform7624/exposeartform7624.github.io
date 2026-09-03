import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../lib/api';

interface WishlistState {
  ids: number[];
  has: (id: number) => boolean;
  toggle: (id: number) => Promise<boolean>;
  clientId: string;
  loading: boolean;
}

const WishlistContext = createContext<WishlistState | null>(null);
const KEY = 'eclipse-wishlist-v1';
const CLIENT_KEY = 'eclipse-client-id';

function getClientId(): string {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `c-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const clientId = useMemo(getClientId, []);
  const [ids, setIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]') as number[];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ product_id: number }[]>(`/api/wishlist?client_id=${encodeURIComponent(clientId)}`)
      .then((rows) => setIds(rows.map((r) => r.product_id)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [clientId]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  const toggle = useCallback(
    async (id: number) => {
      const wasSaved = ids.includes(id);
      setIds((prev) => (wasSaved ? prev.filter((x) => x !== id) : [id, ...prev]));
      try {
        const r = await api<{ saved: boolean }>('/api/wishlist', { method: 'POST', body: JSON.stringify({ client_id: clientId, product_id: id }) });
        return r.saved;
      } catch {
        setIds((prev) => (wasSaved ? [id, ...prev] : prev.filter((x) => x !== id)));
        return wasSaved;
      }
    },
    [ids, clientId],
  );

  return <WishlistContext.Provider value={{ ids, has, toggle, clientId, loading }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
