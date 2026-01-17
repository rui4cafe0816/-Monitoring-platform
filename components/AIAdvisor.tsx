
import React from 'react';
import { AIInsight } from '../types';

interface AIAdvisorProps {
  insights: AIInsight[];
  loading: boolean;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ insights, loading }) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -mr-32 -mt-32"></div>
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center animate-pulse">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Pulse Insights</h3>
          <p className="text-slate-400 text-xs">Real-time infrastructure analysis</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse flex items-start space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : insights.length === 0 ? (
          <p className="text-slate-500 text-sm italic">System stable. No anomalies detected.</p>
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="flex items-start space-x-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className={`mt-1 p-2 rounded-lg ${
                insight.type === 'warning' ? 'bg-red-500/10 text-red-400' :
                insight.type === 'optimization' ? 'bg-indigo-500/10 text-indigo-400' :
                'bg-blue-500/10 text-blue-400'
              }`}>
                {insight.type === 'warning' ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{insight.message}</p>
                {insight.containerId && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-slate-700 text-[10px] rounded uppercase font-bold tracking-wider text-slate-300">
                    ID: {insight.containerId}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-sm font-bold rounded-xl transition-colors shadow-lg shadow-indigo-900/40">
        Run Full System Audit
      </button>
    </div>
  );
};

export default AIAdvisor;
