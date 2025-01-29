import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAppointmentsData } from '../../api/appointments';
import type { Appointment } from '../../types/appointment';

interface AppointmentsState {
  items: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await fetchAppointmentsData();
    return response;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    update: (state, action) => {
      state.items= action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch appointments';
      });
  },
});

export const { update } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;