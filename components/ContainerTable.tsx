
import React from 'react';
import { DockerContainer, ContainerStatus } from '../types';

interface ContainerTableProps {
  containers: DockerContainer[];
  onSelect: (container: DockerContainer) => void;
  selectedId?: string;
}

const StatusBadge: React.FC<{ status: ContainerStatus }> = ({ status }) => {
  const styles = {
    [ContainerStatus.RUNNING]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [ContainerStatus.STOPPED]: 'bg-slate-100 text-slate-600 border-slate-200',
    [ContainerStatus.PAUSED]: 'bg-amber-100 text-amber-700 border-amber-200',
    [ContainerStatus.RESTARTING]: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

const ContainerTable: React.FC<ContainerTableProps> = ({ containers, onSelect, selectedId }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name / ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">CPU %</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Memory</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {containers.map((container) => (
              <tr 
                key={container.id} 
                onClick={() => onSelect(container)}
                className={`group cursor-pointer transition-colors ${selectedId === container.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{container.name}</span>
                    <span className="text-xs text-slate-400 mono">{container.id.substring(0, 12)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={container.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700">{container.cpu}%</span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full">
                      <div 
                        className="h-1 bg-indigo-500 rounded-full" 
                        style={{ width: `${Math.min(container.cpu * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {container.memory} MB <span className="text-slate-300">/ {container.memoryLimit} MB</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {container.uptime}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainerTable;
