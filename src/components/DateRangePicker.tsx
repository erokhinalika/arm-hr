import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';
import { parseISO, format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  onReset: () => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onReset,
}) => {
  const start = startDate ? parseISO(startDate) : null;
  const end = endDate ? parseISO(endDate) : null;

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 px-3 py-1.5 rounded-md transition-colors duration-300 shadow-sm hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
      <CalendarIcon size={14} className="text-text-muted dark:text-slate-500" />
      
      <div className="flex items-center gap-1">
        <DatePicker
          selected={start}
          onChange={(date: Date | null) => date && onStartChange(format(date, 'yyyy-MM-dd'))}
          selectsStart
          startDate={start}
          endDate={end}
          dateFormat="dd.MM.yyyy"
          locale={ru}
          className="w-20 text-xs font-medium bg-transparent outline-none cursor-pointer text-text dark:text-slate-300 placeholder:text-text-muted/50"
          placeholderText="От"
        />
        <span className="text-text-muted dark:text-slate-500 text-xs">—</span>
        <DatePicker
          selected={end}
          onChange={(date: Date | null) => date && onEndChange(format(date, 'yyyy-MM-dd'))}
          selectsEnd
          startDate={start}
          endDate={end}
          minDate={start || undefined}
          dateFormat="dd.MM.yyyy"
          locale={ru}
          className="w-20 text-xs font-medium bg-transparent outline-none cursor-pointer text-text dark:text-slate-300 placeholder:text-text-muted/50"
          placeholderText="До"
        />
      </div>

      <button 
        onClick={onReset}
        className="ml-2 text-text-muted dark:text-slate-500 hover:text-primary dark:hover:text-primary-soft transition-colors p-0.5 rounded-full hover:bg-primary-soft dark:hover:bg-slate-800"
        title="Сбросить даты"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
};
