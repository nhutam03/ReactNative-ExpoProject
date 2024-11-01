import { atom, selector, selectorFamily } from 'recoil';
import axios from 'axios';

const URL = 'https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/note';

export const jobListState = atom({
  key: 'jobListState',
  default: selector({
    key: 'jobListState/default',
    get: async () => {
      try {
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
      }
    },
  }),
});

// Selector thêm công việc mới
export const addJob = selector({
  key: 'addJob',
  get: () => null, // get là bắt buộc nhưng không sử dụng ở đây
  set: ({ set, get }, newJob) => {
    const currentJobs = get(jobListState);
    const updatedJobs = [...currentJobs, newJob];
    set(jobListState, updatedJobs);

    // Thực hiện API call để thêm công việc vào server
    axios.post(URL, newJob).catch((error) => {
      console.error('Error adding job:', error);
    });
  },
});

// Selector xóa công việc
export const deleteJob = selector({
  key: 'deleteJob',
  get: () => null,
  set: ({ set, get }, jobId) => {
    const currentJobs = get(jobListState);
    const updatedJobs = currentJobs.filter(job => job.id !== jobId);
    set(jobListState, updatedJobs);

    // Thực hiện API call để xóa công việc khỏi server
    axios.delete(`${URL}/${jobId}`).catch((error) => {
      console.error('Error deleting job:', error);
    });
  },
});

// SelectorFamily để chỉnh sửa công việc theo ID
// export const editJobSelector = selectorFamily({
//   key: 'editJobSelector',
//   get: (id) => async ({ get }) => {
//     const jobs = get(jobsState);
//     return jobs.find((job) => job.id === id);
//   },
//   set: (id) => async ({ set, get }, newTitle) => {
//     try {
//       const response = await axios.put(`${URL}/${id}`, { title: newTitle });
//       const updatedJob = response.data;
//       const jobs = get(jobsState);
//       const updatedJobs = jobs.map((job) => (job.id === id ? updatedJob : job));
//       set(jobsState, updatedJobs);
//     } catch (error) {
//       set(jobsErrorState, error.message);
//     }
//   },
// });
export const editJobSelector = selectorFamily({
  key: 'editJobSelector',
  get: (id) => ({ get }) => {
    const jobs = get(jobsState);
    return jobs.find((job) => job.id === id);
  },
  set: (id) => ({ set, get }, newTitle) => {
    const jobs = get(jobsState);
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, title: newTitle } : job
    );
    set(jobsState, updatedJobs);
  },
});

