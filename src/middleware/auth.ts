import { warningAlert } from '../util/ui';

export const isAuthenticated = ({ next, router, to }: any) => {
  const jwtToken = localStorage.getItem('jwtToken');
  const toPath = to.path;

  if (!jwtToken && toPath !== '/login') {
    return router.push('/login');
  }

  if (toPath === '/login' && jwtToken) {
    warningAlert('이미 로그인 되어있습니다.');
    router.push('/schedule');
    return;
  }

  return next();
};
