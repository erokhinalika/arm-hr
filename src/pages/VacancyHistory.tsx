import React, { useState } from 'react';
import { MOCK_DATA } from '../data/mock-data';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeadCell } from '../components/Table';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { VacancyHeader } from '../components/VacancyHeader';
import { Download, Clock, History } from 'lucide-react';
import { cn } from '../utils/cn';

interface VacancyHistoryProps {
  onNavigate: (page: any) => void;
  uiState?: 'normal' | 'loading' | 'empty';
}

export const VacancyHistory: React.FC<VacancyHistoryProps> = ({ onNavigate, uiState = 'normal' }) => {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 overflow-y-auto">
      <div className="sticky top-0 z-40 bg-[#f8fafc]/80 dark:bg-[#0f172a]/80 backdrop-blur-md transition-colors duration-300">
        <VacancyHeader
          title="DevOps-инженер (Senior)"
          client="СберTech"
          subtitle="История и аналитика подбора"
          activeTab="history"
          onNavigate={onNavigate}
          actions={
            <Button variant="secondary" size="sm" className="gap-2">
              <Download size={14} />
              Отчёт
            </Button>
          }
        />
      </div>

      {/* Scrolling Content */}
      <main className="flex-1">
        <div className="p-8 pt-6 space-y-4">
          {/* Timeline Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-text dark:text-slate-300 uppercase tracking-wider">Лог событий</h3>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHeadCell stickyOffset={192} className="w-32">Время</TableHeadCell>
                  <TableHeadCell stickyOffset={192}>Событие</TableHeadCell>
                  <TableHeadCell stickyOffset={192}>Кандидат</TableHeadCell>
                  <TableHeadCell stickyOffset={192}>Детали</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uiState === 'loading' ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : uiState === 'empty' || MOCK_DATA.timelineEvents.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="p-0">
                      <EmptyState
                        icon={History}
                        title="История пуста"
                        description="По этой вакансии пока нет событий. Все действия с кандидатами будут отображаться здесь."
                        className="py-20"
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  MOCK_DATA.timelineEvents.map((event, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2 text-text-muted dark:text-slate-400 tabular-nums">
                          <Clock size={12} />
                          {event.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.reject ? 'danger' : event.type === 'highlight' ? 'info' : 'neutral'} dot size="sm">
                          {event.title}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-surface dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-text-muted dark:text-slate-500">
                            {event.candidate === 'all' ? 'AI' : event.candidate.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium text-text dark:text-slate-200">{event.text.split(' · ')[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-text-muted dark:text-slate-400">{event.text.includes(' · ') ? event.text.split(' · ')[1] : '—'}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};
