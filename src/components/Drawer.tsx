import React, { useEffect } from 'react';
import { cn } from '../utils/cn';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 dark:bg-black/40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-[360px] transform bg-white dark:bg-[#1e293b] shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border dark:border-slate-800 px-6 py-4">
            <h2 className="text-base font-semibold text-text dark:text-slate-100">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-text-muted dark:text-slate-400 hover:bg-surface dark:hover:bg-slate-800 hover:text-text dark:hover:text-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 dark:text-slate-300">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-border dark:border-slate-800 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
