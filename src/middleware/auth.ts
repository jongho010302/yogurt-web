import store from '../store';
import { yogurtAlert } from '../assets/common';

const authNamespace = 'auth';

export const isAuthenticated = ({ next, router, to }: any) => {
  const user = store.getters[`${authNamespace}/getUser`];
  const isLogined = Object.keys(user).length;
  const toPath = to.path;

  if(!isLogined && toPath !== '/login') {
    return router.push('/login');
  }

  if(toPath === '/login' && isLogined) {
    yogurtAlert('이미 로그인 되어있습니다.');
    router.push('/');
  }

  return next();
};
