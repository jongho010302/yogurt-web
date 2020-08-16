import store from '../store';
import { warningAlert } from '../util/ui';

const authNamespace = 'auth';

export const isAuthenticated = ({ next, router, to }: any) => {
  const user = store.getters[`${authNamespace}/getUser`];
  const toPath = to.path;

  if (!user && toPath !== '/login') {
    return router.push('/login');
  }

  if (toPath === '/login' && user) {
    warningAlert('이미 로그인 되어있습니다.');
    router.push('/schedule');
    return;
  }

  return next();
};
