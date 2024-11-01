import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './todoAction';

const URL ='https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/note';

function* fetchJobs() {
  try {
    const response = yield call(axios.get, URL);
    yield put(fetchJobsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFailure(error.message));
  }
}

function* addJob(action) {
  try {
    const response = yield call(axios.post, URL, { title: action.payload });
    yield put(addJobSuccess(response.data));
  } catch (error) {
    yield put(addJobFailure(error.message));
  }
}

function* editJob(action) {
  try {
    const updatedJob = yield call(axios.put, `${URL}/${action.payload.id}`, { title: action.payload.title });
    yield put(editJobSuccess(updatedJob.data)); 
    yield put(fetchJobsRequest()); 
  } catch (error) {
    yield put(editJobFailure(error.message));
  }
}

function* deleteJob(action) {
  try {
    yield call(axios.delete, `${URL}/${action.payload}`);
    yield put(deleteJobSuccess(action.payload));
  } catch (error) {
    yield put(deleteJobFailure(error.message));
  }
}

export function* jobSaga() {
  yield takeLatest(fetchJobsRequest.type, fetchJobs);
  yield takeLatest(addJobRequest.type, addJob);
  yield takeLatest(editJobRequest.type, editJob);
  yield takeLatest(deleteJobRequest.type, deleteJob);
}