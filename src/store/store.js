import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
