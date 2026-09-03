import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../lib/types';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  quickView: Product | null;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toasts: Toast[];
  toast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: number) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <UIContext.Provider
      value={{
        quickView,
        openQuickView: setQuickView,
        closeQuickView: () => setQuickView(null),
        searchOpen,
        setSearchOpen,
        toasts,
        toast,
        dismissToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
