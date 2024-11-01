import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/note';

// Thunk để fetch danh sách công việc
export const fetchJobs = createAsyncThunk('todos/fetchJobs', async () => {
  const response = await axios.get(URL);
  return response.data;
});

// Thunk để thêm công việc mới
export const addJob = createAsyncThunk('todos/addJob', async (title) => {
  const response = await axios.post(URL, { title });
  return response.data;
});

// Thunk để chỉnh sửa công việc
export const editJob = createAsyncThunk('todos/editJob', async ({ id, title }) => {
  const response = await axios.put(`${URL}/${id}`, { title });
  return response.data;
});

// Thunk để xóa công việc
export const deleteJob = createAsyncThunk('todos/deleteJob', async (id) => {
  await axios.delete(`${URL}/${id}`);
  return id; // Trả về id để cập nhật state sau khi xóa thành công
});

// Tạo todoSlice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái cho fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Xử lý trạng thái cho addJob
      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý trạng thái cho editJob
      .addCase(editJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý trạng thái cho deleteJob
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(job => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
