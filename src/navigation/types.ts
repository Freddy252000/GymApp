// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingGoals: undefined;
  OnboardingFitnessLevel: undefined;
  OnboardingPreferences: undefined;
  OnboardingComplete: undefined;
  Main: undefined; // For navigation reset
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string };
  ExerciseDetail: { exerciseId: string };
  CreateWorkout: undefined;
  EditWorkout: { workoutId: string };
};

export type ProgressStackParamList = {
  ProgressOverview: undefined;
  ProgressDetail: { type: 'weight' | 'measurements' | 'performance' };
  ProgressHistory: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
  About: undefined;
  Help: undefined;
};
