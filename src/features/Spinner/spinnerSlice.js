import { createSlice } from '@reduxjs/toolkit';

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: {
    open: false,
  },
  reducers: {
    showSpinner: (state) => {
      state.open = true;
    },
    hideSpinner: (state) => {
      state.open = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
