
import React, { useState, useEffect, useCallback } from 'react';
import {
  InspectionData,
  ProfessionalRow,
  InfrastructureItem,
  PhotoEntry
} from './types';
import { EMPTY_INSPECTION } from './constants';
import { supabase } from './supabase';

// Pages
import Dashboard from './pages/Dashboard';
import Step1Identification from './pages/Step1Identification';
import Step2Professionals from './pages/Step2Professionals';
import Step3Infrastructure from './pages/Step3Infrastructure';
import Step4Administrative from './pages/Step4Administrative';
import Step5Pedagogical from './pages/Step5Pedagogical';
import Step6Finance from './pages/Step6Finance';
import Step7Observations from './pages/Step7Observations';
import PhotoGallery from './pages/PhotoGallery';
import FinalReport from './pages/FinalReport';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [data, setData] = useState<InspectionData>(EMPTY_INSPECTION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  // Persistence logic (Offline Support)
  useEffect(() => {
    const saved = localStorage.getItem('eduinspect_draft');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eduinspect_draft', JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updater: (prev: InspectionData) => InspectionData) => {
    setData(updater);
  }, []);

  const syncToSupabase = async () => {
    if (!data.school.nome) return; // Don't sync empty drafts
    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from('inspections')
        .upsert({
          app_id: data.id, // Use local ID as the unique key for mapping
          status: data.status,
          inspection_date: data.school.dataVistoria,
          school_name_snapshot: data.school.nome,
          municipio_snapshot: data.school.municipio,
          data: data, // Save the full JSON
          updated_at: new Date().toISOString()
        }, { onConflict: 'app_id' });

      if (error) throw error;

      const now = new Date().toLocaleTimeString();
      setLastSaved(now);
      updateData(prev => ({ ...prev, lastSync: now }));

      // Also upsert school for registry
      if (data.school.nome && data.school.inep) {
        const { error: schoolError } = await supabase.from('schools').upsert({
          inep: data.school.inep || null,
          name: data.school.nome,
          municipio: data.school.municipio,
          director_name: data.school.diretor,
          coordinates: data.school.coordenadas
        }, { onConflict: 'inep', ignoreDuplicates: false });

        if (schoolError) console.warn('School register warning:', schoolError);
      }

    } catch (err) {
      console.error('Sync failed:', err);
      // Optional: Notify user of failure
    } finally {
      setIsSyncing(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'step1':
        return <Step1Identification data={data.school} onUpdate={(school) => updateData(prev => ({ ...prev, school }))} onNext={() => { syncToSupabase(); setCurrentPage('step2'); }} />;
      case 'step2':
        return <Step2Professionals data={data.professionals} onUpdate={(professionals) => updateData(prev => ({ ...prev, professionals }))} onNext={() => { syncToSupabase(); setCurrentPage('step3'); }} onBack={() => setCurrentPage('step1')} />;
      case 'step3':
        return <Step3Infrastructure data={data.infra} onUpdate={(infra) => updateData(prev => ({ ...prev, infra }))} onNext={() => { syncToSupabase(); setCurrentPage('step4'); }} onBack={() => setCurrentPage('step2')} />;
      case 'step4':
        return <Step4Administrative data={data.administrative} onUpdate={(administrative) => updateData(prev => ({ ...prev, administrative }))} onNext={() => { syncToSupabase(); setCurrentPage('step5'); }} onBack={() => setCurrentPage('step3')} />;
      case 'step5':
        return <Step5Pedagogical data={data.pedagogical} onUpdate={(pedagogical) => updateData(prev => ({ ...prev, pedagogical }))} onNext={() => { syncToSupabase(); setCurrentPage('step6'); }} onBack={() => setCurrentPage('step4')} />;
      case 'step6':
        return <Step6Finance data={data.finance} onUpdate={(finance) => updateData(prev => ({ ...prev, finance }))} onNext={() => { syncToSupabase(); setCurrentPage('step7'); }} onBack={() => setCurrentPage('step5')} />;
      case 'step7':
        return <Step7Observations data={data.observations} onUpdate={(observations) => updateData(prev => ({ ...prev, observations }))} onFinish={() => { syncToSupabase(); setCurrentPage('gallery'); }} onBack={() => setCurrentPage('step6')} />;
      case 'gallery':
        return <PhotoGallery data={data.photos} onUpdate={(photos) => updateData(prev => ({ ...prev, photos }))} onNext={() => { syncToSupabase(); setCurrentPage('report'); }} />;
      case 'report':
        return <FinalReport data={data} onBack={() => setCurrentPage('gallery')} onDashboard={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar
        isOpen={isSidebarOpen}
        current={currentPage}
        onNavigate={setCurrentPage}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSyncing={isSyncing}
          lastSaved={lastSaved}
          onSyncManual={syncToSupabase}
        />

        <main className="flex-1 overflow-y-auto focus:outline-none custom-scrollbar">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {renderPage()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
