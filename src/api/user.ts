import client from '@/api/client';

export const checkUserApi = () => client.get('/user');

export const logInApi = (email: string, password: string) =>
  client.post('/auth/tokens', {
    email,
    password,
    studioId: 1,
  });

export const logOutApi = () => client.delete('/auth/tokens');

export const sendFindPasswordCodeApi = (email: string) =>
  client.post('/auth/verification/send', {
    email,
    verificationType: 'FIND_PASSWORD',
  });

export const verifyFindPasswordCodeApi = (
  email: string,
  verificationCode: string,
) =>
  client.post('/auth/verification/verify', {
    email,
    verificationCode,
    verificationType: 'FIND_PASSWORD',
  });

export const changePasswordApi = (
  email: string,
  password: string,
  verificationCode: string,
) =>
  client.put('/auth/find/password', {
    email,
    password,
    verificationCode,
  });

export const sendSignUpCodeApi = (email: string) =>
  client.post('/auth/verification/send', {
    email,
    verificationType: 'SIGNUP',
  });

export const verifySignUpCodeApi = (email: string, verificationCode: string) =>
  client.post('/auth/verification/verify', {
    email,
    verificationCode,
    verificationType: 'SIGNUP',
  });

export const getUsersApi = (isExit: boolean) =>
  client.get(`/admin/user?isExit=${isExit}`);

export const getUserApi = (id: string | number) =>
  client.get(`/admin/user/${id}`);
