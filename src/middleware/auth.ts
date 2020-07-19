import store from '../store';
import { yogurtAlert } from '../util';

const authNamespace = 'auth';

export const isAuthenticated = ({ next, router, to }: any) => {
  const user = store.getters[`${authNamespace}/getUser`];
  const toPath = to.path;

  if(!user && toPath !== '/login') {
    return router.push('/login');
  }

  if(toPath === '/login' && user) {
    yogurtAlert('이미 로그인 되어있습니다.');
    router.push('/');
  }

  return next();
};
