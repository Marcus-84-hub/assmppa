
import React from 'react';

const Step4Administrative: React.FC<any> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8">
        <header className="mb-10 border-b border-slate-100 dark:border-slate-800 pb-4">
           <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Seção IV</span>
           <h2 className="text-3xl font-black mt-4">Aspectos Administrativos e Sala de Aula</h2>
           <p className="text-slate-500 dark:text-slate-400 mt-2">Condições físicas e operacionais detalhadas.</p>
        </header>

        <section className="space-y-12">
           <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary-500 mb-6">
                <span className="material-icons-round">meeting_room</span>
                <h3 className="text-lg font-bold uppercase tracking-tight">1. Condições da Sala de Aula</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <p className="font-bold text-slate-700 dark:text-slate-200">Em quais condições a sala de aula se encontra?</p>
                  <div className="flex gap-4">
                     {['Boa', 'Regular', 'Ruim'].map(opt => (
                       <label key={opt} className="flex-1 cursor-pointer group">
                          <input type="radio" name="condition" className="hidden peer" />
                          <div className="text-center py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:text-primary-500 transition-all font-bold text-sm">
                            {opt}
                          </div>
                       </label>
                     ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="font-bold text-slate-700 dark:text-slate-200">a) Conservação e limpeza satisfatória?</p>
                  <div className="flex gap-4">
                     {['Sim', 'Não'].map(opt => (
                       <label key={opt} className="flex-1 cursor-pointer group">
                          <input type="radio" name="cleaning" className="hidden peer" />
                          <div className="text-center py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:text-primary-500 transition-all font-bold text-sm">
                            {opt}
                          </div>
                       </label>
                     ))}
                  </div>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
              <div className="space-y-4">
                <p className="font-bold text-slate-700 dark:text-slate-200">2. Possui forro?</p>
                <div className="flex gap-4 mb-4">
                  <label className="flex-1"><input type="radio" name="forro" className="mr-2" /> Sim</label>
                  <label className="flex-1"><input type="radio" name="forro" className="mr-2" /> Não</label>
                </div>
                <select className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500">
                  <option>Selecione a condição do forro...</option>
                  <option>Boa</option><option>Regular</option><option>Ruim</option>
                </select>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-slate-700 dark:text-slate-200">3. Possui piso?</p>
                <div className="flex gap-4 mb-4">
                  <label className="flex-1"><input type="radio" name="piso" className="mr-2" /> Sim</label>
                  <label className="flex-1"><input type="radio" name="piso" className="mr-2" /> Não</label>
                </div>
                <select className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500">
                  <option>Selecione a condição do piso...</option>
                  <option>Boa</option><option>Regular</option><option>Ruim</option>
                </select>
              </div>
           </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold">Anterior</button>
           <button onClick={onNext} className="bg-primary-500 text-white px-10 py-3 rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-primary-500/20 transform active:scale-95 transition-all">Próxima Etapa</button>
        </footer>
      </div>
    </div>
  );
};

export default Step4Administrative;
