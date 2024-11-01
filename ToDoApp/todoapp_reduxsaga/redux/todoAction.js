import { createSlice } from '@reduxjs/toolkit';

const todoSaga = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchJobsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addJobRequest: (state) => {
      state.loading = true;
    },
    addJobSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    addJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteJobRequest: (state) => {
      state.loading = true;
    },
    deleteJobSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(job => job.id !== action.payload);
    },
    deleteJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editJobRequest: (state) => {
      state.loading = true;
    },
    editJobSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    editJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  addJobRequest,
  addJobSuccess,
  addJobFailure,
  deleteJobRequest,
  deleteJobSuccess,
  deleteJobFailure,
  editJobRequest,
  editJobSuccess,
  editJobFailure,
} = todoSaga.actions;

export default todoSaga.reducer;