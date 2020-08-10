import axios, { Method } from 'axios';
import { ApiResponse } from '@/types';

export const yogurtAlert = (message: string) => {
  // window.alert(message);
};

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

    return res.data;
  } catch (err) {
    console.error(err);
    // yogurtAlert(err.response.data.message);
    return err.response.data;
  }
};
