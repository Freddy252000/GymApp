import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {measurementHistory, personalRecords} from '../../data/mockFitnessData';
import {MeasurementEntry, PersonalRecord} from '../../types/fitness';

interface ProgressState {
  measurements: MeasurementEntry[];
  records: PersonalRecord[];
  selectedMetric: 'weight' | 'measurements' | 'performance';
}

const initialState: ProgressState = {
  measurements: measurementHistory,
  records: personalRecords,
  selectedMetric: 'weight',
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setSelectedMetric: (
      state,
      action: PayloadAction<'weight' | 'measurements' | 'performance'>,
    ) => {
      state.selectedMetric = action.payload;
    },
    addMeasurement: (state, action: PayloadAction<MeasurementEntry>) => {
      state.measurements.unshift(action.payload);
    },
    addPersonalRecord: (state, action: PayloadAction<PersonalRecord>) => {
      state.records.unshift(action.payload);
    },
  },
});

export const {addMeasurement, addPersonalRecord, setSelectedMetric} = progressSlice.actions;
export default progressSlice.reducer;