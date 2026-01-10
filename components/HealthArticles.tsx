
import React, { useState, useRef } from 'react';

interface Article {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  fullContent: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: "sustainable-deficits",
    title: "The Science of Sustainable Deficits",
    category: "Nutrition",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    summary: "Losing weight isn't just about eating less; it's about eating right. A safe deficit of 300-500 calories ensures metabolic health.",
    fullContent: (
      <>
        <h1>The Science of Sustainable Calorie Deficits</h1>
        <p className="lead">Understanding the balance between energy intake and expenditure is the cornerstone of effective weight management.</p>
        
        <h2>What is a Calorie Deficit?</h2>
        <p>A calorie deficit occurs when you consume fewer calories than your body burns in a day. While the math seems simple, the biological response is complex. Your body is a dynamic system that attempts to maintain homeostasis.</p>
        
        <h2>The 500-Calorie Rule</h2>
        <p>A deficit of approximately 500 calories per day is widely recommended because it typically leads to a loss of about 0.5kg (1lb) of fat per week. This pace is considered sustainable because:</p>
        <ul>
          <li><strong>Muscle Preservation:</strong> Slower weight loss helps ensure that the weight lost comes from fat stores rather than lean muscle tissue.</li>
          <li><strong>Hormonal Balance:</strong> Drastic calorie cuts can trigger a "starvation response," raising cortisol and lowering leptin, which increases hunger.</li>
          <li><strong>Psychological Success:</strong> Small changes are easier to turn into lifelong habits than extreme restrictions.</li>
        </ul>

        <h2>Nutrient Density vs. Calorie Density</h2>
        <p>When in a deficit, every calorie counts. Focusing on high-volume, low-calorie foods (like leafy greens and fibrous vegetables) allows you to feel full while maintaining your target intake. Pairing these with lean proteins ensures satiety and metabolic support.</p>
      </>
    )
  },
  {
    id: "neat-secret-weapon",
    title: "NEAT: Your Secret Weapon",
    category: "Activity",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    summary: "Non-Exercise Activity Thermogenesis (NEAT) accounts for the calories burned during daily non-sport activities.",
    fullContent: (
      <>
        <h1>NEAT: The Calories You're Forgetting to Count</h1>
        <p className="lead">While gym sessions are important, the movement you do during the other 23 hours of the day often has a bigger impact on your TDEE.</p>
        
        <h2>What Exactly is NEAT?</h2>
        <p>NEAT stands for Non-Exercise Activity Thermogenesis. It encompasses the energy expended for everything we do that is not sleeping, eating or sports-like exercise. It ranges from the energy expended walking to work, typing, performing yard work, and even fidgeting.</p>
        
        <h2>Why NEAT Matters More Than Cardio</h2>
        <p>For many people, NEAT can account for up to 15-30% of their total energy expenditure. In contrast, a 30-minute run might only account for 5-10%. By increasing your baseline movement, you can significantly increase your calorie burn without the recovery cost of high-intensity exercise.</p>

        <h2>How to Boost Your NEAT</h2>
        <ul>
          <li><strong>Walk and Talk:</strong> Take your phone calls while pacing around the room.</li>
          <li><strong>Stand Up:</strong> Use a standing desk or simply stand up for 5 minutes every hour.</li>
          <li><strong>The Long Way:</strong> Park further from the entrance or take the stairs instead of the elevator.</li>
          <li><strong>House Chores:</strong> Cleaning, gardening, and DIY projects are incredible NEAT boosters.</li>
        </ul>
      </>
    )
  },
  {
    id: "protein-satiety",
    title: "Protein Satiety & Muscle",
    category: "Diet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454M21 12.773c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454M21 10c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454" />
      </svg>
    ),
    summary: "High protein diets help maintain muscle during a deficit and keep you feeling full longer through the thermic effect of food.",
    fullContent: (
      <>
        <h1>Protein: The King of Weight Loss Macros</h1>
        <p className="lead">If you only focus on one macronutrient during your weight loss journey, make it protein.</p>
        
        <h2>The Thermic Effect of Food (TEF)</h2>
        <p>Protein has a much higher thermic effect than fats or carbohydrates. This means your body uses more energy (calories) to digest and process protein than it does for other nutrients. About 20-30% of protein calories are burned simply during digestion.</p>
        
        <h2>Satiety and the "Fullness" Hormone</h2>
        <p>Protein reduces the level of the hunger hormone ghrelin. At the same time, it boosts the levels of peptide YY, a hormone that makes you feel full. This double-action makes a high-protein diet a powerful tool against cravings and overeating.</p>

        <h2>Protecting Your Metabolic Engine</h2>
        <p>When you lose weight, you want that weight to be fat, not muscle. Muscle is metabolically active tissue; it burns more calories than fat even at rest. Consuming adequate protein (roughly 1.6g to 2.2g per kg of body weight) provides the building blocks necessary to preserve your muscle mass during a calorie deficit.</p>
      </>
    )
  }
];

const HealthArticles: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedArticle = ARTICLES.find(a => a.id === selectedArticleId);

  const handleReadMore = (id: string) => {
    setSelectedArticleId(id);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBack = () => {
    setSelectedArticleId(null);
  };

  return (
    <div className="mt-12 scroll-mt-8" ref={containerRef}>
      {!selectedArticle ? (
        <>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Weight Loss Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <div 
                key={article.id} 
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
                  {article.summary}
                </p>
                <button 
                  onClick={() => handleReadMore(article.id)}
                  className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Read more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Guide
          </button>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                {selectedArticle.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">{selectedArticle.category}</span>
                <p className="text-slate-400 dark:text-slate-500 text-sm">5 min read</p>
              </div>
            </div>
            
            <div className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300 max-w-none">
              {selectedArticle.fullContent}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center">
               <button 
                onClick={handleBack}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
              >
                Finished Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthArticles;
