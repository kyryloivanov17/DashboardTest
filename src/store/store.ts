import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';
import campaignsReducer from './slices/campaignsSlice';
import leadsReducer from './slices/leadsSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    campaigns: campaignsReducer,
    leads: leadsReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;