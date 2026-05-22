import React from 'react';
import { cn } from '../utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, className }) => {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer group", className)}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div 
          className={cn(
            "w-8 h-[18px] rounded-full transition-colors duration-200 ease-in-out",
            checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
          )}
        >
          <div 
            className={cn(
              "absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out",
              checked ? "translate-x-[14px]" : "translate-x-0"
            )}
          />
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-text-muted dark:text-slate-400 group-hover:text-text dark:group-hover:text-slate-200 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};
