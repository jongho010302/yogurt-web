import client from '@/api/client';
import { ApiResponse } from '@/types';

export const checkUserApi = (): Promise<ApiResponse> => client.get('/user');

export const loginApi = (
  email: string,
  password: string,
): Promise<ApiResponse> =>
  client.post('/auth/tokens/email', {
    email,
    password,
    studioId: 1,
  });

export const logoutApi = (): Promise<ApiResponse> =>
  client.delete('/auth/tokens');

export const sendFindPasswordCodeApi = (email: string): Promise<ApiResponse> =>
  client.post('/auth/verification/find-password/send', {
    email,
  });

export const verifyFindPasswordCodeApi = (
  email: string,
  verificationCode: string,
): Promise<ApiResponse> =>
  client.post('/auth/verification/find-password/verify', {
    email,
    verificationCode,
  });

export const findPasswordApi = (
  email: string,
  password: string,
  verificationCode: string,
): Promise<ApiResponse> =>
  client.put('/auth/password', {
    email,
    password,
    verificationCode,
  });

export const sendSignUpCodeApi = (email: string): Promise<ApiResponse> =>
  client.post('/auth/verifications/signup/send', {
    email,
  });

export const verifySignUpCodeApi = (
  email: string,
  verificationCode: string,
): Promise<ApiResponse> =>
  client.post('/auth/verifications/signup/verify', {
    email,
    verificationCode,
  });

export const getUsersApi = (): Promise<ApiResponse> =>
  client.get(`/admin/users`);

export const getUserApi = (id: string | number): Promise<ApiResponse> =>
  client.get(`/admin/users/${id}`);
