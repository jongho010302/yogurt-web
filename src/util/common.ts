import axios, { Method } from 'axios';
import { ApiResponse } from '@/types';
import { errorAlert, positiveAlert } from '@/util/alert';

export const yogurtConfirm = (message: string) => window.confirm(message);

export const makeRequest = async (
  method: Method,
  url: string,
  data?: any,
  headers?: any,
): Promise<ApiResponse> => {
  try {
    const res = await axios({
      method,
      url,
      data,
      headers,
    });

    positiveAlert(res.data.message);

    return res.data;
  } catch (err) {
    console.error(err);
    errorAlert(err.response.data.message);
    throw err.response.data;
  }
};
