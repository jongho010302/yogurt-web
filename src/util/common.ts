import axios, { Method } from 'axios';
import { ApiResponse } from '@/types';
import { errorAlert, positiveAlert, warningAlert } from '@/util/ui';
import { LoadingBar } from 'quasar';

export const makeRequest = async (
  method: Method,
  url: string,
  data?: any,
  headers?: any,
): Promise<ApiResponse> => {
  try {
    LoadingBar.start();

    const res = await axios({
      method,
      url,
      data,
      headers,
    });

    LoadingBar.stop();

    positiveAlert(res.data.message);

    return res.data;
  } catch (err) {
    LoadingBar.stop();
    console.error(err);
    errorAlert(err.response.data.message);
    throw err.response.data;
  }
};

export const makeRequestWithoutAlert = async (
  method: Method,
  url: string,
  data?: any,
  headers?: any,
): Promise<ApiResponse> => {
  try {
    LoadingBar.start();

    const res = await axios({
      method,
      url,
      data,
      headers,
    });

    LoadingBar.stop();

    return res.data;
  } catch (err) {
    LoadingBar.stop();
    console.error(err);
    throw err.response.data;
  }
};

export const setAxiosHeaders = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};

export const validateParam = (value: any, message: string) => {
  if (!value) {
    warningAlert(message);
    throw new Error();
  }
};
