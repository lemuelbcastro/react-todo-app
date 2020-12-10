import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import usersAPI from 'api/users';

export const addOne = createAsyncThunk(
  'users/addOne',
  async (user, thunkAPI) => {
    const response = await usersAPI.addOne(user);
    return response.data;
  }
);

export const fetchAll = createAsyncThunk('users/fetchAll', async (thunkAPI) => {
  const response = await usersAPI.fetchAll();
  return response.data;
});

export const removeOne = createAsyncThunk(
  'users/removeOne',
  async (id, thunkAPI) => {
    const response = await usersAPI.removeOne(id);
    return response.data;
  }
);

export const updateOne = createAsyncThunk(
  'users/updateOne',
  async (data, thunkAPI) => {
    const { id, user } = data;
    const response = await usersAPI.updateOne(id, user);
    return response.data;
  }
);

const usersAdapter = createEntityAdapter();

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    selected: null,
    modal: {
      add: false,
      remove: false,
      update: false,
    },
  }),
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    showModal: (state, action) => {
      state.modal[action.payload] = true;
    },
    hideModal: (state, action) => {
      state.modal[action.payload] = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOne.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchAll.fulfilled, usersAdapter.setAll)
      .addCase(removeOne.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload.id);
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('pending'),
        (state) => {
          state.loading = true;
          state.modal.add = false;
          state.modal.remove = false;
          state.modal.update = false;
        }
      )
      .addMatcher(
        (action) =>
          ['fulfilled', 'rejected'].some((string) =>
            action.type.includes(string)
          ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { showModal, hideModal, setSelected } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll, selectById } = usersAdapter.getSelectors(
  (state) => state.users
);
