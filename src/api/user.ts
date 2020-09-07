import apiAxios from '@/util/apiAxios';

export const checkUserApi = () => apiAxios.get('/user/check');

export const logInApi = (username: string, password: string) =>
  apiAxios.post('/auth/log-in', {
    username,
    password,
  });

export const logOutApi = () => apiAxios.post('/user/log-out');

export const findMaskingUsernameApi = (name: string) =>
  apiAxios.get(`/auth/find/masking-username?name=${name}`);

export const findUsernameApi = (email: string) =>
  apiAxios.get(`/auth/find/username?email=${email}`);

export const sendFindPasswordCodeApi = (email: string) =>
  apiAxios.get(`/auth/find/password/verify?email=${email}`);

export const verifyFindPasswordCodeApi = (email: string, verifyCode: string) =>
  apiAxios.post('/auth/find/password/verify', {
    email,
    verifyCode,
  });

export const changePasswordApi = (
  email: string,
  password: string,
  verifyCode: string,
) =>
  apiAxios.put('/auth/find/password', {
    email,
    password,
    verifyCode,
  });

export const verifyUsernameApi = (username: string) =>
  apiAxios.get(`/auth/sign-up/verify?username=${username}`);

export const sendSignUpCodeApi = (email: string) =>
  apiAxios.get(`/auth/sign-up/verify?email=${email}`);

export const verifySignUpCodeApi = (email: string, verifyCode: string) =>
  apiAxios.post('/auth/sign-up/verify', {
    email,
    verifyCode,
  });

export const getUsersApi = (isExit: boolean) =>
  apiAxios.get(`/admin/user?isExit=${isExit}`);

export const getUserApi = (id: string | number) =>
  apiAxios.get(`/admin/user/${id}`);
