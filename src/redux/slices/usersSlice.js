import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://reqres.in/api/users?page=2');
  await AsyncStorage.setItem('users', JSON.stringify(response.data.data));
  return response.data.data;
});

export const loadUsersFromStorage = createAsyncThunk('users/loadUsersFromStorage', async () => {
  const storedUsers = await AsyncStorage.getItem('users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return [];
});

const initialState = {
    users: [],
    favoriteUsers: [],
    status: 'idle',
    error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    addFavorite: (state, action) => {
      const user = action.payload;
      const existingUser = state.favoriteUsers.find(u => u.id === user.id);
      if (!existingUser) {
        state.favoriteUsers.push(user);
      } else {
        throw new Error('This user is already added');
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteUsers = state.favoriteUsers.filter(user => user.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },

});

export const { addFavorite, removeFavorite } = usersSlice.actions;

export default usersSlice.reducer;
