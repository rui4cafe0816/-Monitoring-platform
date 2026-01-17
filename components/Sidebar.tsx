
import React from 'react';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
    active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
  }`}>
    <span className="w-5 h-5">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-slate-200 h-screen sticky top-0 bg-white flex flex-col p-6 space-y-8">
      <div className="flex items-center space-x-3 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
            <path d="M22 7.6L12 12L2 7.6M12 21V12M2 16.4L12 21L22 16.4M12 2.5L2 7.1V16.9L12 21.5L22 16.9V7.1L12 2.5Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">DockerPulse</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem 
          active
          label="Dashboard" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} 
        />
        <NavItem 
          label="Containers" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>} 
        />
        <NavItem 
          label="Images" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>} 
        />
        <NavItem 
          label="Volumes" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>} 
        />
        <NavItem 
          label="Settings" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} 
        />
      </nav>

      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
        <p className="text-xs font-semibold text-indigo-600 uppercase mb-2">Host System</p>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-600">CPU Usage</span>
          <span className="font-bold text-slate-800">12%</span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-1.5 mb-3">
          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '12%' }}></div>
        </div>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-600">Memory</span>
          <span className="font-bold text-slate-800">4.2 / 16 GB</span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-1.5">
          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '26%' }}></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
