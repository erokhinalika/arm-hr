import React from 'react';
import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rectangular' }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-700/50",
        variant === 'text' && "h-3 w-full rounded",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-none",
        variant === 'rounded' && "rounded-lg",
        className
      )}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 1, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={cn(i === lines - 1 && lines > 1 ? "w-2/3" : "w-full")} 
        />
      ))}
    </div>
  );
};
