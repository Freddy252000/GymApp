import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import progressReducer from './slices/progressSlice';
import workoutsReducer from './slices/workoutsSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    progress: progressReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;