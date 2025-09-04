// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: {workoutId: string};
  ExerciseDetail: {exerciseId: string};
  CreateWorkout: undefined;
  EditWorkout: {workoutId: string};
};

export type ProgressStackParamList = {
  ProgressOverview: undefined;
  ProgressDetail: {type: 'weight' | 'measurements' | 'performance'};
  ProgressHistory: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
  About: undefined;
  Help: undefined;
};
