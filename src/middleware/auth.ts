import { getAccessToken } from '@/util/storage';

export const isAuthenticated = ({ next, router, to }: any) => {
  const accessToken = getAccessToken();
  const toPath = to.path;

  if (!accessToken && toPath !== '/login') {
    router.push('/login');
    return;
  }

  next();
};
