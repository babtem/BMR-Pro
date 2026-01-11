
import React, { useState, useCallback, useEffect } from 'react';
import { UserData, BMRResults, Gender, ActivityLevel, UnitSystem } from './types';
import { ACTIVITY_MULTIPLIERS } from './constants';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import InsightsPanel from './components/InsightsPanel';
import HealthArticles from './components/HealthArticles';
import LoginModal from './components/LoginModal';
import { getHealthInsights } from './services/geminiService';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true;
    }
    return true;
  });

  const [userData, setUserData] = useState<UserData>({
    age: 30,
    gender: Gender.MALE,
    weight: 75,
    height: 180,
    activityLevel: ActivityLevel.SEDENTARY,
    unitSystem: UnitSystem.METRIC,
  });

  const [results, setResults] = useState<BMRResults | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const calculateBMR = useCallback(() => {
    // If user hasn't provided an email yet, show the login modal first
    if (!userEmail) {
      setShowLogin(true);
      return;
    }

    let { weight, height, age, gender, activityLevel, unitSystem } = userData;
    
    // Internal conversion to metric for calculation
    let calcWeight = weight;
    let calcHeight = height;

    if (unitSystem === UnitSystem.IMPERIAL) {
      calcWeight = weight * 0.453592; // lbs to kg
      calcHeight = height * 2.54;      // inches to cm
    }

    let bmrValue = 0;
    if (gender === Gender.MALE) {
      bmrValue = 10 * calcWeight + 6.25 * calcHeight - 5 * age + 5;
    } else {
      bmrValue = 10 * calcWeight + 6.25 * calcHeight - 5 * age - 161;
    }

    const tdee = bmrValue * ACTIVITY_MULTIPLIERS[activityLevel];
    const weightLoss = tdee - 500;

    const newResults: BMRResults = {
      bmr: bmrValue,
      tdee: tdee,
      weightLoss: weightLoss,
      macros: {
        carbs: (tdee * 0.4) / 4,
        protein: (tdee * 0.3) / 4,
        fat: (tdee * 0.3) / 9,
      }
    };

    setResults(newResults);
    
    setLoadingInsights(true);
    getHealthInsights(userData, newResults).then(resp => {
      setInsights(resp);
      setLoadingInsights(false);
    }).catch(() => {
      setInsights("Unable to fetch AI insights at this moment.");
      setLoadingInsights(false);
    });
  }, [userData, userEmail]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setShowLogin(false);
    // Automatically trigger calculation once logged in
    // Note: This relies on the fact that 'userEmail' will be available in the next render cycle's 'calculateBMR'
    // but to be safe and responsive, we can set state and then use an effect or just call the logic.
    // However, since state updates are async, we use a simple effect below.
  };

  // Trigger calculation when userEmail is set and showLogin was just closed
  useEffect(() => {
    if (userEmail && results === null && !showLogin) {
      calculateBMR();
    }
  }, [userEmail, showLogin, results, calculateBMR]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">BMR Pro</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-5xl">
            Metabolic <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Calculate your Basal Metabolic Rate, Weight Loss goals, and Total Daily Energy Expenditure with precision.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CalculatorForm 
            userData={userData} 
            setUserData={setUserData} 
            onCalculate={calculateBMR} 
          />
          <ResultDisplay results={results} isDarkMode={isDarkMode} />
        </div>

        {/* Insights Section */}
        <InsightsPanel insights={insights} loading={loadingInsights} />

        {/* New Articles Section */}
        <HealthArticles />

        {/* Info Footer */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">What is BMR?</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Basal Metabolic Rate is the number of calories your body burns at rest to maintain basic life-sustaining functions.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Weight Loss Deficit</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              To lose weight safely, a deficit of 500 calories from your TDEE is often recommended to target roughly 0.5kg of fat loss per week.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">What is TDEE?</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Total Daily Energy Expenditure is the total calories you burn in a 24-hour period, factoring in your activity level.
            </p>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal 
          isOpen={showLogin} 
          onLogin={handleLogin} 
          onClose={() => setShowLogin(false)} 
        />
      </div>
    </div>
  );
};

export default App;
