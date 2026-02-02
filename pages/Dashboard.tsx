
import React, { useEffect, useRef } from 'react';

const Dashboard: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Check if Leaflet is loaded
    if (!(window as any).L || !mapRef.current) return;

    // Prevent double initialization
    if (mapInstance.current) return;

    const L = (window as any).L;

    // Initialize Map centered on Belém, PA
    const map = L.map(mapRef.current).setView([-1.4557, -48.4902], 12);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Mock Data: Schools
    // Status: 'done' (Realizada - Green), 'pending' (A Realizar - Blue/Gray)
    const schools = [
      { name: "E.E.E.M. Paes de Carvalho", lat: -1.4550, lng: -48.4920, status: 'done', alerts: 0 },
      { name: "E.E.F.M. Ulysses Guimarães", lat: -1.4250, lng: -48.4520, status: 'done', alerts: 2 },
      { name: "E.M.E.F. Benvinda de França Messias", lat: -1.4610, lng: -48.4830, status: 'pending', alerts: 0 },
      { name: "Escola Estadual Deodoro de Mendonça", lat: -1.4480, lng: -48.4750, status: 'pending', alerts: 5 },
      { name: "Colégio Estadual Magalhães Barata", lat: -1.4390, lng: -48.4680, status: 'done', alerts: 0 },
      { name: "E.E. Tiradentes", lat: -1.4720, lng: -48.4990, status: 'pending', alerts: 1 },
    ];

    // Custom Icons (using html marker for colors without external images if possible, or standard icons with filters)
    // For simplicity with CDN, we'll use standard icons but maybe try to color them or just distinction by popup for now, 
    // OR create DivIcons. Let's use simple DivIcons for custom colors.

    const createIcon = (color: string) => {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
    };

    schools.forEach((school: any) => {
      const color = school.status === 'done' ? '#22c55e' : '#3b82f6'; // Green vs Blue
      const marker = L.marker([school.lat, school.lng], {
        icon: createIcon(color)
      }).addTo(map);

      marker.bindPopup(`
            <div class="font-sans">
                <h3 class="font-bold text-sm mb-1">${school.name}</h3>
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-2 h-2 rounded-full" style="background-color: ${color}"></span>
                    <span class="text-xs uppercase font-bold text-slate-500">
                        ${school.status === 'done' ? 'Vistoria Realizada' : 'A Realizar'}
                    </span>
                </div>
                ${school.alerts > 0 ? `<div class="text-xs text-red-600 font-bold">⚠️ ${school.alerts} Alertas Críticos</div>` : ''}
            </div>
        `);
    });

    // Cleanup
    return () => {
      // We don't necessarily destroy the map on re-renders in this simple implementation to avoid flashing,
      // but strict React would require map.remove(). 
      // For this demo, let's keep it simple.
    };

  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Painel de Controle</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Visão geral das vistorias e georreferenciamento das unidades escolares.</p>
      </header>

      {/* Stats Cards (Kept from original) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Escolas', value: '1.240', trend: '+2%', icon: 'school', color: 'text-primary-500' },
          { label: 'Vistorias Concluídas', value: '856', trend: '+15%', icon: 'fact_check', color: 'text-success' },
          { label: 'Alertas Críticos', value: '42', trend: '-5%', icon: 'error', color: 'text-danger' },
          { label: 'Conformidade', value: '78%', trend: '+3%', icon: 'verified', color: 'text-primary-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className={`material-icons-round ${stat.color} bg-slate-50 dark:bg-slate-800 p-2 rounded-xl`}>{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-lg font-bold">Mapa Georreferenciado de Vistorias</h3>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Realizadas</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">A Realizar</span>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] w-full bg-slate-100 dark:bg-slate-950">
          <div id="map" ref={mapRef} className="h-full w-full z-0"></div>

          {/* Overlay Controls */}
          <div className="absolute top-4 left-4 z-[400] w-72">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center">
              <span className="material-icons-round text-slate-400 mr-2">search</span>
              <input type="text" placeholder="Buscar escola no mapa..." className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-700 dark:text-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
