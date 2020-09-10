import client from '@/api/client';

export const checkUserApi = () => client.get('/user/check');

export const logInApi = (username: string, password: string) =>
  client.post('/auth/log-in', {
    username,
    password,
  });

export const logOutApi = () => client.post('/user/log-out');

export const findMaskingUsernameApi = (name: string) =>
  client.get(`/auth/find/masking-username?name=${name}`);

export const findUsernameApi = (email: string) =>
  client.get(`/auth/find/username?email=${email}`);

export const sendFindPasswordCodeApi = (email: string) =>
  client.get(`/auth/find/password/verify?email=${email}`);

export const verifyFindPasswordCodeApi = (email: string, verifyCode: string) =>
  client.post('/auth/find/password/verify', {
    email,
    verifyCode,
  });

export const changePasswordApi = (
  email: string,
  password: string,
  verifyCode: string,
) =>
  client.put('/auth/find/password', {
    email,
    password,
    verifyCode,
  });

export const verifyUsernameApi = (username: string) =>
  client.get(`/auth/sign-up/verify?username=${username}`);

export const sendSignUpCodeApi = (email: string) =>
  client.get(`/auth/sign-up/verify?email=${email}`);

export const verifySignUpCodeApi = (email: string, verifyCode: string) =>
  client.post('/auth/sign-up/verify', {
    email,
    verifyCode,
  });

export const getUsersApi = (isExit: boolean) =>
  client.get(`/admin/user?isExit=${isExit}`);

export const getUserApi = (id: string | number) =>
  client.get(`/admin/user/${id}`);
