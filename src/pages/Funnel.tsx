import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mock-data';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Badge } from '../components/Badge';
import { Drawer } from '../components/Drawer';
import { Checkbox } from '../components/Checkbox';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { VacancyHeader } from '../components/VacancyHeader';
import { MoreHorizontal, UserPlus, Columns, Clock, CheckCircle2, FileText, History, Ban, RotateCcw, Download, Users } from 'lucide-react';
import { cn } from '../utils/cn';

interface FunnelProps {
  onNavigate: (page: any) => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

export const Funnel: React.FC<FunnelProps> = ({ onNavigate, uiState = 'normal' }) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isColumnDrawerOpen, setIsColumnDrawerOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(MOCK_DATA.pipelineColumns.map(c => c.id).filter(id => id !== 'reject'));

  const selectedCandidate = selectedCandidateId ? MOCK_DATA.candidates[selectedCandidateId as keyof typeof MOCK_DATA.candidates] : null;

  const candidatesByColumn = useMemo(() => {
    const result: Record<string, any[]> = {};
    MOCK_DATA.pipelineColumns.forEach(col => {
      result[col.id] = Object.values(MOCK_DATA.candidates).filter(c => (c.column || 'ai') === col.id);
    });
    return result;
  }, []);

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <div 
      onClick={() => setSelectedCandidateId(candidate.id)}
      className={cn(
        "group p-3 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg shadow-sm hover:border-primary transition-all cursor-pointer space-y-2",
        selectedCandidateId === candidate.id && "border-primary ring-1 ring-primary/20 bg-primary/5 dark:bg-primary/10",
        candidate.column === 'reject' && "bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/50 opacity-80",
        candidate.cornerTag?.type === 'busy' && "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-text dark:text-slate-100 leading-tight">{candidate.short}</span>
        {candidate.score > 0 && (
          <span className={cn(
            "text-[13px] font-bold tabular-nums",
            candidate.score >= 80 ? "text-primary dark:text-primary-soft" : "text-text-muted dark:text-slate-400"
          )}>
            {candidate.score}%
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {candidate.reasons?.slice(0, 2).map((r: string) => (
          <Chip key={r} label={r} className="bg-white/50 dark:bg-slate-700/50" />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-muted dark:text-slate-400 pt-1">
        <div className="flex items-center gap-1">
          {candidate.cornerTag && (
            <span className={cn(
              "font-medium",
              candidate.cornerTag.type === 'warning' ? "text-amber-600 dark:text-amber-500" : "text-secondary dark:text-secondary-soft"
            )}>
              {candidate.cornerTag.text}
            </span>
          )}
          {!candidate.cornerTag && candidate.statusNote && (
            <span>{candidate.statusNote.split(' · ')[0]}</span>
          )}
        </div>
        {candidate.stageTime && (
          <div className="flex items-center gap-1">
            <Clock size={10} />
            {candidate.stageTime}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 overflow-y-auto">
      <div className="sticky top-0 z-40 bg-[#f8fafc]/80 dark:bg-[#0f172a]/80 backdrop-blur-md transition-colors duration-300">
        <VacancyHeader
          title="DevOps-инженер (Senior)"
          client="СберTech"
          subtitle="FinTech, Kubernetes, 5+ лет · Senior · Full-time"
          activeTab="funnel"
          onNavigate={onNavigate}
          actions={
            <>
              <Button variant="secondary" size="sm" className="gap-2">
                <UserPlus size={14} />
                Подбор
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="gap-2"
                onClick={() => setIsColumnDrawerOpen(true)}
              >
                <Columns size={14} />
                Колонки
              </Button>
            </>
          }
        />
      </div>

      {/* Board */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden flex p-6 gap-4">
        {MOCK_DATA.pipelineColumns.filter(col => visibleColumns.includes(col.id)).map(col => (
          <div key={col.id} className="flex-shrink-0 w-64 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  col.id === 'ai' ? "bg-primary" : col.id === 'review' ? "bg-amber-500" : col.id === 'ready' ? "bg-emerald-500" : "bg-slate-400"
                )} />
                <h3 className="text-xs font-bold text-text dark:text-slate-300 uppercase tracking-wider">{col.title}</h3>
                <span className="text-[11px] font-bold text-text-muted dark:text-slate-500 bg-surface dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                  {candidatesByColumn[col.id]?.length || 0}
                </span>
              </div>
              <button className="text-text-muted dark:text-slate-500 hover:text-text dark:hover:text-slate-300">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {uiState === 'loading' ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))
              ) : uiState === 'empty' ? (
                <EmptyState
                  icon={Users}
                  title="Нет кандидатов"
                  description="В этой колонке пока пусто. Подберите кандидатов из банка резюме."
                  className="py-10"
                />
              ) : (
                <>
                  {candidatesByColumn[col.id]?.map(c => (
                    <CandidateCard key={c.id} candidate={c} />
                  ))}
                  {(!candidatesByColumn[col.id] || candidatesByColumn[col.id].length === 0) && (
                    <div className="h-24 border-2 border-dashed border-border dark:border-slate-800 rounded-lg flex items-center justify-center text-[11px] text-text-muted dark:text-slate-500">
                      Нет кандидатов
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Candidate Drawer */}
      <Drawer
        isOpen={!!selectedCandidateId}
        onClose={() => setSelectedCandidateId(null)}
        title="Карточка кандидата"
        footer={
          <div className="flex flex-col gap-3">
            {/* Main Actions - Stacked */}
            <div className="flex flex-col gap-2">
              {selectedCandidate?.actions?.includes('send') && (
                <Button className="w-full gap-2" variant="primary">
                  <CheckCircle2 size={16} />
                  Отправить заказчику
                </Button>
              )}
              {selectedCandidate?.actions?.includes('download-adapted') && (
                <Button className="w-full gap-2" variant="secondary">
                  <Download size={16} />
                  Скачать адаптированное резюме
                </Button>
              )}
              {selectedCandidate?.actions?.includes('review') && (
                <Button className="w-full gap-2" variant="primary" onClick={() => onNavigate('resume')}>
                  Взять на проверку
                </Button>
              )}
              {selectedCandidate?.actions?.includes('resume') && (
                <Button className="w-full gap-2" variant="secondary" onClick={() => onNavigate('resume')}>
                  <FileText size={16} />
                  Проверить резюме
                </Button>
              )}
            </div>

            {/* Secondary Actions - Row */}
            <div className="flex gap-2">
              {selectedCandidate?.actions?.includes('history') && (
                <Button variant="secondary" className="flex-1 gap-2" size="sm" onClick={() => onNavigate('history')}>
                  <History size={14} />
                  История
                </Button>
              )}
              {selectedCandidate?.actions?.includes('restore') && (
                <Button variant="secondary" className="flex-1 gap-2" size="sm">
                  <RotateCcw size={14} />
                  Восстановить
                </Button>
              )}
            </div>

            {selectedCandidate?.actions?.includes('reject') && (
              <Button variant="danger" className="w-full gap-2">
                <Ban size={16} />
                Отказать
              </Button>
            )}
          </div>
        }
      >
        {selectedCandidate && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-text dark:text-slate-100">{selectedCandidate.name}</h2>
              <p className="text-sm text-text-muted dark:text-slate-400">{selectedCandidate.role}</p>
            </div>

            <div className="bg-surface dark:bg-slate-800/50 rounded-lg p-4 space-y-3 border border-border dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text dark:text-slate-300 uppercase tracking-wider">Соответствие AI</span>
                <span className="text-lg font-bold text-primary dark:text-primary-soft tabular-nums">{selectedCandidate.score}%</span>
              </div>
              <ul className="space-y-2">
                {selectedCandidate.reasons?.map((r: string) => (
                  <li key={r} className="flex items-start gap-2 text-xs text-text dark:text-slate-300">
                    <div className="mt-1 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-text-muted dark:text-slate-400 pt-1 border-t border-border/50 dark:border-slate-700">{selectedCandidate.matchHint}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text dark:text-slate-300 uppercase tracking-wider">Контекст для решения</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="space-y-1">
                  <span className="text-[11px] text-text-muted dark:text-slate-500 font-medium">Доступность</span>
                  <p className="text-xs text-text dark:text-slate-200 font-medium whitespace-nowrap">{selectedCandidate.availability}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-text-muted dark:text-slate-500 font-medium">Английский</span>
                  <p className={cn("text-xs font-medium", (selectedCandidate as any).englishWarn ? "text-amber-600 dark:text-amber-500" : "text-text dark:text-slate-200")}>
                    {selectedCandidate.english}
                  </p>
                </div>
                <div className="col-span-2 space-y-1">
                  <span className="text-[11px] text-text-muted dark:text-slate-500 font-medium">Фидбек</span>
                  <p className="text-xs text-text dark:text-slate-300">{selectedCandidate.feedback}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-text dark:text-slate-300 uppercase tracking-wider">Последние шаги</h3>
                <button className="text-[11px] text-primary dark:text-primary-soft font-semibold hover:underline">Вся история →</button>
              </div>
              <ul className="space-y-3">
                {selectedCandidate.activity?.map((a: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[11px] text-text-muted dark:text-slate-500 font-medium tabular-nums mt-0.5">{a.time}</span>
                    <span className="text-xs text-text dark:text-slate-300">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>

      {/* Column Settings Drawer */}
      <Drawer
        isOpen={isColumnDrawerOpen}
        onClose={() => setIsColumnDrawerOpen(false)}
        title="Настройка колонок"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-muted dark:text-slate-400">
            Выберите колонки, которые будут отображаться на доске воронки.
          </p>
          <div className="space-y-2">
            {MOCK_DATA.pipelineColumns.map(col => (
              <div key={col.id} className="p-3 rounded-xl border border-border dark:border-slate-700 hover:bg-surface dark:hover:bg-slate-800 transition-colors">
                <Checkbox 
                  checked={visibleColumns.includes(col.id)}
                  onChange={(checked) => {
                    if (checked) {
                      setVisibleColumns([...visibleColumns, col.id]);
                    } else {
                      setVisibleColumns(visibleColumns.filter(id => id !== col.id));
                    }
                  }}
                  label={col.title}
                  description={col.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};
