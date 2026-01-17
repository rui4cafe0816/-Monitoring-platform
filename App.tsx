
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ContainerTable from './components/ContainerTable';
import UsageChart from './components/UsageChart';
import AIAdvisor from './components/AIAdvisor';
import { MOCK_CONTAINERS, MOCK_SYSTEM } from './mockData';
import { DockerContainer, AIInsight } from './types';
import { getContainerInsights } from './services/geminiService';

const App: React.FC = () => {
  const [containers, setContainers] = useState<DockerContainer[]>(MOCK_CONTAINERS);
  const [selectedContainer, setSelectedContainer] = useState<DockerContainer | null>(MOCK_CONTAINERS[0]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      setInsightsLoading(true);
      const res = await getContainerInsights(containers);
      setInsights(res);
      setInsightsLoading(false);
    }
    fetchInsights();
  }, [containers]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(current => 
        current.map(c => {
          if (c.status !== 'running') return c;
          const cpuMod = (Math.random() - 0.5) * 2;
          const newCpu = Math.max(0.1, Math.min(100, c.cpu + cpuMod));
          return {
            ...c,
            cpu: parseFloat(newCpu.toFixed(1)),
            metrics: {
              ...c.metrics,
              cpuUsage: [...c.metrics.cpuUsage.slice(1), { time: 'Now', value: newCpu }]
            }
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">System Dashboard</h2>
            <p className="text-slate-500 mt-1">Real-time status of your deployment environment.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span>Export Report</span>
            </button>
            <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100 flex items-center space-x-2">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              <span>Deploy New</span>
            </button>
          </div>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            label="Total Containers" 
            value={MOCK_SYSTEM.totalContainers} 
            colorClass="bg-indigo-50 text-indigo-600"
            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>}
          />
          <StatsCard 
            label="Active / Healthy" 
            value={`${MOCK_SYSTEM.runningContainers} / ${MOCK_SYSTEM.totalContainers}`} 
            colorClass="bg-emerald-50 text-emerald-600"
            subValue="98.2% Uptime"
            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatsCard 
            label="Total CPU Load" 
            value={`${MOCK_SYSTEM.totalCpu.toFixed(1)}%`} 
            colorClass="bg-blue-50 text-blue-600"
            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
          />
          <StatsCard 
            label="Total Memory" 
            value={`${(MOCK_SYSTEM.totalMemory / 1024).toFixed(1)} GB`} 
            subValue={`Limit: ${(MOCK_SYSTEM.maxMemory / 1024).toFixed(0)} GB`}
            colorClass="bg-purple-50 text-purple-600"
            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* List */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Container Fleet</h3>
                <div className="flex space-x-2">
                   <input type="text" placeholder="Search fleet..." className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64" />
                </div>
              </div>
              <ContainerTable 
                containers={containers} 
                onSelect={setSelectedContainer} 
                selectedId={selectedContainer?.id}
              />
            </section>

            {/* Detailed View */}
            {selectedContainer && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-600">
                       <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{selectedContainer.name}</h3>
                      <div className="flex items-center space-x-3 text-slate-400 text-sm mt-0.5">
                        <span className="mono">{selectedContainer.id}</span>
                        <span>•</span>
                        <span>{selectedContainer.image}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <UsageChart 
                    data={selectedContainer.metrics.cpuUsage} 
                    color="#6366f1" 
                    label="CPU Load" 
                    unit="%"
                  />
                  <UsageChart 
                    data={selectedContainer.metrics.memUsage} 
                    color="#a855f7" 
                    label="Memory Footprint" 
                    unit="MB"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-slate-100 pt-8">
                   <div>
                     <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Network I/O</p>
                     <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 flex items-center"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg> Rx</span>
                         <span className="font-bold text-slate-700">{selectedContainer.metrics.netIO.rx} KB</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 flex items-center"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg> Tx</span>
                         <span className="font-bold text-slate-700">{selectedContainer.metrics.netIO.tx} KB</span>
                       </div>
                     </div>
                   </div>
                   <div className="md:col-span-2">
                     <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Published Ports</p>
                     <div className="flex flex-wrap gap-2">
                       {selectedContainer.ports.length > 0 ? selectedContainer.ports.map(port => (
                         <span key={port} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100 mono">
                           {port}
                         </span>
                       )) : <span className="text-sm text-slate-400 italic">None exposed</span>}
                     </div>
                   </div>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <AIAdvisor insights={insights} loading={insightsLoading} />
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Recent Activity
              </h3>
              <div className="space-y-6">
                {[
                  { time: '2m ago', event: 'nginx-proxy', desc: 'Auto-scaled to 3 replicas', type: 'info' },
                  { time: '14m ago', event: 'postgres-db', desc: 'Periodic backup completed', type: 'success' },
                  { time: '1h ago', event: 'worker-node-1', desc: 'Container manually stopped', type: 'warning' },
                  { time: '2h ago', event: 'api-gateway', desc: 'Registry pull: node:18-slim', type: 'info' },
                ].map((act, i) => (
                  <div key={i} className="flex space-x-4 relative">
                    {i !== 3 && <div className="absolute left-1.5 top-5 w-px h-10 bg-slate-100"></div>}
                    <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${
                      act.type === 'success' ? 'bg-emerald-400' : 
                      act.type === 'warning' ? 'bg-amber-400' : 
                      'bg-indigo-400'
                    }`}></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-800">{act.event}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{act.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                View All Activity
              </button>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
               <h4 className="font-bold mb-2">Disk Health</h4>
               <p className="text-indigo-100 text-xs mb-4">You are using 42.1 GB of 120 GB total storage.</p>
               <div className="w-full bg-indigo-900/30 rounded-full h-2 mb-2">
                 <div className="bg-white h-2 rounded-full" style={{ width: '35%' }}></div>
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">35% Utilized</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
