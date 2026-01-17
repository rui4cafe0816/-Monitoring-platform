
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, subValue, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <span className="w-6 h-6">{icon}</span>
      </div>
      {subValue && <span className="text-xs font-medium text-slate-400">{subValue}</span>}
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

export default StatsCard;
