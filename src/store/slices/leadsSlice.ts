import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchLeadsData } from '../../api/leads';
import type { Lead } from '../../types/lead';

interface LeadsState {
  items: Lead[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeadsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async () => {
    const response = await fetchLeadsData();
    return response;
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch leads';
      });
  },
});

export default leadsSlice.reducer;