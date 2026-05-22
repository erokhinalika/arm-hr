import React, { useEffect } from 'react';
import { cn } from '../utils/cn';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-500" />,
    error: <AlertCircle size={18} className="text-rose-500" />,
    info: <Info size={18} className="text-blue-500" />,
    warning: <AlertCircle size={18} className="text-amber-500" />,
  };

  const bgClasses = {
    success: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30',
    error: 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/30',
    info: 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30',
    warning: 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30',
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-right-10 fade-in duration-300",
      bgClasses[type]
    )}>
      {icons[type]}
      <p className="text-sm font-medium text-text dark:text-slate-200">{message}</p>
      <button 
        onClick={onClose}
        className="ml-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-muted dark:text-slate-500 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
};
