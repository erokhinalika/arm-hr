import React, { useState, useEffect } from 'react';
import { MOCK_RESUME_BALAKIREV } from '../data/mock-data';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  AlertTriangle, 
  History,
  FileText 
} from 'lucide-react';
import { cn } from '../utils/cn';

interface ResumeProps {
  onNavigate: (page: any) => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

export const Resume: React.FC<ResumeProps> = ({ onNavigate, uiState = 'normal' }) => {
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [comment, setComment] = useState('');
  const [showRegenerated, setShowRegenerated] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);

  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setCollapsedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleRegenerate = () => {
    if (!comment.trim()) return;
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setShowRegenerated(true);
      setComment('');
    }, 1500);
  };

  const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => {
    const isCollapsed = collapsedSections.includes(id);
    return (
      <div className="border-b border-border last:border-0">
        <button 
          onClick={() => toggleSection(id)}
          className="flex items-center gap-2 w-full px-6 py-3 hover:bg-surface transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
          <span className="text-xs font-bold text-text uppercase tracking-wider">{title}</span>
        </button>
        {!isCollapsed && (
          <div className="px-6 pb-6 pt-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a] transition-colors duration-300 overflow-y-auto">
      {/* Topbar - Sticky */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md transition-colors duration-300 border-b border-border dark:border-slate-800">
        <header className="flex items-center justify-between px-8 py-4 h-16">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-text dark:text-slate-100">{MOCK_RESUME_BALAKIREV.meta.name}</h1>
              <Badge variant="neutral" dot size="sm" className="dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">{MOCK_RESUME_BALAKIREV.meta.chip}</Badge>
            </div>
            <p className="text-[11px] text-text-muted dark:text-slate-400">{MOCK_RESUME_BALAKIREV.meta.breadcrumb}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 p-1 rounded-md mr-2 transition-colors duration-300">
              <button 
                onClick={() => setViewMode('before')}
                className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors", viewMode === 'before' ? "bg-white dark:bg-slate-700 shadow-sm text-text dark:text-slate-100" : "text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200")}
              >
                Было
              </button>
              <button 
                onClick={() => setViewMode('split')}
                className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors", viewMode === 'split' ? "bg-white dark:bg-slate-700 shadow-sm text-text dark:text-slate-100" : "text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200")}
              >
                Сравнение
              </button>
              <button 
                onClick={() => setViewMode('after')}
                className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors", viewMode === 'after' ? "bg-white dark:bg-slate-700 shadow-sm text-text dark:text-slate-100" : "text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200")}
              >
                Стало
              </button>
            </div>
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => onNavigate('funnel')}>
              Отмена
            </Button>
            <Button variant="primary" size="sm" className="gap-2" onClick={() => onNavigate('funnel')}>
              <CheckCircle2 size={16} />
              Утвердить
            </Button>
          </div>
        </header>

        {/* AI Prompt Bar - Sticky below header */}
        <div className="px-8 py-3.5 border-t border-border dark:border-slate-800 flex items-center gap-5">
          <div className="flex items-center gap-2 text-primary dark:text-primary-soft font-bold text-sm shrink-0">
            <Sparkles size={16} />
            AI Адаптация
          </div>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Напиши, что нужно поправить в резюме..."
              className="w-full bg-white dark:bg-[#1e293b] border border-primary/25 dark:border-primary/35 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-slate-200 placeholder:text-text-muted/50 transition-all shadow-sm"
            />
            <button 
              onClick={handleRegenerate}
              disabled={!comment.trim() || isRegenerating}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-hover disabled:opacity-30 p-1 rounded-md transition-colors"
            >
              <Zap size={16} fill="currentColor" />
            </button>
          </div>
          <div className="flex items-center gap-3 ml-2 border-l border-primary/15 dark:border-primary/25 pl-4">
            <span className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider">Подсветка</span>
            <button 
              onClick={() => setShowHighlights(!showHighlights)}
              className={cn(
                "w-9 h-5 rounded-full relative transition-colors duration-200",
                showHighlights ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
              )}
            >
              <div className={cn(
                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                showHighlights ? "translate-x-4" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-[#f1f4f8] dark:bg-[#0f172a] transition-colors duration-300">

          {/* Block-based View */}
          <div className="flex-1 overflow-auto bg-[#f1f4f8] dark:bg-[#0f172a] transition-colors duration-300">
            <div className="max-w-5xl mx-auto py-8 px-8 space-y-6">
              {uiState === 'loading' ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-border dark:border-slate-800">
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="p-8 space-y-4">
                      <SkeletonText lines={3} />
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                ))
              ) : uiState === 'empty' ? (
                <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                  <EmptyState
                    icon={FileText}
                    title="Резюме не найдено"
                    description="Не удалось загрузить данные резюме. Попробуйте вернуться назад и выбрать другого кандидата."
                    action={{
                      label: "Вернуться к воронке",
                      onClick: () => onNavigate('funnel')
                    }}
                    className="py-20"
                  />
                </div>
              ) : (
                MOCK_RESUME_BALAKIREV.sections.map((section) => (
                  <div key={section.id} className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
                    <button 
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-border dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        {collapsedSections.includes(section.id) ? 
                          <ChevronRight size={18} className="text-text-muted" /> : 
                          <ChevronDown size={18} className="text-text-muted" />
                        }
                        <span className="text-[11px] font-bold text-text dark:text-slate-200 uppercase tracking-widest">{section.title}</span>
                      </div>
                      {viewMode === 'split' && (
                        <div className="flex items-center gap-8 text-[10px] font-medium text-text-muted uppercase tracking-wider mr-4">
                          <span className="w-[45%] text-right">Было</span>
                          <span className="w-[45%] text-left">Стало</span>
                        </div>
                      )}
                    </button>
                    
                    {!collapsedSections.includes(section.id) && (
                      <div className="p-0 relative">
                        {isRegenerating && (
                          <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        
                        <div className={cn(
                          "grid gap-0",
                          viewMode === 'split' ? "grid-cols-2" : "grid-cols-1"
                        )}>
                          {/* Before Column */}
                          {(viewMode === 'split' || viewMode === 'before') && (
                            <div className={cn(
                              "p-8",
                              viewMode === 'split' && "border-r border-border dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30"
                            )}>
                              <div 
                                className="prose prose-sm dark:prose-invert max-w-none text-text-muted dark:text-slate-400 break-words opacity-70" 
                                dangerouslySetInnerHTML={{ __html: section.beforeHtml }} 
                              />
                            </div>
                          )}
                          
                          {/* After Column */}
                          {(viewMode === 'split' || viewMode === 'after') && (
                            <div className="p-8 bg-white dark:bg-[#0f172a]">
                              <div 
                                className={cn(
                                  "prose prose-sm dark:prose-invert max-w-none text-text dark:text-slate-200 break-words",
                                  !showHighlights && "hide-diff-highlights"
                                )} 
                                dangerouslySetInnerHTML={{ __html: showRegenerated ? section.afterRegeneratedHtml : section.afterHtml }} 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* AI Summary Sidebar */}
        {isAiSummaryOpen && (
          <aside className="w-80 border-l border-border dark:border-slate-800 flex flex-col bg-surface/30 dark:bg-slate-900/30 transition-colors duration-300">
            <div className="p-6 border-b border-border dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#1e293b] transition-colors duration-300">
              <h3 className="text-xs font-bold text-text dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                AI Валидатор
              </h3>
              <button onClick={() => setIsAiSummaryOpen(false)} className="text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-200 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6 space-y-8">
              {uiState === 'loading' ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Skeleton className="h-3 w-32" />
                    <SkeletonText lines={4} />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-3 w-32" />
                    <SkeletonText lines={3} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-text-muted dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare size={12} />
                      Что изменилось
                    </h4>
                    <ul className="space-y-3">
                      {MOCK_RESUME_BALAKIREV.summary.changes.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text dark:text-slate-300 leading-relaxed">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-text-muted dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle size={12} className="text-amber-500" />
                      Риски и реализм
                    </h4>
                    <ul className="space-y-3">
                      {MOCK_RESUME_BALAKIREV.summary.risks.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text dark:text-slate-300 leading-relaxed">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-md text-[11px] text-amber-800 dark:text-amber-400 leading-normal">
                      <strong>Внимание:</strong> AI добавил навыки, которых нет в исходном резюме. Рекомендуется уточнить у кандидата.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      Сильные стороны
                    </h4>
                    <ul className="space-y-3">
                      {MOCK_RESUME_BALAKIREV.summary.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text leading-relaxed">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-border bg-white">
              <Button variant="secondary" size="sm" className="w-full gap-2 text-text-muted">
                <History size={14} />
                История изменений
              </Button>
            </div>
          </aside>
        )}

        {!isAiSummaryOpen && (
          <button 
            onClick={() => setIsAiSummaryOpen(true)}
            className="w-10 border-l border-border bg-surface/30 flex flex-col items-center py-6 gap-4 hover:bg-surface transition-colors"
          >
            <ShieldCheck size={20} className="text-emerald-500" />
            <div className="[writing-mode:vertical-lr] text-[11px] font-bold text-text-muted uppercase tracking-widest">Валидатор</div>
          </button>
        )}
      </div>
    </div>
  );
};
