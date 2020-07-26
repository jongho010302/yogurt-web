import { ActionTree } from 'vuex';
import { makeRequest, yogurtAlert } from '@/util/common';
import { roleType } from '@/constants';
import { AuthState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<AuthState, any> = {
  async handleLogin({ commit }, { username, password }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/log-in`, {
        username, password,
      });

      const userRole = res.data.user.roles[0];
      if(!(userRole === roleType.ROLE_DEVELOPER || userRole === roleType.ROLE_OWNER || userRole === roleType.ROLE_MANAGER)) {
        yogurtAlert('You don\'t have permission to access.');
        throw new Error('You don\'t have permission to access.');
      }

      commit('handleLogin', res.data);
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleLogout({ rootState, commit }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/user/log-out`, {}, {
        Authorization: rootState.auth.jwtToken
      });

      commit('handleLogout');
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleFindPassword({ rootState }, { username, email }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/find-password`, { username, email }, {
        Authorization: rootState.auth.jwtToken
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleFindUsername({ rootState }, { email }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/find-username`, { email }, {
        Authorization: rootState.auth.jwtToken
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleUsernameVerify(none, { username }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/verification/username-duplication`, {
        username
      });

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleEmailDuppVerify(none, { email }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/verification/email-duplication`, {
        email
      });

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleEmailVerficiationCodeSend(none, { email }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/verification/send-email-code`, {
        email
      });

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async handleEmailVerificationCodeCheck(none, { email, verificationCode }) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/verification/check-email-code`, {
        email, verificationCode
      });

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default actions;
