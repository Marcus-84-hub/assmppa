
import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSyncing?: boolean;
  lastSaved?: string;
  onSyncManual?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSyncing, lastSaved, onSyncManual }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <span className="material-icons-round">menu</span>
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Unidade Escolar</h2>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Fiscalização Ativa • Offline Sincronizado</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-bold transition-all" title={lastSaved ? `Salvo às ${lastSaved}` : 'Pronto'}>
          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
          {isSyncing ? 'Sincronizando...' : 'Online'}
        </div>

        {onSyncManual && (
          <button onClick={onSyncManual} disabled={isSyncing} className="p-2 text-primary-500 hover:bg-primary-50 rounded-full transition-colors disabled:opacity-50">
            <span className={`material-icons-round ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
          </button>
        )}

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-tight">Inspetor Logado</p>
            <p className="text-[10px] uppercase text-slate-500 font-bold">Sessão Ativa</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg">
            <span className="material-icons-round">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
