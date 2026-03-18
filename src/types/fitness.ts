export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  exercises: number;
  difficulty: Difficulty;
  category: string;
  calories: number;
  muscleGroups: string[];
  completionRate: number;
  isFavorite?: boolean;
  isCompleted?: boolean;
  lastPerformed?: Date;
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  difficulty: Difficulty;
  equipment: string;
  duration: number;
  calories: number;
  description: string;
  instructions: string[];
  sets?: number;
  reps?: number;
  weight?: number;
  restTime?: number;
}

export interface MeasurementEntry {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent: number;
  waistCm: number;
  chestCm: number;
  armCm: number;
  thighCm: number;
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exercise: string;
  value: number;
  unit: string;
  date: string;
  improvement: string;
}

export interface WorkoutReminder {
  id: string;
  title: string;
  time: string;
  days: string[];
  enabled: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  fitnessGoal: string;
  level: Difficulty;
  weeklyTarget: number;
  preferredWorkoutTime: string;
  notificationsEnabled: boolean;
  offlineModeEnabled: boolean;
}