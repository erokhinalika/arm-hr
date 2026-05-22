import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';
import { Badge } from './Badge';
import { cn } from '../utils/cn';
import { MOCK_DATA } from '../data/mock-data';

interface Stat {
  label: string;
  value: string;
  sub: string;
}

interface VacancyHeaderProps {
  title: string;
  client: string;
  subtitle: string;
  activeTab: 'funnel' | 'history';
  onNavigate: (page: any) => void;
  actions?: React.ReactNode;
  stats?: Stat[];
}

export const VacancyHeader: React.FC<VacancyHeaderProps> = ({
  title,
  client,
  subtitle,
  activeTab,
  onNavigate,
  actions,
  stats = [
    { label: 'Кандидаты', value: '11', sub: '+2 за сегодня' },
    { label: 'Проверка', value: '3', sub: 'среднее 1.2 дн.' },
    { label: 'Заказчик', value: '2', sub: 'конверсия 18%' },
    { label: 'Отказы', value: '3', sub: 'основная причина: стек' },
  ],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="shrink-0 bg-white dark:bg-[#1e293b] border-b border-border dark:border-slate-800 shadow-sm z-40 transition-colors duration-300">
      {/* Topbar */}
      <header className="flex items-center justify-between px-8 py-4 h-16">
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex flex-col group cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-text dark:text-slate-100 group-hover:text-primary transition-colors">{title}</h1>
                <Badge variant="neutral" className="normal-case dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">{client}</Badge>
                <ChevronDown 
                  size={16} 
                  className={cn(
                    "text-text-muted transition-transform duration-200", 
                    isDropdownOpen && "rotate-180 text-primary"
                  )} 
                />
              </div>
              <p className="text-[11px] text-text-muted dark:text-slate-400">{subtitle}</p>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 border-b border-border dark:border-slate-800 mb-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Ваши активные вакансии</span>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {MOCK_DATA.vacancies.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigate('funnel'); // В прототипе просто переключаем на воронку
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface dark:hover:bg-slate-800 transition-colors text-left",
                        v.title === title && "bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        v.title === title ? "bg-primary text-white" : "bg-surface dark:bg-slate-800 text-text-muted"
                      )}>
                        <Briefcase size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs font-bold truncate",
                          v.title === title ? "text-primary" : "text-text dark:text-slate-200"
                        )}>
                          {v.title}
                        </p>
                        <p className="text-[10px] text-text-muted dark:text-slate-400 truncate">{v.client}</p>
                      </div>
                      {v.urgent && <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    </button>
                  ))}
                </div>
                <div className="mt-1 pt-1 border-t border-border dark:border-slate-800 px-2">
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="w-full text-center py-2 text-[11px] font-bold text-primary hover:underline"
                  >
                    Все вакансии →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex items-center px-8 border-t border-border dark:border-slate-800">
        <button 
          onClick={() => onNavigate('funnel')} 
          className={cn(
            "px-4 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === 'funnel' 
              ? "text-primary border-primary" 
              : "text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200 border-transparent"
          )}
        >
          Воронка
        </button>
        <button 
          onClick={() => onNavigate('history')} 
          className={cn(
            "px-4 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === 'history' 
              ? "text-primary border-primary" 
              : "text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200 border-transparent"
          )}
        >
          История
        </button>
      </nav>

      {/* Stats Strip */}
      <div className="px-8 py-3 bg-surface/30 dark:bg-slate-900/50">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1e293b] px-3 py-2 rounded-lg border border-border dark:border-slate-800 shadow-sm hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group">
              <span className="text-[10px] font-medium text-text-muted dark:text-slate-500 uppercase tracking-wider leading-none group-hover:text-primary transition-colors">{stat.label}</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-base font-bold text-text dark:text-slate-100 leading-none tabular-nums">{stat.value}</span>
                <span className={cn(
                  "text-[10px] font-semibold leading-none",
                  stat.sub.startsWith('+') ? "text-emerald-600 dark:text-emerald-400" : 
                  stat.sub.startsWith('-') ? "text-rose-600 dark:text-rose-400" : 
                  "text-text-muted dark:text-slate-500"
                )}>
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

