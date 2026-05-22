import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300",
      className
    )}>
      {Icon && (
        <div className="w-16 h-16 bg-surface dark:bg-slate-800 rounded-2xl flex items-center justify-center text-text-muted dark:text-slate-500 mb-4 shadow-sm border border-border dark:border-slate-700">
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-lg font-bold text-text dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-text-muted dark:text-slate-400 max-w-xs mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="gap-2">
          {action.label}
        </Button>
      )}
    </div>
  );
};
