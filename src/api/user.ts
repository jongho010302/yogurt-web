import { makeRequestWithoutAlert, makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const checkUserApi = () =>
  makeRequestWithoutAlert('get', `${VUE_APP_MY_BACK_URL}/user/check`);

export const logInApi = (username: string, password: string) =>
  makeRequestWithoutAlert('post', `${VUE_APP_MY_BACK_URL}/auth/log-in`, {
    username,
    password,
  });

export const logOutApi = () =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/user/log-out`);

export const findMaskingUsernameApi = (name: string) =>
  makeRequest(
    'get',
    `${VUE_APP_MY_BACK_URL}/auth/find/masking-username?name=${name}`,
  );

export const findUsernameApi = (email: string) =>
  makeRequest(
    'get',
    `${VUE_APP_MY_BACK_URL}/auth/find/username?email=${email}`,
  );

export const sendFindPasswordCodeApi = (email: string) =>
  makeRequest(
    'get',
    `${VUE_APP_MY_BACK_URL}/auth/find/password/verify?email=${email}`,
  );

export const verifyFindPasswordCodeApi = (email: string, verifyCode: string) =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/find/password/verify`, {
    email,
    verifyCode,
  });

export const changePasswordApi = (
  email: string,
  password: string,
  verifyCode: string,
) =>
  makeRequest('put', `${VUE_APP_MY_BACK_URL}/auth/find/password`, {
    email,
    password,
    verifyCode,
  });

export const verifyUsernameApi = (username: string) =>
  makeRequest(
    'get',
    `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify?username=${username}`,
  );

export const sendSignUpCodeApi = (email: string) =>
  makeRequest(
    'get',
    `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify?email=${email}`,
  );

export const verifySignUpCodeApi = (email: string, verifyCode: string) =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify`, {
    email,
    verifyCode,
  });

export const getUsersApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/user`);

export const getUserApi = (id: string | number) =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/user/${id}`);
