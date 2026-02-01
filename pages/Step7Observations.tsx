
import React, { useRef, useState } from 'react';

const Step7Observations: React.FC<any> = ({ data, onUpdate, onFinish, onBack }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleFinish = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onFinish();
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-slideUp">
       <div className="bg-slate-200 dark:bg-slate-800 px-10 py-5 rounded-t-3xl border-l-8 border-primary-500">
          <h2 className="text-2xl font-black flex items-center gap-3">
             <span className="material-icons-round">edit_note</span> VII - OUTRAS OBSERVAÇÕES
          </h2>
       </div>

       <div className="bg-white dark:bg-slate-900 p-10 rounded-b-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10">
          <section className="space-y-4">
             <label className="font-black text-lg flex items-center gap-2"><span className="material-icons-round text-primary-500">notes</span> Notas Gerais e Observações Finais</label>
             <textarea className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-3xl p-6 min-h-[300px] text-lg leading-relaxed focus:ring-primary-500" placeholder="Insira aqui as observações adicionais..."></textarea>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Data/Hora da Visita</label>
                <input type="datetime-local" className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-2xl p-3" />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Entrevistados</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-2xl p-3" placeholder="Nomes e cargos" />
             </div>
             <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Responsável pela Entrevista</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 rounded-2xl p-3" placeholder="Nome completo do inspetor" />
             </div>
          </section>

          <section className="space-y-6">
             <div className="flex justify-between items-center">
                <label className="font-black text-lg flex items-center gap-2"><span className="material-icons-round text-primary-500">draw</span> Assinatura Digital</label>
                <button className="text-xs text-danger font-bold uppercase tracking-widest flex items-center gap-1"><span className="material-icons-round text-sm">delete</span> Limpar</button>
             </div>
             <div className="w-full h-48 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-950/50 flex flex-col items-center justify-center cursor-crosshair group relative">
                <div className="flex flex-col items-center text-slate-300 dark:text-slate-600 transition-all group-hover:scale-110">
                   <span className="material-icons-round text-6xl">gesture</span>
                   <p className="text-sm font-bold mt-2">Assine aqui ou carregue uma imagem</p>
                </div>
                <div className="absolute bottom-6 w-1/2 border-t border-slate-200 dark:border-slate-800 text-center pt-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Assinatura do Inspetor</p>
                </div>
             </div>
             <p className="text-xs text-slate-500 italic flex items-center gap-2"><span className="material-icons-round text-sm">security</span> Esta assinatura será criptografada e vinculada ao log de auditoria.</p>
          </section>

          <footer className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
             <button onClick={onBack} className="w-full md:w-auto px-10 py-4 rounded-2xl border border-slate-200 font-black">Voltar</button>
             <div className="flex items-center gap-4 w-full md:w-auto">
                {isSyncing && <span className="text-sm font-bold text-success animate-pulse flex items-center gap-2"><span className="material-icons-round text-sm">sync</span> Sincronizando...</span>}
                <button 
                  onClick={handleFinish}
                  disabled={isSyncing}
                  className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white px-12 py-4 rounded-2xl font-black shadow-2xl shadow-primary-500/30 flex items-center justify-center gap-3 transition-all"
                >
                  Finalizar e Enviar
                  <span className="material-icons-round">send</span>
                </button>
             </div>
          </footer>
       </div>
    </div>
  );
};

export default Step7Observations;
