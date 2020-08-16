import { ActionTree } from 'vuex';
import {
  makeRequest,
  makeRequestWithoutAlert,
  setAxiosHeaders,
} from '@/util/common';
import { roleType } from '@/constants';
import { errorAlert, positiveAlert } from '@/util/ui';
import { AuthState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<AuthState, any> = {
  async logIn({ commit }, { username, password }) {
    try {
      const res = await makeRequestWithoutAlert(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/log-in`,
        {
          username,
          password,
        },
      );

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

      positiveAlert(res.message);
      commit('saveUser', res.data.user);
      setAxiosHeaders(res.data.jwtToken);
    } catch (err) {
      errorAlert(err.message);
      throw err;
    }
  },
  async logOut({ commit }) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/user/log-out`);
      commit('saveUser', null);
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
