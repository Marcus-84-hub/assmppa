
import React from 'react';
import { InfrastructureItem } from '../types';

interface Props {
  data: InfrastructureItem[];
  onUpdate: (data: InfrastructureItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Infrastructure: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const handleToggle = (id: string, exists: boolean) => {
    onUpdate(data.map(item => item.id === id ? { ...item, exists } : item));
  };

  const handleQtyChange = (id: string, quantity: string) => {
    onUpdate(data.map(item => item.id === id ? { ...item, quantity } : item));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideUp">
      <div className="bg-slate-100 dark:bg-slate-800 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase">III – INFRAESTRUTURA</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Dependências e Espaços Existentes na Unidade.</p>
      </div>

      <div className="p-0">
        <table className="w-full text-left border-collapse">
           <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-8 py-4">Dependências</th>
                <th className="px-4 py-4 text-center">Sim</th>
                <th className="px-4 py-4 text-center">Não</th>
                <th className="px-8 py-4 w-32">Quantidade</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-4 font-bold text-slate-700 dark:text-slate-200">{item.label}</td>
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="radio" 
                      name={`exists-${item.id}`} 
                      checked={item.exists === true}
                      onChange={() => handleToggle(item.id, true)}
                      className="w-6 h-6 text-primary-500 focus:ring-primary-500" 
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="radio" 
                      name={`exists-${item.id}`} 
                      checked={item.exists === false}
                      onChange={() => handleToggle(item.id, false)}
                      className="w-6 h-6 text-slate-300 dark:text-slate-600 focus:ring-slate-500" 
                    />
                  </td>
                  <td className="px-8 py-4">
                    <input 
                      type="number" 
                      value={item.quantity}
                      disabled={item.exists === false}
                      onChange={e => handleQtyChange(item.id, e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-center font-bold focus:ring-primary-500 disabled:opacity-30" 
                    />
                  </td>
                </tr>
              ))}
           </tbody>
        </table>

        <footer className="p-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <button 
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <span className="material-icons-round text-sm">arrow_back</span>
              Voltar
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl border border-primary-500 text-primary-500 font-bold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all">Salvar Rascunho</button>
              <button 
                onClick={onNext}
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all transform active:scale-95"
              >
                Próxima Etapa
                <span className="material-icons-round text-sm">arrow_forward</span>
              </button>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default Step3Infrastructure;
