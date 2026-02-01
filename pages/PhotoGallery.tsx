
import React from 'react';
import { PhotoEntry } from '../types';

interface Props {
  data: PhotoEntry[];
  onUpdate: (data: PhotoEntry[]) => void;
  onNext: () => void;
}

const PhotoGallery: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
       <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
             <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                <span>Relatórios</span>
                <span className="material-icons-round text-sm">chevron_right</span>
                <span className="text-primary-500">Inspeção Fotográfica</span>
             </nav>
             <h1 className="text-4xl font-black tracking-tight leading-none">Relatório Fotográfico</h1>
             <p className="text-slate-500 font-medium italic mt-2">Unidade Escolar Selecionada • Registro de Evidências</p>
          </div>
          <div className="bg-success/10 text-success px-5 py-2 rounded-full text-xs font-black flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">check_circle</span>
             Salvo Automaticamente
          </div>
       </header>

       <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
          <button className="px-8 py-4 border-b-4 border-primary-500 text-primary-500 font-black text-sm whitespace-nowrap">Todas as Fotos ({data.length})</button>
          <button className="px-8 py-4 border-b-4 border-transparent text-slate-400 font-bold text-sm whitespace-nowrap hover:text-primary-500 transition-colors">Sem Legenda</button>
          <button className="px-8 py-4 border-b-4 border-transparent text-slate-400 font-bold text-sm whitespace-nowrap hover:text-primary-500 transition-colors">Sem Categoria</button>
       </div>

       <div className="group flex flex-col items-center justify-center border-4 border-dashed border-primary-500/30 bg-primary-500/5 rounded-3xl p-16 hover:border-primary-500 hover:bg-primary-500/10 transition-all cursor-pointer">
          <div className="size-20 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
             <span className="material-icons-round text-5xl">cloud_upload</span>
          </div>
          <h3 className="text-2xl font-black mb-2 text-center">Arraste e solte fotos de alta resolução</h3>
          <p className="text-slate-400 font-medium text-center mb-10 max-w-md">Formatos: JPEG, PNG. Limite de 10MB por arquivo. Recomendado 1920x1080.</p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-primary-500/30 transition-all">
             <span className="material-icons-round">add_a_photo</span>
             Selecionar Arquivos
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { cat: 'Infraestrutura', color: 'bg-primary-500', img: 'https://picsum.photos/seed/infra/800/450' },
            { cat: 'Cozinha', color: 'bg-warning', img: 'https://picsum.photos/seed/kitchen/800/450' },
            { cat: 'Sala de Aula', color: 'bg-success', img: 'https://picsum.photos/seed/class/800/450' }
          ].map((item, idx) => (
            <div key={idx} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all">
               <div className="relative aspect-video">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Evidência" />
                  <div className={`absolute top-4 left-4 ${item.color} text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-xl`}>{item.cat}</div>
                  <button className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-danger p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl"><span className="material-icons-round">delete</span></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-slate-400">Categoria</label>
                     <select className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm font-bold py-2 focus:ring-primary-500"><option>{item.cat}</option></select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-slate-400">Descrição Técnica</label>
                     <textarea className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm min-h-[80px]" placeholder="Relate as inconformidades..."></textarea>
                  </div>
               </div>
            </div>
          ))}
          <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-12 text-slate-400 gap-4 opacity-50 hover:opacity-100 transition-all">
             <span className="material-icons-round text-5xl">add_photo_alternate</span>
             <span className="text-xs font-black uppercase tracking-widest">Novo Slot</span>
          </div>
       </div>

       <div className="sticky bottom-8 left-0 right-0 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 z-30">
          <div className="flex items-center gap-4">
             <div className="size-16 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500"><span className="material-icons-round text-3xl">fact_check</span></div>
             <div>
                <p className="font-black text-lg">Resumo das Evidências</p>
                <p className="text-sm text-slate-500">3 fotos catalogadas. Algumas fotos podem necessitar de legenda.</p>
             </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none px-10 py-4 border border-primary-500 text-primary-500 font-black rounded-2xl">Visualizar Rascunho</button>
             <button onClick={onNext} className="flex-1 sm:flex-none px-12 py-4 bg-primary-500 text-white font-black rounded-2xl shadow-xl shadow-primary-500/30">Gerar Relatório Final</button>
          </div>
       </div>
    </div>
  );
};

export default PhotoGallery;
