
import React from 'react';

interface Props {
  insights: string | null;
  loading: boolean;
}

const InsightsPanel: React.FC<Props> = ({ insights, loading }) => {
  if (!insights && !loading) return null;

  return (
    <div className="bg-indigo-900 dark:bg-indigo-950 text-white p-8 rounded-2xl shadow-xl mt-8 transition-colors duration-300 border border-transparent dark:border-indigo-900/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/30 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">AI Health Insights</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-200"></div>
          <p className="text-indigo-200 animate-pulse text-sm">Our AI is analyzing your metabolic data...</p>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <div className="text-indigo-100 dark:text-indigo-200 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {insights}
          </div>
        </div>
      )}
      
      {!loading && (
        <div className="mt-8 pt-6 border-t border-indigo-800 dark:border-indigo-900 text-xs text-indigo-400 dark:text-indigo-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Note: This information is for educational purposes and is not medical advice. Consult a professional before starting any new diet or exercise regimen.
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;
