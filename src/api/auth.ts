import { makeRequestWithoutAlert, makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const logInApi = (username: string, password: string) =>
  makeRequestWithoutAlert('post', `${VUE_APP_MY_BACK_URL}/auth/log-in`, {
    username,
    password,
  });

export const checkUserApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/user/check`);
