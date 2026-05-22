import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mock-data';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Badge } from '../components/Badge';
import { DateRangePicker } from '../components/DateRangePicker';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeadCell } from '../components/Table';
import { Drawer } from '../components/Drawer';
import { Toast } from '../components/Toast';
import { Search, Calendar, LayoutList, Filter, Download, ChevronLeft, ChevronRight, RotateCcw, User, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface BankProps {
  onNavigate: (page: string, id?: string) => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

export const Bank: React.FC<BankProps> = ({ onNavigate, uiState = 'normal' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [dateFrom, setDateFrom] = useState(MOCK_DATA.bankPeriodDefault.from);
  const [dateTo, setDateTo] = useState(MOCK_DATA.bankPeriodDefault.to);

  // New states for "Add Specialist" flow
  const [people, setPeople] = useState(MOCK_DATA.bankPeople);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState({
    name: '',
    role: 'DevOps',
    stack: '',
    status: 'free',
    load: 0
  });

  const filteredPeople = useMemo(() => {
    return people.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.stack.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, people]);

  const handleAddSpecialist = async () => {
    if (!form.name.trim()) {
      setToast({ message: 'Пожалуйста, введите имя специалиста', type: 'error' });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPerson = {
      id: `p${Date.now()}`,
      group: form.role === 'Java' || form.role === 'Go' || form.role === 'Python' ? 'Backend' : form.role,
      name: form.name,
      role: form.role,
      stack: form.stack,
      load: form.load,
      freeFrom: form.status === 'free' ? 'сейчас' : form.status === 'busy' ? 'через месяц' : 'частично',
      status: form.status as any,
      assignmentStart: null,
      assignmentEnd: null,
      currentActivity: form.status === 'free' ? 'свободен' : 'на проекте',
      weeks: ['—', '—', '—', '—', '—', '—']
    };

    setPeople([newPerson, ...people]);
    setIsSaving(false);
    setIsDrawerOpen(false);
    setToast({ message: 'Специалист успешно добавлен в банк', type: 'success' });
    setForm({ name: '', role: 'DevOps', stack: '', status: 'free', load: 0 });
  };

  const getLoadColor = (load: number) => {
    if (load === 0) return 'bg-slate-200 dark:bg-slate-800';
    if (load <= 100) return 'bg-primary';
    return 'bg-rose-500 dark:bg-rose-400';
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 overflow-y-auto">
      {/* Topbar + Filters */}
      <div className="sticky top-0 z-40 bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 border-b border-border/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md -z-10" />
        <header className="flex items-center justify-between px-8 py-4 h-16 transition-colors duration-300">
          <div>
            <h1 className="text-xl font-bold text-text dark:text-slate-100">Банк резюме</h1>
            <p className="text-xs text-text-muted dark:text-slate-400">
              <span className="font-semibold text-primary dark:text-indigo-400">{MOCK_DATA.bankKpi.total}</span> специалистов · {MOCK_DATA.bankKpi.free} свободны
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Download size={14} />
              Экспорт
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setIsDrawerOpen(true)}>
              <User size={14} />
              Добавить специалиста
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="px-8 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени, роли или стеку..."
                className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-md pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 transition-colors duration-300"
              />
            </div>
            
            <div className="flex items-center gap-1 bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 p-1 rounded-md transition-colors duration-300">
              {['all', 'free', 'partial', 'busy'].map((status) => (
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
                  {status === 'all' ? 'Все' : status === 'free' ? 'Свободны' : status === 'partial' ? 'Частично' : 'Заняты'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 p-1 rounded-md transition-colors duration-300">
              <button
                onClick={() => setViewMode('calendar')}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5",
                  viewMode === 'calendar' 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-text-muted dark:text-slate-400 hover:bg-surface dark:hover:bg-slate-800 hover:text-text dark:hover:text-slate-200"
                )}
              >
                <Calendar size={14} />
                Календарь
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5",
                  viewMode === 'list' 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-text-muted dark:text-slate-400 hover:bg-surface dark:hover:bg-slate-800 hover:text-text dark:hover:text-slate-200"
                )}
              >
                <LayoutList size={14} />
                Список
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DateRangePicker 
              startDate={dateFrom}
              endDate={dateTo}
              onStartChange={setDateFrom}
              onEndChange={setDateTo}
              onReset={() => { 
                setDateFrom(MOCK_DATA.bankPeriodDefault.from); 
                setDateTo(MOCK_DATA.bankPeriodDefault.to); 
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-8 pt-6 space-y-6">
        <div className="h-6" /> {/* Spacer for top padding since we use pt-0 */}

        {/* View Content */}
        {viewMode === 'calendar' ? (
          <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-300">
            <div className="overflow-auto max-h-[calc(100vh-250px)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="relative z-20">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-slate-500">
                    <th className="px-6 py-3 min-w-[240px] sticky left-0 top-0 bg-white dark:bg-[#1e293b] z-30 shadow-[inset_0_-1px_0_#e2e8f0,inset_-1px_0_0_#e2e8f0] dark:shadow-[inset_0_-1px_0_#334155,inset_-1px_0_0_#334155]">Специалист</th>
                    <th className="px-6 py-3 min-w-[120px] sticky top-0 bg-white dark:bg-[#1e293b] shadow-[inset_0_-1px_0_#e2e8f0] dark:shadow-[inset_0_-1px_0_#334155]">Загрузка</th>
                    {MOCK_DATA.bankTimeline.map(period => (
                      <th key={period.label} className="px-4 py-3 text-center min-w-[110px] whitespace-nowrap sticky top-0 bg-white dark:bg-[#1e293b] shadow-[inset_0_-1px_0_#e2e8f0,inset_1px_0_0_rgba(226,232,240,0.5)] dark:shadow-[inset_0_-1px_0_#334155,inset_1px_0_0_rgba(51,65,85,0.5)]">
                        {period.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-slate-800">
                  {uiState === 'loading' ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 sticky left-0 bg-white dark:bg-[#1e293b] z-10 shadow-[inset_-1px_0_0_#e2e8f0] dark:shadow-[inset_-1px_0_0_#334155]">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-1.5 w-24 rounded-full" />
                            <Skeleton className="h-4 w-8" />
                          </div>
                        </td>
                        {MOCK_DATA.bankTimeline.map((_, j) => (
                          <td key={j} className="px-2 py-4 border-l border-border/50">
                            <Skeleton className="h-8 w-full rounded" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : uiState === 'empty' ? (
                    <tr>
                      <td colSpan={MOCK_DATA.bankTimeline.length + 2} className="p-0">
                        <EmptyState
                          icon={Users}
                          title="Специалисты не найдены"
                          description="По вашему запросу ничего не нашлось. Попробуйте сбросить фильтры или изменить поисковый запрос."
                          action={{
                            label: "Сбросить фильтры",
                            onClick: () => {
                              setSearchQuery('');
                              setStatusFilter('all');
                            }
                          }}
                          className="py-20"
                        />
                      </td>
                    </tr>
                  ) : (
                    filteredPeople.map(person => (
                      <tr key={person.id} className="group hover:bg-surface/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 sticky left-0 bg-white dark:bg-[#1e293b] group-hover:bg-surface/50 dark:group-hover:bg-slate-800/50 z-10 shadow-[inset_-1px_0_0_#e2e8f0] dark:shadow-[inset_-1px_0_0_#334155]">
                          <div className="flex flex-col">
                            <span className="font-semibold text-text dark:text-slate-200">{person.name}</span>
                            <div className="flex items-center gap-2 text-[11px] text-text-muted dark:text-slate-500">
                              <span>{person.role}</span>
                              <span className="text-border dark:text-slate-800">·</span>
                              <span>{person.stack}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700/70 dark:ring-1 dark:ring-inset dark:ring-slate-600/40 rounded-full overflow-hidden min-w-[60px]">
                              <div 
                                className={cn("h-full transition-all", getLoadColor(person.load))}
                                style={{ width: `${Math.min(person.load, 100)}%` }}
                              />
                            </div>
                            <span className={cn(
                              "text-[13px] font-bold tabular-nums min-w-[40px] text-right",
                              person.load > 100 ? "text-rose-600" : person.load === 100 ? "text-amber-600" : "text-text dark:text-slate-300"
                            )}>
                              {person.load}%
                            </span>
                          </div>
                      <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-tight">
                        {person.currentActivity !== 'свободен' ? person.currentActivity : ''}
                      </div>
                        </td>
                        {person.weeks.map((week, i) => (
                          <td key={i} className="px-2 py-4 border-l border-border/50">
                            <div className={cn(
                              "h-8 rounded flex items-center justify-center text-[10px] font-medium px-2 text-center leading-tight whitespace-nowrap",
                              week === '—' ? "text-text-muted/30" : "bg-primary/5 text-primary border border-primary/10"
                            )}>
                              {week}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
            <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHeadCell stickyOffset={152}>Специалист</TableHeadCell>
                <TableHeadCell stickyOffset={152}>Статус</TableHeadCell>
                <TableHeadCell stickyOffset={152}>Загрузка</TableHeadCell>
                <TableHeadCell stickyOffset={152} className="whitespace-nowrap">Доступен с</TableHeadCell>
                <TableHeadCell stickyOffset={152} className="text-right">Действие</TableHeadCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uiState === 'loading' ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-1.5 w-24 rounded-full" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 rounded-md ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : uiState === 'empty' ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="p-0">
                    <EmptyState
                      icon={Users}
                      title="Специалисты не найдены"
                      description="По вашему запросу ничего не нашлось. Попробуйте сбросить фильтры или изменить поисковый запрос."
                      action={{
                        label: "Сбросить фильтры",
                        onClick: () => {
                          setSearchQuery('');
                          setStatusFilter('all');
                        }
                      }}
                      className="py-20"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredPeople.map(person => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-text dark:text-slate-200">{person.name}</span>
                        <div className="flex items-center gap-2 text-[11px] text-text-muted dark:text-slate-500">
                          <span>{person.role}</span>
                          <span className="text-border dark:text-slate-800">·</span>
                          <span>{person.stack}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={person.status === 'free' ? 'success' : person.status === 'busy' ? 'danger' : 'warning'} dot size="sm">
                        {person.status === 'free' ? 'Свободен' : person.status === 'busy' ? 'Занят' : 'Частично'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700/70 dark:ring-1 dark:ring-inset dark:ring-slate-600/40 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full transition-all", getLoadColor(person.load))}
                                style={{ width: `${Math.min(person.load, 100)}%` }}
                              />
                        </div>
                        <span className="text-xs font-bold dark:text-slate-300">{person.load}%</span>
                      </div>
                      <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-tight">
                        {person.currentActivity !== 'свободен' ? person.currentActivity : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-text dark:text-slate-200 whitespace-nowrap">{person.freeFrom}</span>
                        {person.assignmentEnd && (
                          <span className="text-[10px] text-text-muted whitespace-nowrap">до {person.assignmentEnd}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('person', person.id)}>Профиль</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {filteredPeople.length === 0 && (
          <div className="p-12 text-center text-text-muted">
            Специалисты не найдены. Попробуйте изменить фильтры.
          </div>
        )}
      </main>

      {/* Add Specialist Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Добавить специалиста"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setIsDrawerOpen(false)}>
              Отмена
            </Button>
            <Button className="flex-1" isLoading={isSaving} onClick={handleAddSpecialist}>
              Сохранить
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">ФИО специалиста</label>
            <input 
              type="text" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Иванов Иван Иванович"
              className="w-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Роль / Специализация</label>
            <select 
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200"
            >
              <option value="DevOps">DevOps</option>
              <option value="SRE">SRE</option>
              <option value="Java">Java Developer</option>
              <option value="Go">Go Developer</option>
              <option value="Python">Python Developer</option>
              <option value="Frontend">Frontend Developer</option>
              <option value="QA Auto">QA Automation</option>
              <option value="System Analyst">System Analyst</option>
              <option value="PM">Project Manager</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Стек технологий</label>
            <textarea 
              value={form.stack}
              onChange={(e) => setForm({ ...form, stack: e.target.value })}
              placeholder="K8s, Terraform, Docker..."
              rows={3}
              className="w-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Статус</label>
              <select 
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200"
              >
                <option value="free">Свободен</option>
                <option value="partial">Частично</option>
                <option value="busy">Занят</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Загрузка (%)</label>
              <input 
                type="number" 
                min="0"
                max="150"
                value={form.load}
                onChange={(e) => setForm({ ...form, load: parseInt(e.target.value) || 0 })}
                className="w-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200"
              />
            </div>
          </div>
        </div>
      </Drawer>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};
