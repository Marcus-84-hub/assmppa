
import React from 'react';
import { SchoolInfo } from '../types';

interface Props {
  data: SchoolInfo;
  onUpdate: (data: SchoolInfo) => void;
  onNext: () => void;
}

const Step1Identification: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  const handleChange = (field: keyof SchoolInfo | string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onUpdate({
        ...data,
        [parent]: {
          ...(data[parent as keyof SchoolInfo] as any),
          [child]: value
        }
      });
    } else {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideUp">
      <div className="bg-slate-100 dark:bg-slate-800 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-black uppercase tracking-tight">I – IDENTIFICAÇÃO DA ESCOLA</h2>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Data da Vistoria:</label>
          <input
            type="date"
            value={data.dataVistoria}
            onChange={(e) => handleChange('dataVistoria', e.target.value)}
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-1.5 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-9">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nome da Escola</label>
            <input
              type="text"
              placeholder="Nome Completo da Unidade Escolar"
              value={data.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 transition-all"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">USE</label>
            <input
              type="text"
              placeholder="Unidade de Ensino"
              value={data.use}
              onChange={(e) => handleChange('use', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 transition-all"
            />
          </div>

          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Endereço</label>
            <input
              type="text"
              placeholder="Rua, Número, Complemento"
              value={data.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 transition-all"
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Bairro</label>
            <input
              type="text"
              placeholder="Nome do Bairro"
              value={data.bairro}
              onChange={(e) => handleChange('bairro', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 transition-all"
            />
          </div>
          <div className="md:col-span-12">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Coordenadas</label>
            <input
              type="text"
              placeholder="Ex: -1.45502, -48.5024"
              value={data.coordenadas}
              onChange={(e) => handleChange('coordenadas', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500 transition-all"
            />

            {/* Map Preview Block */}
            <div className="mt-4 h-64 w-full bg-slate-200 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 relative">
              {(() => {
                // Simple parser for "lat, lon"
                const coords = data.coordenadas.split(',').map(s => s.trim());
                const lat = parseFloat(coords[0]);
                const lon = parseFloat(coords[1]);

                if (!isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
                  // Bounding box for OSM embed (small zoom)
                  const delta = 0.002;
                  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
                  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

                  return (
                    <>
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={embedUrl}
                        title="Mapa de Localização"
                        className="z-10 relative"
                      ></iframe>
                      <div className="absolute top-2 right-2 z-20 bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                          Ver Ampliado <span className="material-icons-round text-xs align-middle">open_in_new</span>
                        </a>
                      </div>
                    </>
                  );
                }

                return (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <span className="material-icons-round text-4xl mb-2">map</span>
                    <p className="text-sm font-semibold">Insira coordenadas válidas para visualizar o mapa</p>
                    <p className="text-xs opacity-70 mt-1">Formato: Latitude, Longitude (ex: -1.45, -48.50)</p>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Telefone</label>
            <input type="tel" placeholder="(00) 0000-0000" value={data.telefone} onChange={(e) => handleChange('telefone', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">E-mail Institucional</label>
            <input type="email" placeholder="escola@dominio.gov.br" value={data.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Município</label>
            <input type="text" placeholder="Nome da Cidade" value={data.municipio} onChange={(e) => handleChange('municipio', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Diretor(a)</label>
            <input type="text" placeholder="Nome do Diretor" value={data.diretor} onChange={(e) => handleChange('diretor', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Telefone Diretor</label>
            <input type="tel" placeholder="(00) 00000-0000" value={data.telefoneDiretor} onChange={(e) => handleChange('telefoneDiretor', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">E-mail Diretor</label>
            <input type="email" placeholder="diretor@dominio.com" value={data.emailDiretor} onChange={(e) => handleChange('emailDiretor', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>

          <div className="md:col-span-12">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Vice Diretor(a)</label>
            <input type="text" placeholder="Nome do Vice Diretor" value={data.viceDiretor} onChange={(e) => handleChange('viceDiretor', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase mb-4">Esfera Administrativa</span>
            <div className="flex gap-6">
              {['Estadual', 'Municipal'].map(opt => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="esfera"
                    checked={data.esfera === opt}
                    onChange={() => handleChange('esfera', opt)}
                    className="text-primary-500 focus:ring-primary-500 h-5 w-5"
                  />
                  <span className="text-sm font-semibold group-hover:text-primary-500 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase mb-4">Foi celebrado Convênio?</span>
            <div className="flex gap-6">
              {['Sim', 'Não', 'SEI'].map(opt => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="convenio"
                    checked={data.convenio === opt}
                    onChange={() => handleChange('convenio', opt)}
                    className="text-primary-500 focus:ring-primary-500 h-5 w-5"
                  />
                  <span className="text-sm font-semibold group-hover:text-primary-500 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Quantidade de salas</label>
            <input type="number" value={data.qtdSalas} onChange={(e) => handleChange('qtdSalas', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Quantidade de alunos</label>
            <input type="number" value={data.qtdAlunos} onChange={(e) => handleChange('qtdAlunos', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nível de ensino ofertado</label>
            <input type="text" placeholder="Ex: Fundamental, Médio..." value={data.nivelEnsino} onChange={(e) => handleChange('nivelEnsino', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>
        </div>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="p-4 border-b border-slate-200 dark:border-slate-800">Métrica de Distribuição</th>
                <th className="p-4 border-b border-slate-200 dark:border-slate-800 text-center">Manhã</th>
                <th className="p-4 border-b border-slate-200 dark:border-slate-800 text-center">Tarde</th>
                <th className="p-4 border-b border-slate-200 dark:border-slate-800 text-center">Noite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-4 text-sm font-bold bg-slate-50/50 dark:bg-slate-900/50">Quantidade de Turmas</td>
                <td className="p-2"><input type="number" value={data.distribuicao.turmas.manha} onChange={e => handleChange('distribuicao.turmas.manha', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
                <td className="p-2"><input type="number" value={data.distribuicao.turmas.tarde} onChange={e => handleChange('distribuicao.turmas.tarde', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
                <td className="p-2"><input type="number" value={data.distribuicao.turmas.noite} onChange={e => handleChange('distribuicao.turmas.noite', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
              </tr>
              <tr>
                <td className="p-4 text-sm font-bold bg-slate-50/50 dark:bg-slate-900/50">Quantidade de Alunos/Turno</td>
                <td className="p-2"><input type="number" value={data.distribuicao.alunos.manha} onChange={e => handleChange('distribuicao.alunos.manha', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
                <td className="p-2"><input type="number" value={data.distribuicao.alunos.tarde} onChange={e => handleChange('distribuicao.alunos.tarde', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
                <td className="p-2"><input type="number" value={data.distribuicao.alunos.noite} onChange={e => handleChange('distribuicao.alunos.noite', e.target.value)} className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary-500 rounded-lg" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center text-xs text-slate-500 italic">
            <span className="material-icons-round text-sm mr-2">info</span>
            As informações preenchidas acima serão sincronizadas com o banco de dados oficial.
          </div>
          <button
            onClick={onNext}
            className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary-500/20 flex items-center transition-all transform active:scale-95"
          >
            Salvar e Continuar
            <span className="material-icons-round ml-2 text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Identification;
