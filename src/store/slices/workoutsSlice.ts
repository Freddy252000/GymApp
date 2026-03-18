import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {exerciseLibrary, workoutPlans} from '../../data/mockFitnessData';
import {ExerciseLibraryItem, WorkoutPlan} from '../../types/fitness';

interface WorkoutsState {
  plans: WorkoutPlan[];
  exercises: ExerciseLibraryItem[];
  selectedCategory: string;
  activeWorkoutId?: string;
}

const initialState: WorkoutsState = {
  plans: workoutPlans,
  exercises: exerciseLibrary,
  selectedCategory: 'All',
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setActiveWorkout: (state, action: PayloadAction<string | undefined>) => {
      state.activeWorkoutId = action.payload;
    },
    toggleWorkoutFavorite: (state, action: PayloadAction<string>) => {
      const workout = state.plans.find(item => item.id === action.payload);
      if (workout) {
        workout.isFavorite = !workout.isFavorite;
      }
    },
  },
});

export const {setActiveWorkout, setSelectedCategory, toggleWorkoutFavorite} = workoutsSlice.actions;
export default workoutsSlice.reducer;