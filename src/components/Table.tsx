import React from 'react';
import { cn } from '../utils/cn';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className={cn('w-full border border-border dark:border-slate-800 rounded-xl bg-white dark:bg-[#1e293b] transition-colors duration-300', className)}>
      <table className="w-full border-separate border-spacing-0 text-left text-sm">
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <thead className={cn('z-30', className)}>
    {children}
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tbody className={cn('divide-y divide-border dark:divide-slate-800', className)}>
    {children}
  </tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => (
  <tr
    onClick={onClick}
    className={cn(
      'group h-9 transition-colors hover:bg-surface dark:hover:bg-slate-800/50',
      onClick && 'cursor-pointer',
      className
    )}
  >
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string; colSpan?: number }> = ({ children, className, colSpan }) => (
  <td colSpan={colSpan} className={cn('px-4 py-2 align-middle text-text dark:text-slate-300', className)}>
    {children}
  </td>
);

export const TableHeadCell: React.FC<{ children: React.ReactNode; className?: string; stickyOffset?: number }> = ({ children, className, stickyOffset = 0 }) => (
  <th 
    style={stickyOffset !== undefined ? { top: stickyOffset } : undefined}
    className={cn(
      'sticky top-0 z-30 px-4 py-2 font-semibold bg-white dark:bg-[#1e293b] shadow-[inset_0_-1px_0_#d9e1eb] dark:shadow-[inset_0_-1px_0_#334155] text-[11px] uppercase tracking-wider text-text-muted dark:text-slate-400 transition-colors duration-300',
      // Rounded corners for the first row cells since we removed overflow-hidden from the container
      'first:rounded-tl-xl last:rounded-tr-xl',
      className
    )}
  >
    {children}
  </th>
);
