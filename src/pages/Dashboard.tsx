import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mock-data';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Badge } from '../components/Badge';
import { Switch } from '../components/Switch';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeadCell } from '../components/Table';
import { Plus, SortAsc, Filter, History, ChevronDown, Calendar, Search } from 'lucide-react';
import { cn } from '../utils/cn';

interface DashboardProps {
  onNavigate: (page: any) => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, uiState = 'normal' }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [staleOnly, setStaleOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const filteredVacancies = useMemo(() => {
    let result = [...MOCK_DATA.vacancies];

    if (statusFilter !== 'all') {
      if (statusFilter === 'response-due') {
        result = result.filter(v => v.needsResponse);
      } else {
        result = result.filter(v => v.status === statusFilter || (statusFilter === 'open' && v.status === 'pick'));
      }
    }

    if (staleOnly) {
      result = result.filter(v => v.stale);
    }

    if (sortOrder === 'stale-first') {
      result.sort((a, b) => (b.stale ? 1 : 0) - (a.stale ? 1 : 0));
    }

    return result;
  }, [statusFilter, staleOnly, sortOrder]);

  return (
    <div className="flex flex-col h-full bg-[#f1f4f8] dark:bg-[#0f172a] transition-colors duration-300 overflow-y-auto">
      {/* Pinned Header + Controls Section */}
      <div className="sticky top-0 z-40 bg-[#f1f4f8] dark:bg-[#0f172a] transition-colors duration-300 border-b border-border/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md -z-10" />
        <header className="flex items-center justify-between px-8 py-4 h-16 transition-colors duration-300">
          <div>
            <h1 className="text-xl font-bold text-text dark:text-slate-100">Вакансии</h1>
            <p className="text-xs text-text-muted dark:text-slate-400">
              <span className="font-semibold text-primary dark:text-indigo-400">{MOCK_DATA.kpi.open}</span> открытых · {MOCK_DATA.kpi.queueToday} задач до конца дня
            </p>
          </div>
          <Button size="sm" className="gap-2" onClick={() => onNavigate('create-vacancy')}>
            <Plus size={16} />
            Новая вакансия
          </Button>
        </header>

        <div className="px-8 pt-6 pb-4 space-y-6">
          {/* Queue Strip */}
          <nav className="flex items-center gap-4 bg-white/80 dark:bg-[#1e293b]/80 border border-border dark:border-slate-800 rounded-lg px-4 py-2 text-xs shadow-sm transition-colors duration-300">
            <button 
              onClick={() => setStatusFilter('review')}
              className={cn("flex items-center gap-2 hover:text-primary transition-colors", statusFilter === 'review' ? "text-primary font-semibold" : "text-text dark:text-slate-300")}
            >
              <strong>{MOCK_DATA.kpi.reviewResumes}</strong>
              <span className="text-text-muted dark:text-slate-500">На проверке</span>
            </button>
            <span className="text-border dark:text-slate-800">·</span>
            <button 
              onClick={() => setStatusFilter('response-due')}
              className={cn("flex items-center gap-2 hover:text-primary transition-colors", statusFilter === 'response-due' ? "text-primary font-semibold" : "text-text dark:text-slate-300")}
            >
              <strong>{MOCK_DATA.kpi.responsesDue}</strong>
              <span className="text-text-muted dark:text-slate-500">Проставить ответ</span>
            </button>
            <span className="text-border dark:text-slate-800">·</span>
            <button 
              onClick={() => setStatusFilter('waiting')}
              className={cn("flex items-center gap-2 hover:text-primary transition-colors", statusFilter === 'waiting' ? "text-primary font-semibold" : "text-text dark:text-slate-300")}
            >
              <strong>{MOCK_DATA.kpi.waitingVacancies}</strong>
              <span className="text-text-muted dark:text-slate-500">Ждут заказчика</span>
            </button>
            <div className="ml-auto text-text-muted dark:text-slate-500 font-medium">21 мая</div>
          </nav>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1e293b]/80 border border-border dark:border-slate-800 p-1 rounded-md transition-colors duration-300">
              {['all', 'open', 'review', 'waiting', 'response-due'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded transition-colors",
                    statusFilter === status 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-text-muted dark:text-slate-400 hover:bg-surface dark:hover:bg-slate-800 hover:text-text dark:hover:text-slate-200"
                  )}
                >
                  {MOCK_DATA.statusLabels[status as keyof typeof MOCK_DATA.statusLabels] || 'Ответ'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                checked={staleOnly}
                onChange={setStaleOnly}
                label="Только горящие"
              />

              <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1e293b]/80 border border-border dark:border-slate-800 px-2 py-1 rounded-md relative pr-7 transition-colors duration-300">
                <SortAsc size={14} className="text-text-muted dark:text-slate-500" />
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-xs font-medium bg-transparent outline-none cursor-pointer appearance-none text-text dark:text-slate-300"
                >
                  <option value="default">По дате обновления</option>
                  <option value="stale-first">Сначала без движения</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Table Content */}
      <main className="flex-1">
        <div className="px-8 pb-8 pt-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHeadCell stickyOffset={192} className="w-10">&nbsp;</TableHeadCell>
                <TableHeadCell stickyOffset={192}>Вакансия</TableHeadCell>
                <TableHeadCell stickyOffset={192}>Стек</TableHeadCell>
                <TableHeadCell stickyOffset={192}>Сроки</TableHeadCell>
                <TableHeadCell stickyOffset={192} className="text-right">Действие</TableHeadCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uiState === 'loading' ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton variant="circular" className="w-2 h-2" /></TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : uiState === 'empty' ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="p-0">
                    <EmptyState
                      icon={Search}
                      title="Вакансий не найдено"
                      description="Попробуйте изменить параметры фильтрации или создайте новую вакансию, чтобы начать работу."
                      action={{
                        label: "Новая вакансия",
                        onClick: () => onNavigate('create-vacancy')
                      }}
                      className="py-20"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredVacancies.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        v.status === 'review' ? "bg-amber-400" : v.status === 'waiting' ? "bg-secondary" : "bg-emerald-400"
                      )} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                        <span className="font-semibold text-text dark:text-slate-200">{v.title}</span>
                        {v.urgent && <Badge variant="danger" size="sm">Срочно</Badge>}
                        {v.stale && <Badge variant="warning" size="sm">Без движения</Badge>}
                        </div>
                        <div className="text-[11px] text-text-muted dark:text-slate-500">
                          {v.client} · {v.initiator} · {v.meta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {v.tags.map(tag => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <div className="flex items-center gap-1.5 text-text dark:text-slate-300">
                          <Calendar size={12} className="text-text-muted" />
                          {v.start} · {v.duration}
                        </div>
                        <span className="text-[10px] text-text-muted dark:text-slate-500">{v.timing}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant={v.status === 'review' || v.needsResponse ? 'primary' : 'secondary'} 
                          size="sm" 
                          className="w-24"
                          onClick={() => onNavigate(v.status === 'review' ? 'resume' : 'funnel')}
                        >
                          {v.status === 'review' ? 'Проверить' : v.needsResponse ? 'Ответ' : 'Воронка'}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1" onClick={() => onNavigate('history')}>
                          <History size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {uiState === 'normal' && filteredVacancies.length === 0 && (
            <div className="p-12 text-center text-text-muted dark:text-slate-500">
              Нет вакансий по фильтру. Сбросьте фильтры или создайте вакансию.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
