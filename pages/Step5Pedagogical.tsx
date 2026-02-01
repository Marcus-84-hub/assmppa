
import React from 'react';

const Step5Pedagogical: React.FC<any> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 animate-slideUp">
      <header className="mb-10 flex items-end justify-between border-b border-primary/20 pb-6">
        <div>
          <span className="text-primary-500 font-black text-xs uppercase tracking-widest">Seção V</span>
          <h2 className="text-3xl font-black mt-2">ASPECTOS PEDAGÓGICOS</h2>
        </div>
      </header>

      <div className="space-y-12">
        <div className="flex items-start gap-4">
           <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 px-3 py-1 rounded-lg font-black mt-1">15</span>
           <div className="flex-1">
              <label className="block text-lg font-bold mb-4">Há falta de professores na unidade escolar?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q15" className="h-5 w-5 text-primary-500" /> <span>Sim</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q15" className="h-5 w-5 text-primary-500" /> <span>Não</span></label>
                 </div>
                 <div className="md:col-span-2">
                    <input type="text" placeholder="Quais disciplinas?" className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2" />
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 bg-primary/5 dark:bg-primary-900/10 rounded-3xl border border-primary/10 space-y-8">
           <h3 className="text-xs font-black text-primary-500 uppercase tracking-widest flex items-center gap-2">
              <span className="material-icons-round text-sm">groups</span> Gestão e Comunidade
           </h3>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="font-bold">16. A Direção da escola é eleita ou referendada pela comunidade escolar?</p>
              <div className="flex gap-4 shrink-0">
                 <label><input type="radio" name="q16" className="mr-2" /> Sim</label>
                 <label><input type="radio" name="q16" className="mr-2" /> Não</label>
              </div>
           </div>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="font-bold">17. A escola possui Grêmio Estudantil?</p>
              <div className="flex gap-4 shrink-0">
                 <label><input type="radio" name="q17" className="mr-2" /> Sim</label>
                 <label><input type="radio" name="q17" className="mr-2" /> Não</label>
                 <label><input type="radio" name="q17" className="mr-2" /> N/A</label>
              </div>
           </div>
        </div>
      </div>

      <footer className="mt-16 flex justify-between items-center">
         <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 font-bold">Anterior</button>
         <button onClick={onNext} className="bg-primary-500 text-white px-12 py-3 rounded-xl font-bold shadow-xl shadow-primary-500/20">Próxima Seção</button>
      </footer>
    </div>
  );
};

export default Step5Pedagogical;
