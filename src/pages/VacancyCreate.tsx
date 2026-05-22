import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Badge } from '../components/Badge';
import { Toast } from '../components/Toast';
import { Modal } from '../components/Modal';
import { Radio } from '../components/Radio';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Sparkles, 
  Check, 
  Info, 
  ChevronDown, 
  FileText, 
  Type, 
  Calendar, 
  Clock,
  Loader2,
  PlusCircle,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

export const VacancyCreate: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [step, setStep] = useState(1);
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste' | 'generate' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    initiator: '',
    description: '',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Ansible', 'Python', 'Prometheus'],
    grade: 'Senior',
    experience: '3-5 лет',
    english: 'B2 — Upper Intermediate',
    location: 'РФ, Удалёнка',
    startDate: 'ASAP',
    duration: '6 месяцев',
    timezone: 'GMT+3 (МСК)',
    employmentType: 'Полная занятость',
    salaryFrom: '',
    salaryTo: '',
    priority: 'normal'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const skill = newSkillValue.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkillValue('');
      setIsAddingSkill(false);
    }
  };

  const handleContinue = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 1500);
  };

  const handlePublish = () => {
    setShowToast(true);
    setTimeout(() => {
      onCancel();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border dark:border-slate-800 h-16 shrink-0 bg-white dark:bg-[#1e293b] transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowCancelModal(true)} className="text-text-muted dark:text-slate-400 hover:text-text dark:hover:text-slate-100 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-text dark:text-slate-100">Новая вакансия</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  step === s ? "bg-primary" : step > s ? "bg-emerald-500" : "bg-border dark:bg-slate-700"
                )} 
              />
            ))}
            <span className="text-xs font-medium text-text-muted dark:text-slate-400 ml-2">Шаг {step} из 2</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowCancelModal(true)}>Отмена</Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto bg-surface/30 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-2xl mx-auto py-12 px-6">
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-text dark:text-slate-100">С чего начнём?</h2>
                <p className="text-sm text-text-muted dark:text-slate-400">Загрузите описание, вставьте текст или используйте AI для генерации требований.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => setInputMethod('upload')}
                  className={cn(
                    "flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-[#1e293b] border-2 rounded-xl transition-all group",
                    inputMethod === 'upload' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-dashed border-border dark:border-slate-700 hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    inputMethod === 'upload' ? "bg-primary text-white" : "bg-surface dark:bg-slate-800 text-text-muted dark:text-slate-500 group-hover:text-primary group-hover:bg-white dark:group-hover:bg-slate-700"
                  )}>
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-text dark:text-slate-200">Загрузить файл</span>
                    <span className="text-[10px] text-text-muted dark:text-slate-500">PDF, DOCX</span>
                  </div>
                </button>

                <button 
                  onClick={() => setInputMethod('paste')}
                  className={cn(
                    "flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-[#1e293b] border-2 rounded-xl transition-all group",
                    inputMethod === 'paste' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-dashed border-border dark:border-slate-700 hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    inputMethod === 'paste' ? "bg-primary text-white" : "bg-surface dark:bg-slate-800 text-text-muted dark:text-slate-500 group-hover:text-primary group-hover:bg-white dark:group-hover:bg-slate-700"
                  )}>
                    <Type size={24} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-text dark:text-slate-200">Вставить текст</span>
                    <span className="text-[10px] text-text-muted dark:text-slate-500">Из почты или Slack</span>
                  </div>
                </button>

                <button 
                  onClick={() => setInputMethod('generate')}
                  className={cn(
                    "flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-[#1e293b] border-2 rounded-xl transition-all group relative overflow-hidden",
                    inputMethod === 'generate' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-primary/20 dark:border-primary/10 hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <div className="absolute top-1 right-1">
                    <Badge variant="info" className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-indigo-300 border-0 text-[9px] py-0 px-1">AI</Badge>
                  </div>
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    inputMethod === 'generate' ? "bg-primary text-white" : "bg-primary-soft dark:bg-primary/20 text-primary dark:text-indigo-300 group-hover:text-primary group-hover:bg-white dark:group-hover:bg-slate-700"
                  )}>
                    <Sparkles size={24} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-text dark:text-slate-200">AI Генерация</span>
                    <span className="text-[10px] text-text-muted dark:text-slate-500">По названию</span>
                  </div>
                </button>
              </div>

              {inputMethod === 'paste' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Текст вакансии</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Вставьте описание вакансии здесь..."
                    className="w-full h-40 bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 transition-all resize-none"
                  />
                  <div className="flex items-center gap-2 text-[10px] text-primary dark:text-indigo-300 font-medium">
                    <Sparkles size={12} />
                    AI проанализирует текст и заполнит параметры на следующем шаге
                  </div>
                </div>
              )}

              {inputMethod === 'upload' && (
                <div className="p-8 border-2 border-dashed border-border dark:border-slate-700 rounded-lg bg-white dark:bg-[#1e293b] flex flex-col items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <FileText size={32} className="text-text-muted dark:text-slate-500" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text dark:text-slate-200">Перетащите файл или нажмите для выбора</p>
                    <p className="text-xs text-text-muted dark:text-slate-500">DOCX, PDF (макс. 10MB)</p>
                  </div>
                  <Button variant="secondary" size="sm">Выбрать файл</Button>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Название вакансии</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Например: Senior DevOps Engineer"
                    className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Заказчик</label>
                    <div className="relative">
                      <select 
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                      >
                        <option value="">Выберите подразделение...</option>
                        <option value="СберTech">СберTech</option>
                        <option value="Альфа-Банк">Альфа-Банк</option>
                        <option value="Тинькофф">Тинькофф</option>
                        <option value="VK Tech">VK Tech</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Инициатор</label>
                    <div className="relative">
                      <select 
                        name="initiator"
                        value={formData.initiator}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                      >
                        <option value="">Выберите инициатора...</option>
                        <option value="AM (Иванов)">AM (Иванов)</option>
                        <option value="Sales (Петров)">Sales (Петров)</option>
                        <option value="Client (Direct)">Client (Direct)</option>
                        <option value="Internal">Internal</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full py-6 text-base gap-2" 
                  onClick={handleContinue}
                  disabled={!inputMethod || !formData.title || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      AI анализирует данные...
                    </>
                  ) : (
                    <>
                      Продолжить
                      <ChevronRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-text dark:text-slate-100">Параметры подбора</h2>
                <p className="text-sm text-text-muted dark:text-slate-400">AI проанализировал описание и выделил ключевые требования.</p>
              </div>

              <div className="space-y-6 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-border dark:border-slate-700 shadow-sm transition-colors duration-300">
                {/* Требования */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-primary dark:text-indigo-300 uppercase tracking-widest border-b border-border dark:border-slate-800 pb-2">Требования</h3>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      Ключевые навыки
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Sparkles size={10} />
                        Подобрано AI
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2 p-3 bg-surface/50 dark:bg-slate-800/50 rounded-lg border border-border/50 dark:border-slate-700/50 transition-colors">
                      {formData.skills.map(skill => (
                        <Chip key={skill} label={skill} onRemove={() => toggleSkill(skill)} className="bg-white dark:bg-slate-700" />
                      ))}
                      
                      {isAddingSkill ? (
                        <form onSubmit={handleAddSkill} className="flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                          <input
                            autoFocus
                            type="text"
                            value={newSkillValue}
                            onChange={(e) => setNewSkillValue(e.target.value)}
                            onBlur={() => !newSkillValue && setIsAddingSkill(false)}
                            placeholder="Навык..."
                            className="text-[11px] px-2 py-0.5 rounded border border-primary bg-white dark:bg-slate-700 outline-none w-24"
                          />
                          <button type="submit" className="text-emerald-500 hover:text-emerald-600">
                            <Check size={14} />
                          </button>
                          <button type="button" onClick={() => setIsAddingSkill(false)} className="text-rose-500 hover:text-rose-600">
                            <X size={14} />
                          </button>
                        </form>
                      ) : (
                        <button 
                          onClick={() => setIsAddingSkill(true)} 
                          className="text-[11px] text-primary dark:text-indigo-300 font-bold px-2 py-0.5 hover:bg-primary/5 rounded transition-colors flex items-center gap-1"
                        >
                          <PlusCircle size={12} />
                          Добавить
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Грейд</label>
                      <div className="flex gap-1 p-1 bg-surface dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700 transition-colors">
                        {['Middle', 'Senior', 'Lead'].map(g => (
                          <button 
                            key={g} 
                            onClick={() => handleRadioChange('grade', g)}
                            className={cn("flex-1 py-1.5 text-[11px] font-bold rounded transition-all", formData.grade === g ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-indigo-300" : "text-text-muted dark:text-slate-500 hover:text-text dark:hover:text-slate-300")}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Опыт работы</label>
                      <div className="flex gap-1 p-1 bg-surface dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700 transition-colors">
                        {['1-3 года', '3-5 лет', '6+ лет'].map(exp => (
                          <button 
                            key={exp} 
                            onClick={() => handleRadioChange('experience', exp)}
                            className={cn("flex-1 py-1.5 text-[11px] font-bold rounded transition-all", formData.experience === exp ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-indigo-300" : "text-text-muted dark:text-slate-500 hover:text-text dark:hover:text-slate-300")}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Английский</label>
                      <div className="relative">
                        <select 
                          name="english"
                          value={formData.english}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                        >
                          <option value="Не требуется">Не требуется</option>
                          <option value="A2 — Elementary">A2 — Elementary</option>
                          <option value="B1 — Intermediate">B1 — Intermediate</option>
                          <option value="B2 — Upper Intermediate">B2 — Upper Intermediate</option>
                          <option value="C1 — Advanced">C1 — Advanced</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Локация</label>
                      <div className="relative">
                        <select 
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                        >
                          <option value="РФ, Удалёнка">РФ, Удалёнка</option>
                          <option value="Москва, Офис">Москва, Офис</option>
                          <option value="Релокация">Релокация</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Условия и сроки */}
                <div className="space-y-6 pt-2">
                  <h3 className="text-xs font-bold text-primary dark:text-indigo-300 uppercase tracking-widest border-b border-border dark:border-slate-800 pb-2">Условия и сроки</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Дата старта</label>
                      <div className="flex gap-1 p-1 bg-surface dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700 transition-colors">
                        {['ASAP', 'Выбрать дату'].map(d => (
                          <button 
                            key={d} 
                            onClick={() => handleRadioChange('startDate', d)}
                            className={cn("flex-1 py-1.5 text-[11px] font-bold rounded transition-all", formData.startDate === d ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-indigo-300" : "text-text-muted dark:text-slate-500 hover:text-text dark:hover:text-slate-300")}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Длительность</label>
                      <div className="relative">
                        <select 
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                        >
                          <option value="3 месяца">3 месяца</option>
                          <option value="6 месяцев">6 месяцев</option>
                          <option value="12 месяцев">12 месяцев</option>
                          <option value="Ongoing (бессрочно)">Ongoing (бессрочно)</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Часовой пояс / Overlap</label>
                      <div className="relative">
                        <select 
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                        >
                          <option value="GMT+3 (МСК)">GMT+3 (МСК)</option>
                          <option value="GMT+2 (EET)">GMT+2 (EET)</option>
                          <option value="GMT+5 (Урал)">GMT+5 (Урал)</option>
                          <option value="Без ограничений">Без ограничений</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Тип занятости</label>
                      <div className="relative">
                        <select 
                          name="employmentType"
                          value={formData.employmentType}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none dark:text-slate-200 transition-all"
                        >
                          <option value="Полная занятость">Полная занятость</option>
                          <option value="Проектная работа">Проектная работа</option>
                          <option value="Частичная занятость">Частичная занятость</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Зарплатная вилка (net)</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          name="salaryFrom"
                          value={formData.salaryFrom}
                          onChange={handleInputChange}
                          placeholder="от"
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 transition-all"
                        />
                        <span className="text-text-muted dark:text-slate-500">—</span>
                        <input 
                          type="text" 
                          name="salaryTo"
                          value={formData.salaryTo}
                          onChange={handleInputChange}
                          placeholder="до"
                          className="w-full bg-white dark:bg-[#1e293b] border border-border dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text dark:text-slate-400 uppercase tracking-wider">Приоритет</label>
                      <div className="flex items-center gap-6 h-[42px]">
                        <Radio 
                          checked={formData.priority === 'normal'}
                          onChange={() => handleRadioChange('priority', 'normal')}
                          label="Обычный"
                        />
                        <Radio 
                          checked={formData.priority === 'urgent'}
                          onChange={() => handleRadioChange('priority', 'urgent')}
                          label="Высокий"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-soft dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-lg flex gap-3 transition-colors duration-300">
                <Info size={18} className="text-primary dark:text-indigo-300 shrink-0 mt-0.5" />
                <p className="text-xs text-primary dark:text-indigo-300/80 leading-relaxed">
                  После публикации AI начнёт автоматический поиск кандидатов в базе и на внешних ресурсах. Первые результаты появятся через 2-3 минуты.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="secondary" className="flex-1 py-6" onClick={() => setStep(1)}>Назад</Button>
                <Button 
                  className="flex-[2] py-6 text-base gap-2" 
                  onClick={handlePublish}
                  disabled={showToast}
                >
                  {showToast ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Публикация...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Опубликовать вакансию
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showToast && (
        <Toast 
          message="Вакансия успешно опубликована!" 
          onClose={() => setShowToast(false)} 
        />
      )}

      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Отменить создание?"
        maxWidth="sm"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCancelModal(false)}>Продолжить</Button>
            <Button variant="danger" className="flex-1" onClick={onCancel}>Да, отменить</Button>
          </div>
        }
      >
        <p className="text-sm text-text-muted dark:text-slate-400">
          Все введенные данные будут потеряны. Вы уверены, что хотите выйти?
        </p>
      </Modal>
    </div>
  );
};
