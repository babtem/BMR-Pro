
import { ActivityLevel } from './types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
  [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.EXTRA_ACTIVE]: 1.9,
};

export const ACTIVITY_DESCRIPTIONS: Record<ActivityLevel, string> = {
  [ActivityLevel.SEDENTARY]: 'Little to no exercise',
  [ActivityLevel.LIGHTLY_ACTIVE]: 'Exercise 1-3 times/week',
  [ActivityLevel.MODERATELY_ACTIVE]: 'Exercise 4-5 times/week',
  [ActivityLevel.VERY_ACTIVE]: 'Daily exercise or intense exercise 3-4 times/week',
  [ActivityLevel.EXTRA_ACTIVE]: 'Very intense exercise daily, or physical job',
};
