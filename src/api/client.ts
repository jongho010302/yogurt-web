import axios from 'axios';
import app from '../main'; // import the instance
import { errorAlert } from '@/util/ui';
import { getAccessToken } from '../util/storage';

const { VUE_APP_MY_BACK_URL } = process.env;

const instance = axios.create({
  baseURL: VUE_APP_MY_BACK_URL,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  config.headers.Authorization = token ? token : '';
  // @ts-ignore
  app.$Progress.start(); // for every request start the progress
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // @ts-ignore
    app.$Progress.finish(); // finish when a response is received
    return response;
  },
  (error) => {
    errorAlert(error.response.data.message);
    // @ts-ignore
    app.$Progress.fail();
    return Promise.reject(error);
  },
);

export default instance; // export axios instance to be imported in your app
