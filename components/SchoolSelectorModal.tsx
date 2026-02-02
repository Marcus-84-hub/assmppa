
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { SchoolInfo } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (school: Partial<SchoolInfo>) => void;
}

const SchoolSelectorModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [schools, setSchools] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch schools on mount or when search changes
    useEffect(() => {
        if (!isOpen) return;

        const fetchSchools = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('schools')
                    .select('*')
                    .limit(20);

                if (searchTerm) {
                    query = query.ilike('name', `%${searchTerm}%`);
                }

                const { data, error } = await query;
                if (error) console.error('Error fetching schools:', error);
                else setSchools(data || []);
            } catch (err) {
                console.error('Failed to fetch schools', err);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchSchools, 300);
        return () => clearTimeout(timeout);
    }, [isOpen, searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[80vh]">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Selecionar Escola</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="material-icons-round">close</span>
                    </button>
                </div>

                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <div className="relative">
                        <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Buscar por nome da escola..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                            <span className="material-icons-round animate-spin text-3xl mb-2">sync</span>
                            <p>Carregando escolas...</p>
                        </div>
                    ) : schools.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            <span className="material-icons-round text-4xl mb-2">school</span>
                            <p>Nenhuma escola encontrada.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {schools.map((school) => (
                                <button
                                    key={school.id || school.inep}
                                    onClick={() => {
                                        // Map DB columns to SchoolInfo
                                        onSelect({
                                            nome: school.name,
                                            inep: school.inep,
                                            municipio: school.municipio,
                                            diretor: school.director_name,
                                            coordenadas: school.coordinates,
                                            // Add generic defaults if needed, or leave blank
                                        });
                                        onClose();
                                    }}
                                    className="w-full text-left p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-primary-200 dark:hover:border-primary-900/50 transition-all group"
                                >
                                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{school.name}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                                        <span className="flex items-center gap-1"><span className="material-icons-round text-[14px]">place</span> {school.municipio || 'Município não inf.'}</span>
                                        {school.inep && <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">INEP: {school.inep}</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SchoolSelectorModal;
