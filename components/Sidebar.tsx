
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  current: string;
  onNavigate: (page: string) => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, current, onNavigate, onToggle }) => {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'step1', icon: 'info', label: 'I - Identificação' },
    { id: 'step2', icon: 'groups', label: 'II - Profissionais' },
    { id: 'step3', icon: 'business', label: 'III - Infraestrutura' },
    { id: 'step4', icon: 'meeting_room', label: 'IV - Adm. e Sala' },
    { id: 'step5', icon: 'school', label: 'V - Pedagógico' },
    { id: 'step6', icon: 'payments', label: 'VI - Financeiro' },
    { id: 'step7', icon: 'description', label: 'VII - Observações' },
    { id: 'gallery', icon: 'photo_library', label: 'Galeria Fotográfica' },
    { id: 'report', icon: 'assignment_turned_in', label: 'Relatório Final' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full z-20`}>
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 p-2 rounded-lg text-white">
            <span className="material-icons-round">fact_check</span>
          </div>
          {isOpen && <h1 className="font-bold text-lg text-primary-500 tracking-tight">EduInspect</h1>}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  current === item.id 
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-icons-round text-xl">{item.icon}</span>
                {isOpen && <span className="text-sm font-semibold truncate">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-icons-round text-xl">contrast</span>
          {isOpen && <span className="text-sm font-semibold">Alterar Tema</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
