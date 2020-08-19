import { ActionTree } from 'vuex';
import { makeRequest, setAxiosHeaders } from '@/util/common';
import { roleType } from '@/constants';
import { errorAlert, positiveAlert } from '@/util/ui';
import { AuthState } from './types';
import { logInApi, checkUserApi } from '@/api/auth';

const { VUE_APP_MY_BACK_URL } = process.env;

const processLogOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwtToken');
  setAxiosHeaders('');
};

const actions: ActionTree<AuthState, any> = {
  async checkUser({ commit }) {
    try {
      const res = await checkUserApi();

      commit('saveUser', res.data);
      localStorage.setItem('user', res.data);
    } catch (err) {
      processLogOut();
      throw err;
    }
  },
  async logIn({ commit }, { username, password }) {
    try {
      const res = await logInApi(username, password);

      const userRole = res.data.user.roles[0];
      if (
        !(
          userRole === roleType.ROLE_DEVELOPER ||
          userRole === roleType.ROLE_OWNER ||
          userRole === roleType.ROLE_MANAGER
        )
      ) {
        errorAlert('로그인 할 권한이 없습니다.');
        return;
      }

      const { jwtToken, user } = res.data;

      positiveAlert(res.message);
      commit('saveJwtToken', jwtToken);
      commit('saveUser', user);
      localStorage.setItem('user', user);
      localStorage.setItem('jwtToken', jwtToken);
      setAxiosHeaders(jwtToken);
    } catch (err) {
      errorAlert(err.message);
      throw err;
    }
  },
  async logOut({ commit }) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/user/log-out`);
      commit('saveUser', null);
      commit('saveJwtToken', null);
      processLogOut();
    } catch (err) {
      throw err;
    }
  },
  async findMaskingUsername({ commit }, { name }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/masking-username?name=${name}`,
      );
      commit('saveMaskingUsernames', res.data);
    } catch (err) {
      throw err;
    }
  },
  async findUsername(none, { email }) {
    try {
      await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/username?email=${email}`,
      );
    } catch (err) {
      throw err;
    }
  },
  async sendFindPasswordCode(none, { email }) {
    try {
      await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/password/verify?email=${email}`,
      );
    } catch (err) {
      throw err;
    }
  },
  async verifyFindPasswordCode(none, { email, verifyCode }) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/find/password/verify`,
        { email, verifyCode },
      );
    } catch (err) {
      throw err;
    }
  },
  async changePassword(none, { email, password, verifyCode }) {
    try {
      await makeRequest('put', `${VUE_APP_MY_BACK_URL}/auth/find/password`, {
        email,
        password,
        verifyCode,
      });
    } catch (err) {
      throw err;
    }
  },
  async verifyUsername(none, { username }) {
    try {
      await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify/username?username=${username}`,
      );
    } catch (err) {
      throw err;
    }
  },
  async sendSignUpCode(none, { email }) {
    try {
      await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify/email?email=${email}`,
      );
    } catch (err) {
      throw err;
    }
  },
  async verifySignUpCode(none, { email, verifyCode }) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify/email`,
        {
          email,
          verifyCode,
        },
      );
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
