import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  per_page: number;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  per_page: 6,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({page, per_page}: {page: number; per_page: number}, {rejectWithValue}) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
      if (!response.ok) throw new Error('Ошибка сервера: ' + response.status);
      const data = await response.json();
      return {data: data.data, total: data.total};
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка при загрузке данных');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.data.push(action.payload);
      state.total += 1;
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.data.findIndex(u => u.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeUser(state, action: PayloadAction<number>) {
      state.data = state.data.filter(u => u.id !== action.payload);
      state.total -= 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ошибка при загрузке данных';
      });
  }
});

export const { addUser, updateUser, removeUser, setPage } = usersSlice.actions;
export default usersSlice.reducer;
