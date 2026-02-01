
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Painel de Controle e Mapa de Calor</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Visão geral das vistorias e monitoramento de alertas em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Escolas', value: '1.240', trend: '+2%', icon: 'school', color: 'text-primary-500' },
          { label: 'Vistorias Concluídas', value: '856', trend: '+15%', icon: 'fact_check', color: 'text-success' },
          { label: 'Alertas Críticos', value: '42', trend: '-5%', icon: 'error', color: 'text-danger' },
          { label: 'Conformidade', value: '78%', trend: '+3%', icon: 'verified', color: 'text-primary-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className={`material-icons-round ${stat.color} bg-slate-50 dark:bg-slate-800 p-2 rounded-xl`}>{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold">Mapa de Calor de Problemas - Regional</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-danger"></span> <span className="text-xs font-semibold text-slate-500">Crítico</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-warning"></span> <span className="text-xs font-semibold text-slate-500">Médio</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-success"></span> <span className="text-xs font-semibold text-slate-500">Estável</span></div>
          </div>
        </div>
        <div className="relative h-[500px] bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
           {/* Placeholder for real map */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://picsum.photos/1200/800")'}}></div>
           <div className="relative w-full h-full">
              {/* Fake heatmap circles */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/20 rounded-full blur-2xl"></div>
              
              <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-xl"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Escola Central - 12 Alertas</div>
              </div>
              
              <div className="absolute top-1/2 right-1/3 group cursor-pointer">
                <div className="w-6 h-6 bg-yellow-500 rounded-full border-4 border-white shadow-xl"></div>
              </div>
           </div>

           <div className="absolute top-4 left-4 w-72">
             <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center">
                <span className="material-icons-round text-slate-400 mr-2">search</span>
                <input type="text" placeholder="Filtrar por distrito..." className="bg-transparent border-none focus:ring-0 text-sm w-full" />
             </div>
           </div>

           <div className="absolute bottom-4 right-4 flex flex-col gap-2">
             <button className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300"><span className="material-icons-round">add</span></button>
             <button className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300"><span className="material-icons-round">remove</span></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
