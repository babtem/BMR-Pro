
import React from 'react';
import { BMRResults } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  results: BMRResults | null;
  isDarkMode: boolean;
}

const CustomTooltip = ({ active, payload, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{data.name}</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{data.value}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kcal/day</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[180px]">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

const ResultDisplay: React.FC<Props> = ({ results, isDarkMode }) => {
  if (!results) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300 h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-center italic">Calculations will appear here after you input your details.</p>
      </div>
    );
  }

  const chartData = [
    { 
      name: 'BMR (Rest)', 
      value: Math.round(results.bmr), 
      color: isDarkMode ? '#818cf8' : '#6366f1',
      description: "The calories your body needs just to stay alive at complete rest."
    },
    { 
      name: 'Weight Loss', 
      value: Math.round(results.weightLoss), 
      color: isDarkMode ? '#f87171' : '#ef4444',
      description: "Estimated target for losing ~0.5kg per week (500 kcal deficit from TDEE)."
    },
    { 
      name: 'TDEE (Maint.)', 
      value: Math.round(results.tdee), 
      color: isDarkMode ? '#6366f1' : '#4f46e5',
      description: "Total daily calories burned including your activity level. Eat this to maintain weight."
    },
    { 
      name: 'Muscle Gain', 
      value: Math.round(results.tdee + 500), 
      color: isDarkMode ? '#34d399' : '#10b981',
      description: "Estimated target for gaining ~0.5kg per week (500 kcal surplus over TDEE)."
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300 h-full">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Your Metabolism Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50 transition-colors">
          <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">BMR</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{Math.round(results.bmr)}</span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">kcal</span>
          </div>
        </div>
        
        <div className="bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-100 dark:border-rose-900/50 transition-colors">
          <p className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">Weight Loss</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-rose-900 dark:text-rose-100">{Math.round(results.weightLoss)}</span>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">kcal</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors">
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">TDEE</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Math.round(results.tdee)}</span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">kcal</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full cursor-crosshair">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
            <XAxis 
              dataKey="name" 
              fontSize={10} 
              axisLine={false} 
              tickLine={false} 
              stroke={isDarkMode ? '#94a3b8' : '#64748b'} 
              tick={{ dy: 10 }}
            />
            <YAxis hide={true} />
            <Tooltip 
              cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc', opacity: 0.4 }}
              content={<CustomTooltip isDarkMode={isDarkMode} />}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Daily Macro Targets (Maintenance)</h3>
        <div className="flex h-4 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div style={{ width: '40%' }} className="bg-indigo-500 dark:bg-indigo-600 h-full transition-all duration-1000" title="Carbs" />
          <div style={{ width: '30%' }} className="bg-rose-400 dark:bg-rose-500 h-full transition-all duration-1000" title="Protein" />
          <div style={{ width: '30%' }} className="bg-amber-400 dark:bg-amber-500 h-full transition-all duration-1000" title="Fats" />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-600" /> Carbs (40%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 dark:bg-rose-500" /> Protein (30%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-500" /> Fats (30%)</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
