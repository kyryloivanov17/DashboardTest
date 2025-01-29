import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchClientsData } from '../../api/clients';
import type { Client } from '../../types/client';

interface ClientsState {
  items: Client[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await fetchClientsData();
    return response;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch clients';
      });
  },
});

export default clientsSlice.reducer;