import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login as initiateLogin } from 'api/authentication';
import session from 'utils/session';
import snackbarHelper from 'utils/snackbarHelper';

export const login = createAsyncThunk(
  'authentication/login',
  async ({ email, password }, thunkAPI) => {
    const response = await initiateLogin({ email, password });
    return response.data;
  }
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    loading: false,
    isAuthenticated: !!session.get(),
    user: !!session.get() ? session.get()['user'] : {},
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      session.destroy();
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;

      session.create({ user, token });
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [login.rejected]: (state) => {
      snackbarHelper.error('Invalid login credentials');
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
