import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { format } from 'date-fns';

import todosAPI from 'api/todos';

export const addOne = createAsyncThunk(
  'todos/addOne',
  async (todo, thunkAPI) => {
    const response = await todosAPI.addOne({
      ...todo,
      schedule_date: format(todo.schedule_date, 'yyyy-MM-dd'),
    });
    return response.data;
  }
);

export const fetchAll = createAsyncThunk('todos/fetchAll', async (thunkAPI) => {
  const response = await todosAPI.fetchAll();
  return response.data;
});

export const removeOne = createAsyncThunk(
  'todos/removeOne',
  async (id, thunkAPI) => {
    const response = await todosAPI.removeOne(id);
    return response.data;
  }
);

export const updateOne = createAsyncThunk(
  'todos/updateOne',
  async (data, thunkAPI) => {
    const { id, todo } = data;
    const response = await todosAPI.updateOne(id, {
      ...todo,
      schedule_date: format(todo.schedule_date, 'yyyy-MM-dd'),
    });
    return response.data;
  }
);

const todosAdapter = createEntityAdapter();

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState({
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
        todosAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchAll.fulfilled, todosAdapter.setAll)
      .addCase(removeOne.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload.id);
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        todosAdapter.upsertOne(state, action.payload);
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

export const { showModal, hideModal, setSelected } = todosSlice.actions;

export default todosSlice.reducer;

export const { selectAll, selectById } = todosAdapter.getSelectors(
  (state) => state.todos
);
