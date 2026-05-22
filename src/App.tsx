import React, { useState, useEffect } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Layout, Briefcase, Users, Sun, Moon } from 'lucide-react'
import { cn } from './utils/cn'

import { Funnel } from './pages/Funnel'
import { Resume } from './pages/Resume'
import { Bank } from './pages/Bank'
import Person from './pages/Person'

import { VacancyCreate } from './pages/VacancyCreate'
import { VacancyHistory } from './pages/VacancyHistory'

type Page = 'dashboard' | 'funnel' | 'resume' | 'bank' | 'create-vacancy' | 'history' | 'person'
type UIState = 'normal' | 'loading' | 'empty'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const path = window.location.pathname;
    if (path.includes('vacancy-create')) return 'create-vacancy';
    if (path.includes('vacancy-card')) return 'history';
    if (path.includes('vacancy') || path.includes('funnel')) return 'funnel';
    if (path.includes('resume-bank-person')) return 'person';
    if (path.includes('resume-bank')) return 'bank';
    if (path.includes('resume')) return 'resume';
    return 'dashboard';
  })
  
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('personId') || null;
  })
  const [isDark, setIsDark] = useState(false)
  const [uiState, setUiState] = useState<UIState>('normal')

  useEffect(() => {
    console.log('isDark changed:', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    let path = '/';
    if (currentPage === 'create-vacancy') path = '/vacancy-create-1.html';
    else if (currentPage === 'funnel') path = '/vacancy.html';
    else if (currentPage === 'history') path = '/vacancy-card.html';
    else if (currentPage === 'resume') path = '/resume.html';
    else if (currentPage === 'bank') path = '/resume-bank.html';
    else if (currentPage === 'person') {
      path = `/resume-bank-person.html${selectedPersonId ? `?personId=${selectedPersonId}` : ''}`;
    }
    else path = '/dashboard.html';

    if (window.location.pathname + window.location.search !== path) {
      window.history.pushState(null, '', path);
    }
  }, [currentPage, selectedPersonId])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      let page: Page = 'dashboard';
      if (path.includes('vacancy-create')) page = 'create-vacancy';
      else if (path.includes('vacancy-card')) page = 'history';
      else if (path.includes('vacancy') || path.includes('funnel')) page = 'funnel';
      else if (path.includes('resume-bank-person')) page = 'person';
      else if (path.includes('resume-bank')) page = 'bank';
      else if (path.includes('resume')) page = 'resume';
      
      setCurrentPage(page);
      
      const params = new URLSearchParams(window.location.search);
      setSelectedPersonId(params.get('personId') || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: Page, personId?: string) => {
    if (personId) setSelectedPersonId(personId);
    setCurrentPage(page);
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: Page, label: string, icon: any }) => (
    <button
      onClick={() => setCurrentPage(id)}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full text-left",
        currentPage === id 
          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-dark" 
          : "text-text-muted dark:text-slate-400 hover:bg-surface dark:hover:bg-slate-800 hover:text-text dark:hover:text-slate-100"
      )}
    >
      <Icon size={18} />
      {label}
    </button>
  )

  return (
    <div className="flex h-screen bg-[#f1f4f8] dark:bg-[#0f172a] flex-col transition-colors duration-300">
      {/* Demo Nav */}
      <div className="h-10 bg-[#162033] dark:bg-[#020617] text-white flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">Demo Scenario</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage('dashboard')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'dashboard' ? "bg-white/20 text-white" : "text-white/70")}>Dashboard</button>
            <button onClick={() => setCurrentPage('create-vacancy')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'create-vacancy' ? "bg-white/20 text-white" : "text-white/70")}>Create</button>
            <button onClick={() => setCurrentPage('funnel')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'funnel' ? "bg-white/20 text-white" : "text-white/70")}>Funnel</button>
            <button onClick={() => setCurrentPage('history')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'history' ? "bg-white/20 text-white" : "text-white/70")}>History</button>
            <button onClick={() => setCurrentPage('resume')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'resume' ? "bg-white/20 text-white" : "text-white/70")}>Resume Diff</button>
            <button onClick={() => setCurrentPage('bank')} className={cn("px-2 py-1 text-[11px] font-medium rounded transition-colors hover:bg-white/10", currentPage === 'bank' ? "bg-white/20 text-white" : "text-white/70")}>Talent Bank</button>
          </div>
        </div>
        <div className="text-[10px] font-medium text-white/40">HR ARM Prototype v2.0 · React + Tailwind</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white dark:bg-[#1e293b] border-r border-border dark:border-slate-800 flex flex-col p-4 gap-6 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">HR</div>
            <span className="font-bold text-text dark:text-slate-100">Рекрутер</span>
          </div>
          
          <nav className="flex-1 space-y-1">
            <SidebarItem id="dashboard" label="Вакансии" icon={Briefcase} />
            <SidebarItem id="bank" label="Банк резюме" icon={Users} />
          </nav>

          <div className="pt-4 border-t border-border dark:border-slate-800 space-y-4">
            <div className="px-2 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-slate-500 px-2">Состояние UI</span>
              <div className="flex bg-surface dark:bg-slate-800/50 p-1 rounded-lg border border-border dark:border-slate-700">
                {(['normal', 'loading', 'empty'] as UIState[]).map((state) => (
                  <button
                    key={state}
                    onClick={() => setUiState(state)}
                    className={cn(
                      "flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all",
                      uiState === state 
                        ? "bg-white dark:bg-slate-700 text-primary shadow-sm" 
                        : "text-text-muted dark:text-slate-500 hover:text-text dark:hover:text-slate-300"
                    )}
                  >
                    {state === 'normal' ? 'Data' : state === 'loading' ? 'Load' : 'Empty'}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-surface dark:bg-slate-800/50 border border-border dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-border dark:border-slate-700 group-hover:text-primary transition-colors">
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                  </div>
                  <span className="text-xs font-bold text-text dark:text-slate-300">Тема</span>
                </div>
                <div className={cn(
                  "w-10 h-5 rounded-full relative transition-colors duration-300",
                  isDark ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                )}>
                  <div className={cn(
                    "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300",
                    isDark ? "translate-x-5" : "translate-x-0"
                  )} />
                </div>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} uiState={uiState} />}
          {currentPage === 'create-vacancy' && <VacancyCreate onCancel={() => setCurrentPage('dashboard')} />}
          {currentPage === 'funnel' && <Funnel onNavigate={setCurrentPage} uiState={uiState} />}
          {currentPage === 'history' && <VacancyHistory onNavigate={setCurrentPage} uiState={uiState} />}
          {currentPage === 'resume' && <Resume onNavigate={setCurrentPage} uiState={uiState} />}
          {currentPage === 'bank' && <Bank onNavigate={(page, id) => navigate(page as any, id)} uiState={uiState} />}
          {currentPage === 'person' && selectedPersonId && (
            <Person id={selectedPersonId} onBack={() => setCurrentPage('bank')} uiState={uiState} />
          )}
          {currentPage !== 'dashboard' && currentPage !== 'create-vacancy' && currentPage !== 'funnel' && currentPage !== 'history' && currentPage !== 'resume' && currentPage !== 'bank' && (
            <div className="flex items-center justify-center h-full text-text-muted">
              Страница в разработке
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
