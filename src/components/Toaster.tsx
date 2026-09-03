import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function Toaster() {
  const { toasts, dismissToast } = useUI();
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="pointer-events-auto flex items-center gap-3 bg-graphite/95 backdrop-blur-xl border border-gold/40 px-4 py-3 shadow-gold"
          >
            {t.type === 'success' && <CheckCircle2 size={16} className="text-gold shrink-0" />}
            {t.type === 'error' && <AlertCircle size={16} className="text-red-400 shrink-0" />}
            {t.type === 'info' && <Info size={16} className="text-gold shrink-0" />}
            <p className="text-sm flex-1">{t.message}</p>
            <button type="button" onClick={() => dismissToast(t.id)} className="text-smoke hover:text-ivory" aria-label="Dismiss">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
