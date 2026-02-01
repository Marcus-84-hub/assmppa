
import React from 'react';

const Step6Finance: React.FC<any> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-10 animate-slideUp">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">VI - ASPECTOS FINANCEIROS E GOVERNANÇA</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Roteiro Objetivo de Fiscalização Financeira.</p>
      </header>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-8 border-primary-500 p-6 mb-12 flex items-start gap-4 rounded-r-3xl">
         <span className="material-icons-round text-primary-500 text-3xl">info</span>
         <p className="text-primary-800 dark:text-primary-200 font-semibold leading-relaxed">
            <strong>Referência:</strong> Salas de aula organizadas com no mínimo de 20 e o máximo de 35 alunos por turma.
         </p>
      </div>

      <form className="space-y-12">
         {[
           { num: '28', text: 'A escola recebe recursos do Governo Federal?', hasText: true, placeholder: 'Ex: PDDE, PNAE, etc...' },
           { num: '29', text: 'A escola possui Conselho Escolar constituído e ativo?' },
           { num: '30', text: 'A escola possui Conselho Fiscal para prestação de contas?' },
           { num: '32', text: 'A escola recebe o Fundo Rotativo estadual?', hasInput: true }
         ].map((q, idx) => (
           <div key={idx} className="space-y-4">
              <div className="flex gap-4 items-start">
                 <span className="font-black text-primary-500 text-xl">{q.num}.</span>
                 <p className="text-lg font-bold">{q.text}</p>
              </div>
              <div className="ml-12 space-y-6">
                 <div className="flex gap-8">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name={`q${q.num}`} className="h-6 w-6 text-primary-500" /> <span className="font-bold">Sim</span></label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name={`q${q.num}`} className="h-6 w-6 text-primary-500" /> <span className="font-bold">Não</span></label>
                 </div>
                 {q.hasText && <textarea className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-2xl p-4" placeholder={q.placeholder} rows={3} />}
                 {q.hasInput && (
                    <div className="max-w-xs space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase">Valor recebido no último ciclo</label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
                          <input type="number" step="0.01" className="w-full pl-12 bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-xl py-3 font-black text-lg" placeholder="0,00" />
                       </div>
                    </div>
                 )}
              </div>
           </div>
         ))}
      </form>

      <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
         <button onClick={onBack} className="w-full md:w-auto px-10 py-4 rounded-2xl border border-slate-200 font-black uppercase tracking-widest text-slate-500">Voltar Etapa</button>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-10 py-4 rounded-2xl border border-primary-500 text-primary-500 font-black">Salvar Rascunho</button>
            <button onClick={onNext} className="flex-1 md:flex-none px-12 py-4 rounded-2xl bg-primary-500 text-white font-black shadow-2xl shadow-primary-500/30">Próxima Etapa</button>
         </div>
      </footer>
    </div>
  );
};

export default Step6Finance;
