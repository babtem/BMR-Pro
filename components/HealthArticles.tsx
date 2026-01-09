
import React from 'react';

const ARTICLES = [
  {
    title: "The Science of Sustainable Deficits",
    category: "Nutrition",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    content: "Losing weight isn't just about eating less; it's about eating right. A safe deficit of 300-500 calories ensures you lose fat while preserving metabolic health and muscle mass. Drastic cuts often lead to the 'yo-yo' effect."
  },
  {
    title: "NEAT: Your Secret Weapon",
    category: "Activity",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content: "Non-Exercise Activity Thermogenesis (NEAT) accounts for the calories burned during everything we do that isn't sleeping, eating, or sports-like exercise. Walking while talking or taking stairs can significantly boost daily burn."
  },
  {
    title: "Protein Satiety & Muscle",
    category: "Diet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454M21 12.773c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454M21 10c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454" />
      </svg>
    ),
    content: "High protein diets help maintain muscle during a deficit and keep you feeling full longer. Aim for 1.6g to 2.2g of protein per kg of body weight to optimize body composition and suppress hunger hormones."
  }
];

const HealthArticles: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Weight Loss Guide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((article, idx) => (
          <div 
            key={idx} 
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                {article.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{article.category}</span>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 leading-tight">{article.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {article.content}
            </p>
            <button className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              Read more 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthArticles;
