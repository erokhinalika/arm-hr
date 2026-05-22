import React from 'react';
import { cn } from '../utils/cn';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  label, 
  description,
  className 
}) => {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
      <div className="relative flex items-center mt-0.5">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div 
          className={cn(
            "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200",
            checked 
              ? "bg-primary border-primary text-white shadow-sm shadow-primary/20" 
              : "bg-white dark:bg-slate-800 border-border dark:border-slate-700 group-hover:border-primary/50"
          )}
        >
          {checked && (
            <Check 
              size={12} 
              strokeWidth={4} 
              className="animate-in zoom-in-50 duration-200" 
            />
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-bold text-text dark:text-slate-200 group-hover:text-primary transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-text-muted dark:text-slate-400">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
