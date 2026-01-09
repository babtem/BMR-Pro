
import React from 'react';
import { Gender, ActivityLevel, UserData, UnitSystem } from '../types';
import { ACTIVITY_DESCRIPTIONS } from '../constants';

interface Props {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onCalculate: () => void;
}

const CalculatorForm: React.FC<Props> = ({ userData, setUserData, onCalculate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: (name === 'gender' || name === 'activityLevel' || name === 'unitSystem') ? value : Number(value),
    }));
  };

  const setUnitSystem = (system: UnitSystem) => {
    setUserData(prev => {
      if (prev.unitSystem === system) return prev;
      
      // Optional: convert values when switching units to keep them consistent
      let newWeight = prev.weight;
      let newHeight = prev.height;

      if (system === UnitSystem.IMPERIAL) {
        // Metric to Imperial
        newWeight = prev.weight * 2.20462;
        newHeight = prev.height / 2.54;
      } else {
        // Imperial to Metric
        newWeight = prev.weight / 2.20462;
        newHeight = prev.height * 2.54;
      }

      return {
        ...prev,
        unitSystem: system,
        weight: Math.round(newWeight * 10) / 10,
        height: Math.round(newHeight * 10) / 10,
      };
    });
  };

  const isMetric = userData.unitSystem === UnitSystem.METRIC;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Details
        </h2>
        
        {/* Unit Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setUnitSystem(UnitSystem.METRIC)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              isMetric 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnitSystem(UnitSystem.IMPERIAL)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              !isMetric 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Imperial
          </button>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Weight ({isMetric ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              step="0.1"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder={isMetric ? "e.g. 70" : "e.g. 155"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Height ({isMetric ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={handleChange}
              step="0.1"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder={isMetric ? "e.g. 175" : "e.g. 69"}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Activity Level</label>
          <select
            name="activityLevel"
            value={userData.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          >
            {Object.values(ActivityLevel).map((level) => (
              <option key={level} value={level}>
                {level.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 italic">
            {ACTIVITY_DESCRIPTIONS[userData.activityLevel]}
          </p>
        </div>

        <button
          onClick={onCalculate}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Calculate Results
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
