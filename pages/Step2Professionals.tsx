
import React from 'react';
import { ProfessionalRow } from '../types';

interface Props {
  data: ProfessionalRow[];
  onUpdate: (data: ProfessionalRow[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Professionals: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const handleCellChange = (rowIndex: number, field: keyof ProfessionalRow, value: string) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    onUpdate(newData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideUp">
      <div className="bg-slate-100 dark:bg-slate-800 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase">II - PROFISSIONAIS DE EDUCAÇÃO</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Quantitativo de servidores e funcionários por vínculo empregatício.</p>
      </div>

      <div className="p-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 border-r border-slate-200 dark:border-slate-800" rowSpan={2}>Cargos</th>
                  <th className="p-4 text-center border-r border-slate-200 dark:border-slate-800" rowSpan={2}>QT</th>
                  <th className="p-4 text-center" colSpan={3}>Vínculo</th>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-bold text-slate-400 uppercase tracking-tighter border-b border-slate-200 dark:border-slate-800 text-center">
                  <th className="p-2 border-r border-slate-200 dark:border-slate-800">Efetivo</th>
                  <th className="p-2 border-r border-slate-200 dark:border-slate-800">Contratado</th>
                  <th className="p-2">Terceirizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 text-sm font-bold border-r border-slate-200 dark:border-slate-800">{row.cargo}</td>
                    <td className="p-2 border-r border-slate-200 dark:border-slate-800"><input type="number" value={row.qt} onChange={e => handleCellChange(idx, 'qt', e.target.value)} className="w-16 mx-auto block bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-center focus:ring-primary-500" /></td>
                    <td className="p-2 border-r border-slate-200 dark:border-slate-800"><input type="number" value={row.efetivo} onChange={e => handleCellChange(idx, 'efetivo', e.target.value)} className="w-16 mx-auto block bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-center focus:ring-primary-500" /></td>
                    <td className="p-2 border-r border-slate-200 dark:border-slate-800"><input type="number" value={row.contratado} onChange={e => handleCellChange(idx, 'contratado', e.target.value)} className="w-16 mx-auto block bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-center focus:ring-primary-500" /></td>
                    <td className="p-2">
                      {row.terceirizado === 'n/a' ? (
                        <span className="text-xs text-slate-400 italic block text-center">Não se aplica</span>
                      ) : (
                        <input type="number" value={row.terceirizado} onChange={e => handleCellChange(idx, 'terceirizado', e.target.value)} className="w-16 mx-auto block bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-center focus:ring-primary-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">O número de servidores/funcionários é suficiente ao atendimento da demanda?</label>
              <div className="flex gap-8">
                 {['Sim', 'Não', 'Não se aplica'].map(opt => (
                   <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="sufficient" className="text-primary-500 h-5 w-5" />
                      <span className="text-sm font-medium">{opt}</span>
                   </label>
                 ))}
              </div>
              <div className="mt-6">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Se sim, quais as necessidades?</label>
                <textarea className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 text-sm" placeholder="Descreva as necessidades de pessoal..." rows={3}></textarea>
              </div>
           </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <button 
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <span className="material-icons-round text-sm">arrow_back</span>
              Anterior
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

export default Step2Professionals;
