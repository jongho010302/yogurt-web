import { warningAlert } from '../util/ui';
import { getAccessToken } from '@/util/storage';

export const isAuthenticated = ({ next, router, to }: any) => {
  const accessToken = getAccessToken();
  const toPath = to.path;

  if (!accessToken && toPath !== '/login') {
    return router.push('/login');
  }

  if (toPath === '/login' && accessToken) {
    warningAlert('이미 로그인 되어있습니다.');
    router.push('/schedule');
    return;
  }

  return next();
};
