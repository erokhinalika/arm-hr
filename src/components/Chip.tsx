import React from 'react';
import { cn } from '../utils/cn';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ label, onRemove, className, active }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-border dark:border-slate-700 bg-surface dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-text-muted dark:text-slate-400 transition-colors',
        active && 'border-primary bg-primary-soft dark:bg-primary/15 text-primary',
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/5 hover:text-text"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
};
