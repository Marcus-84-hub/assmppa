import React, { useMemo } from 'react';
import { InspectionData } from '../types';

interface Props {
  data: InspectionData;
  onBack: () => void;
  onDashboard: () => void;
}

const FinalReport: React.FC<Props> = ({ data, onBack, onDashboard }) => {
  
  // -- Logic for Calculations --
  const calculations = useMemo(() => {
    // 1. Staff Counts
    const staff = {
      teachers: 0,
      admin: 0,
      support: 0
    };

    data.professionals.forEach(p => {
      const qty = parseInt(p.qt) || 0;
      const lowerCargo = p.cargo.toLowerCase();
      
      if (lowerCargo.includes('professor') || lowerCargo.includes('pedagog')) {
        staff.teachers += qty;
      } else if (lowerCargo.includes('diretor') || lowerCargo.includes('coord') || lowerCargo.includes('secret') || lowerCargo.includes('admin')) {
        staff.admin += qty;
      } else {
        staff.support += qty; // Servente, vigia, merendeira, etc.
      }
    });

    // 2. Scores Logic (Simplified for Demo)
    // Infrastructure: Starts at 100, deducts for issues
    let infraScore = 100;
    const admin = data.administrative;
    
    if (admin.condition === 'Ruim' || admin.condition === 'Péssima') infraScore -= 15;
    if (admin.condition === 'Regular') infraScore -= 5;
    if (admin.cleaningSatisfactory === false) infraScore -= 10;
    if (admin.hasForro === false) infraScore -= 5;
    if (admin.hasPiso === false) infraScore -= 5;
    if (admin.lighting.geral === false) infraScore -= 5;
    if (admin.equipmentFunctional.ventiladores === false && admin.equipmentFunctional.arCondicionado === false) infraScore -= 10;

    // Infrastructure Items availability
    const totalInfraItems = data.infra.length;
    const presentInfraItems = data.infra.filter(i => i.exists === true).length;
    if (totalInfraItems > 0) {
       const coveragePct = (presentInfraItems / totalInfraItems) * 100;
       if (coveragePct < 50) infraScore -= 10;
    }

    infraScore = Math.max(0, infraScore);

    // Pedagogical Score
    let pedScore = 100;
    const ped = data.pedagogical;

    if (ped.teacherShortage === true) pedScore -= 20;
    if (ped.hasPPP === false) pedScore -= 15;
    if (ped.reforcoEscolar === false) pedScore -= 10;
    if (ped.violence === true) pedScore -= 15;
    
    pedScore = Math.max(0, pedScore);

    // 3. Urgent Findings (Negative flags)
    const findings: string[] = [];
    if (admin.condition === 'Péssima') findings.push("Estado geral de conservação predial crítico");
    if (admin.cleaningSatisfactory === false) findings.push("Higiene e limpeza insatisfatórias");
    if (admin.equipmentFunctional.arCondicionado === false && admin.equipmentFunctional.ventiladores === false) findings.push("Ventilação inadequada nas salas de aula");
    if (admin.lighting.geral === false) findings.push("Iluminação insuficiente");
    if (ped.teacherShortage === true) findings.push("Carência de professores identificada");
    if (ped.violence === true) findings.push("Relatos de violência no ambiente escolar");
    if (data.finance.fundoRotativo === false) findings.push("Ausência de Fundo Rotativo ativo");

    // Overall Status
    const avgScore = (infraScore + pedScore) / 2;
    let status = 'REGULAR';
    if (avgScore >= 80) status = 'BOM';
    if (avgScore < 50) status = 'CRÍTICO';

    return {
      staff,
      scores: {
        infra: Math.round(infraScore),
        pedagogical: Math.round(pedScore),
        overall: avgScore
      },
      status,
      findings
    };
  }, [data]);

  return (
    <div className="max-w-[1024px] mx-auto space-y-8 animate-fadeIn pb-20">
       <nav className="flex items-center gap-3 text-sm font-bold text-slate-400 mb-4 no-print">
          <button onClick={onDashboard} className="hover:text-primary-500 transition-colors">Início</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-primary-500 transition-colors">Voltar</button>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">Relatório Resumo Final</span>
       </nav>

       <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
             <h1 className="text-4xl font-black tracking-tighter">Relatório Resumo da Vistoria</h1>
             <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-sm font-bold text-slate-400">ID: <span className="text-primary-500">#EDU-{data.id.slice(-6)}</span></span>
                <span className="text-slate-300">•</span>
                <span className="text-sm italic text-slate-400">Vistoria: {new Date(data.school.dataVistoria).toLocaleDateString()}</span>
             </div>
          </div>
          <div className="flex gap-4 no-print">
             <button onClick={() => window.print()} className="bg-primary-500 hover:bg-primary-600 transition-colors text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-primary-500/20"><span className="material-icons-round">print</span> Imprimir Relatório</button>
          </div>
       </div>

       <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
             <div className="flex items-start gap-8 border-b border-slate-100 dark:border-slate-800 pb-10">
                <div className="size-32 bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-inner flex shrink-0 items-center justify-center">
                   <span className="material-icons-round text-slate-300 text-6xl">school</span>
                </div>
                <div className="flex-1 space-y-2">
                   <h2 className="text-3xl font-black">{data.school.nome || "Unidade Escolar Não Identificada"}</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold">
                      <p className="text-slate-500">INEP: <span className="text-slate-900 dark:text-white">{data.school.qtdAlunos ? data.school.qtdAlunos + ' alunos' : 'N/I'}</span></p> {/* Usando qtdAlunos como placeholder de dado real */}
                      <p className="text-slate-500">Diretor: <span className="text-slate-900 dark:text-white capitalize">{data.school.diretor || 'Não informado'}</span></p>
                      <p className="text-slate-500">Município: <span className="text-slate-900 dark:text-white capitalize">{data.school.municipio || 'Não informado'}</span></p>
                      <p className="text-slate-500">Contato: <span className="text-slate-900 dark:text-white">{data.school.telefone || 'N/I'}</span></p>
                   </div>
                </div>
             </div>

             {calculations.findings.length > 0 ? (
                 <div className="bg-danger/10 border-l-8 border-danger p-8 rounded-r-3xl space-y-4">
                    <div className="flex items-center gap-3 text-danger mb-4">
                       <span className="material-icons-round">warning</span>
                       <h3 className="text-xl font-black">Principais Achados e Ações Urgentes</h3>
                    </div>
                    <ul className="space-y-4">
                       {calculations.findings.map((finding, idx) => (
                           <li key={idx} className="flex gap-4 text-sm font-bold text-danger/80">
                              <span className="material-icons-round text-sm">circle</span>
                              <span>{finding}</span>
                           </li>
                       ))}
                    </ul>
                 </div>
             ) : (
                <div className="bg-success/10 border-l-8 border-success p-8 rounded-r-3xl space-y-4">
                    <div className="flex items-center gap-3 text-success mb-4">
                       <span className="material-icons-round">check_circle</span>
                       <h3 className="text-xl font-black">Nenhuma irregularidade crítica</h3>
                    </div>
                    <p className="text-sm font-bold text-success/80">A vistoria não identificou itens urgentes ou críticos baseados nos critérios automáticos.</p>
                </div>
             )}

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Infraestrutura', status: calculations.scores.infra >= 70 ? 'Bom' : 'Atenção', score: calculations.scores.infra + '%', icon: 'apartment', color: calculations.scores.infra >= 70 ? 'bg-success' : 'bg-warning' },
                  { title: 'Pedagógico', status: calculations.scores.pedagogical >= 70 ? 'Bom' : 'Atenção', score: calculations.scores.pedagogical + '%', icon: 'menu_book', color: calculations.scores.pedagogical >= 70 ? 'bg-success' : 'bg-warning' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                           <span className="material-icons-round text-primary-500">{card.icon}</span>
                           <h4 className="font-black text-xs uppercase tracking-widest">{card.title}</h4>
                        </div>
                        <span className={`${card.color} text-white text-[10px] font-black px-2 py-1 rounded-md uppercase`}>{card.status}</span>
                     </div>
                     <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-4">
                        <div className={`${card.color} h-full transition-all duration-1000`} style={{width: card.score}}></div>
                     </div>
                     <p className="text-xs font-bold text-slate-500">Nível de conformidade: {card.score}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
                <h4 className="font-black text-xs uppercase tracking-widest flex items-center gap-2"><span className="material-icons-round text-primary-500">groups</span> Recursos Humanos</h4>
                <div className="space-y-4">
                   {[
                     { l: 'Professores', v: calculations.staff.teachers },
                     { l: 'Equipe Admin', v: calculations.staff.admin },
                     { l: 'Apoio', v: calculations.staff.support }
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold">{item.l}</span>
                        <span className="text-sm font-black text-primary-500">{item.v}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className={`text-white p-8 rounded-3xl shadow-2xl text-center space-y-2 ${calculations.status === 'CRÍTICO' ? 'bg-danger shadow-danger/30' : calculations.status === 'BOM' ? 'bg-success shadow-success/30' : 'bg-warning shadow-warning/30'}`}>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Avaliação Geral</span>
                <p className="text-4xl font-black">{calculations.status}</p>
                <div className="flex items-center justify-center gap-2 text-sm font-bold pt-4 opacity-80">
                   <span className="material-icons-round text-sm">schedule</span>
                   {calculations.status === 'CRÍTICO' ? 'Intervenção Imediata' : 'Ciclo Normal de Vistoria'}
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-20 px-10 border-t border-dashed border-slate-300 dark:border-slate-800 break-inside-avoid">
          <div className="flex flex-col items-center text-center space-y-2">
             <div className="w-64 h-px bg-slate-400 mb-2"></div>
             <p className="font-black capitalize">{data.observations.responsible || 'Responsável Técnico'}</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fiscal Técnico</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
             <div className="w-64 h-px bg-slate-400 mb-2"></div>
             <p className="font-black capitalize">{data.school.diretor || 'Diretor Responsável'}</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Direção da Unidade</p>
          </div>
       </div>
    </div>
  );
};

export default FinalReport;
