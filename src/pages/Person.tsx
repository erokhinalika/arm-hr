import React from 'react';
import { MOCK_DATA } from '../data/mock-data';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { ChevronLeft, ExternalLink, Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { cn } from '../utils/cn';

interface PersonProps {
  id: string;
  onBack: () => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

const Person: React.FC<PersonProps> = ({ id, onBack, uiState = 'normal' }) => {
  const person = MOCK_DATA.bankPeople.find(p => p.id === id);
  const extras = MOCK_DATA.bankPersonExtras[id as keyof typeof MOCK_DATA.bankPersonExtras];

  if (uiState === 'empty' || (!person && uiState === 'normal')) {
    return (
      <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300">
        <header className="flex items-center px-8 py-4 bg-white dark:bg-[#1e293b] border-b border-border dark:border-slate-800 h-16 shrink-0">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-muted">
            <ChevronLeft size={20} />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={User}
            title="Специалист не найден"
            description="Не удалось найти информацию о данном специалисте. Возможно, он был удален или перемещен."
            action={{
              label: "Вернуться в банк",
              onClick: onBack
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300">
      {/* Topbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-[#1e293b] border-b border-border dark:border-slate-800 h-16 shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-muted"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <button onClick={onBack} className="hover:text-primary transition-colors">Банк резюме</button>
            <span>/</span>
            {uiState === 'loading' ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span className="text-text dark:text-slate-200 font-medium">{person?.name}</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="gap-2 h-9" disabled={uiState === 'loading'}>
            <Mail size={16} />
            Написать
          </Button>
          <Button size="sm" className="gap-2 h-9" disabled={uiState === 'loading'}>
            <ExternalLink size={16} />
            Открыть резюме
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {uiState === 'loading' ? (
                <>
                  <Skeleton variant="rounded" className="w-16 h-16" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-xl font-bold transition-colors">
                    {person?.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold text-text dark:text-slate-100 leading-tight">{person?.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                      <span className="font-medium">{person?.role}</span>
                      {person?.group !== person?.role && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span>{person?.group}</span>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* Facts & Checks */}
              <section className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-bold text-text dark:text-slate-100 mb-6">Факты и проверки</h3>
                <div className="space-y-4">
                  {uiState === 'loading' ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <Skeleton variant="circular" className="w-5 h-5 shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))
                  ) : extras?.facts ? (
                    extras.facts.map((fact, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        {fact.includes('отказ') || fact.includes('не рекомендуется') ? (
                          <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        <p className="text-sm text-text dark:text-slate-300 leading-relaxed">{fact}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">Нет данных о проверках</p>
                  )}
                </div>
              </section>

              {/* Submission History */}
              <section className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
                <div className="p-6 border-b border-border dark:border-slate-800">
                  <h3 className="text-lg font-bold text-text dark:text-slate-100">История отправок</h3>
                </div>
                <div className="overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-slate-500">
                        <th className="px-4 py-3">Дата</th>
                        <th className="px-4 py-3">Вакансия</th>
                        <th className="px-4 py-3">Заказчик</th>
                        <th className="px-4 py-3 text-center">Match</th>
                        <th className="px-4 py-3 text-center">Статус</th>
                        <th className="px-4 py-3">Комментарий</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border dark:divide-slate-800">
                      {uiState === 'loading' ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4"><Skeleton className="h-3 w-16" /></td>
                            <td className="px-4 py-4"><Skeleton className="h-3 w-32" /></td>
                            <td className="px-4 py-4"><Skeleton className="h-3 w-24" /></td>
                            <td className="px-4 py-4"><Skeleton className="h-3 w-8 mx-auto" /></td>
                            <td className="px-4 py-4"><Skeleton className="h-6 w-20 rounded-full mx-auto" /></td>
                            <td className="px-4 py-4"><Skeleton className="h-3 w-full" /></td>
                          </tr>
                        ))
                      ) : extras?.sendHistory ? (
                        extras.sendHistory.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-4 text-text-muted whitespace-nowrap text-xs">{item.date}</td>
                            <td className="px-4 py-4 font-medium text-text dark:text-slate-200 text-xs leading-relaxed">{item.vacancy}</td>
                            <td className="px-4 py-4 text-text dark:text-slate-300 text-xs">{item.client}</td>
                            <td className="px-4 py-4 text-center">
                              <span className="font-bold text-primary text-xs">{item.match}</span>
                            </td>
                            <td className="px-4 py-4 flex justify-center">
                              <Badge 
                                variant={
                                  item.status === 'reject' ? 'danger' : 
                                  item.status === 'interview' ? 'success' : 
                                  'warning'
                                }
                                size="sm"
                                className="whitespace-nowrap min-w-[80px] justify-center"
                              >
                                {item.statusLabel}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-text-muted text-[11px] leading-relaxed">{item.detail}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-text-muted">История отправок пуста</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Employment Section */}
              <section className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-text-muted dark:text-slate-500 uppercase tracking-wider">Занятость</h3>
                  {uiState === 'loading' ? (
                    <Skeleton className="h-6 w-20 rounded-full" />
                  ) : (
                  <Badge variant={person?.status === 'free' ? 'success' : person?.status === 'busy' ? 'danger' : 'warning'} dot size="sm">
                    {person?.status === 'free' ? 'Свободен' : person?.status === 'busy' ? 'Занят' : 'Частично'}
                  </Badge>
                  )}
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-text-muted dark:text-slate-400">Загрузка</p>
                      {uiState === 'loading' ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        <p className="text-3xl font-bold text-text dark:text-slate-100 leading-none">{person?.load}%</p>
                      )}
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xs text-text-muted dark:text-slate-400 whitespace-nowrap">Свободен с</p>
                      {uiState === 'loading' ? (
                        <Skeleton className="h-5 w-20 ml-auto" />
                      ) : (
                        <p className="text-sm font-bold text-text dark:text-slate-100 whitespace-nowrap">{person?.freeFrom}</p>
                      )}
                    </div>
                  </div>

                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700/70 dark:ring-1 dark:ring-inset dark:ring-slate-600/40 rounded-full overflow-hidden">
                    {uiState === 'loading' ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <div 
                        className={cn(
                          "h-full transition-all",
                          person?.load === 0 ? "bg-slate-200 dark:bg-slate-800" : person?.load && person.load <= 100 ? "bg-primary" : "bg-rose-500 dark:bg-rose-400"
                        )}
                        style={{ width: `${Math.min(person?.load || 0, 100)}%` }}
                      />
                    )}
                  </div>

                  {uiState === 'loading' ? (
                    <div className="pt-4 border-t border-border dark:border-slate-800 space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : person?.currentActivity !== 'свободен' && (
                    <div className="pt-4 border-t border-border dark:border-slate-800">
                      <p className="text-xs text-text-muted dark:text-slate-400 mb-1">Текущий проект</p>
                      <p className="text-sm font-medium text-text dark:text-slate-200">{person?.currentActivity}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Stack Section */}
              <section className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-sm font-bold text-text-muted dark:text-slate-500 uppercase tracking-wider mb-6">Стек</h3>
                <div className="flex flex-wrap gap-2">
                  {uiState === 'loading' ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-7 w-16 rounded-md" />
                    ))
                  ) : person?.stack.split(', ').map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/40 text-text dark:text-slate-300 rounded-md text-[13px] font-medium border border-slate-200/60 dark:border-slate-700/50 transition-colors hover:border-primary/30 hover:bg-white dark:hover:bg-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Contact Info */}
              <section className="bg-white dark:bg-[#1e293b] border border-border dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-sm font-bold text-text-muted dark:text-slate-500 uppercase tracking-wider mb-6">Контакты</h3>
                <div className="space-y-4">
                  {uiState === 'loading' ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton variant="circular" className="w-4 h-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-text-muted" />
                        <span className="text-text dark:text-slate-300">a.kalyuzhny@example.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-text-muted" />
                        <span className="text-text dark:text-slate-300">+7 999 123-45-67</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={16} className="text-text-muted" />
                        <span className="text-text dark:text-slate-300">Москва, GMT+3</span>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Person;
