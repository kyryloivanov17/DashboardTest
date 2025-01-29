import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCampaignsData } from '../../api/campaigns';
import type { Campaign } from '../../types/campaign';

interface CampaignsState {
  items: Campaign[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CampaignsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    const response = await fetchCampaignsData();
    return response;
  }
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setValue: (state, action:PayloadAction<any>) => {
      console.log(action.payload,'action.payload')
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampaigns.fulfilled, (state, action: PayloadAction<Campaign[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch campaigns';
      });
  },
});

export const { setValue } = campaignsSlice.actions;

export default campaignsSlice.reducer;