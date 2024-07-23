// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
