
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHTLY_ACTIVE = 'LIGHTLY_ACTIVE',
  MODERATELY_ACTIVE = 'MODERATELY_ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
  EXTRA_ACTIVE = 'EXTRA_ACTIVE'
}

export enum UnitSystem {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
}

export interface UserData {
  age: number;
  gender: Gender;
  weight: number; 
  height: number;
  activityLevel: ActivityLevel;
  unitSystem: UnitSystem;
}

export interface BMRResults {
  bmr: number;
  tdee: number;
  weightLoss: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}
