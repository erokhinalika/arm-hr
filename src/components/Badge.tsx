import React from 'react';
import { cn } from '../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
  dot?: boolean;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className, dot, size = 'md' }) => {
  const variants = {
    success: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800/50',
    danger: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800/50',
    info: 'bg-secondary-soft dark:bg-secondary/20 text-secondary dark:text-secondary-dark border-secondary/20 dark:border-secondary/30',
    neutral: 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  };

  const dots = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-secondary',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded border font-bold uppercase tracking-wider',
        size === 'md' ? 'px-1.5 py-0.5 text-[10px]' : 'px-1 py-0 text-[9px]',
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn('h-1 w-1 rounded-full', dots[variant])} />}
      {children}
    </span>
  );
};
