import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {userProfile, workoutReminders} from '../../data/mockFitnessData';
import {UserProfile, WorkoutReminder} from '../../types/fitness';

interface ProfileState {
  profile: UserProfile;
  reminders: WorkoutReminder[];
}

const initialState: ProfileState = {
  profile: userProfile,
  reminders: workoutReminders,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = {...state.profile, ...action.payload};
    },
    toggleReminder: (state, action: PayloadAction<string>) => {
      const reminder = state.reminders.find(item => item.id === action.payload);
      if (reminder) {
        reminder.enabled = !reminder.enabled;
      }
    },
  },
});

export const {toggleReminder, updateProfile} = profileSlice.actions;
export default profileSlice.reducer;