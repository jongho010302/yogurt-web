import client from '@/api/client';

export const checkUserApi = () => client.get('/user');

export const logInApi = (email: string, password: string) =>
  client.post('/auth/tokens/email', {
    email,
    password,
    studioId: 1,
  });

export const logOutApi = () => client.delete('/auth/tokens');

export const sendFindPasswordCodeApi = (email: string) =>
  client.post('/auth/verification/find-password/send', {
    email,
  });

export const verifyFindPasswordCodeApi = (
  email: string,
  verificationCode: string,
) =>
  client.post('/auth/verification/find-password/verify', {
    email,
    verificationCode,
  });

export const changePasswordApi = (
  email: string,
  password: string,
  verificationCode: string,
) =>
  client.put('/auth/password', {
    email,
    password,
    verificationCode,
  });

export const sendSignUpCodeApi = (email: string) =>
  client.post('/auth/verifications/signup/send', {
    email,
  });

export const verifySignUpCodeApi = (email: string, verificationCode: string) =>
  client.post('/auth/verifications/signup/verify', {
    email,
    verificationCode,
  });

export const getUsersApi = (isExit: boolean) =>
  client.get(`/admin/users?isExit=${isExit.toString()}`);

export const getUserApi = (id: string | number) =>
  client.get(`/admin/users/${id}`);
