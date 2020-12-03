import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import usersAPI from 'api/users';

export const getAll = createAsyncThunk('users/getAll', async (thunkAPI) => {
  const response = await usersAPI.getAll();
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getAll.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
