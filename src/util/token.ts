import { User } from '@/store/user/types';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken: string) => {
  return localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('accessToken');
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : user;
};

export const removeUser = () => {
  return localStorage.removeItem('user');
};

export const setUser = (user: User) => {
  return localStorage.setItem('user', JSON.stringify(user));
};
