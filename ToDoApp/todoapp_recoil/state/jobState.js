import { atom, selector } from 'recoil';
import axios from 'axios';

const URL = 'https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/note';

// Atom lưu danh sách công việc
export const jobsState = atom({
  key: 'jobsState',
  default: [], // Mặc định là một mảng rỗng
});

// Atom lưu trạng thái tải dữ liệu
export const jobsLoadingState = atom({
  key: 'jobsLoadingState',
  default: false,
});

// Atom lưu trạng thái lỗi
export const jobsErrorState = atom({
  key: 'jobsErrorState',
  default: null,
});

// Selector để lấy danh sách công việc từ API
export const fetchJobsSelector = selector({
  key: 'fetchJobsSelector',
  get: async ({ get }) => {
    get(jobsLoadingState); // Đọc trạng thái loading
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

// Hàm để thêm công việc mới
export const addJob = async (newTitle, setJobs, setError) => {
  try {
    const response = await axios.post(URL, { title: newTitle });
    const newJob = response.data;
    setJobs((prevJobs) => [...prevJobs, newJob]);
  } catch (error) {
    setError(error.message);
  }
};

// Hàm để chỉnh sửa công việc
export const editJob = async (id, newTitle, setJobs, setError) => {
  try {
    const response = await axios.put(`${URL}/${id}`, { title: newTitle });
    const updatedJob = response.data;
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  } catch (error) {
    setError(error.message);
  }
};
