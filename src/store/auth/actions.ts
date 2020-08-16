import { ActionTree } from 'vuex';
import { Notify } from 'quasar';
import router from '@/router';
import { makeRequest } from '@/util/common';
import { roleType } from '@/constants';
import { AuthState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<AuthState, any> = {
  async logIn({ commit }, { username, password }) {
    try {
      const res = await makeRequest(
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
        Notify.create({
          message: "You don't have permission to access.",
          position: 'top-right',
          color: 'negative',
          icon: 'warning',
        });
      }

      commit('saveUser', res.data.user);
      commit('saveJwtToken', res.data.jwtToken);
      await router.push('/');
    } catch (err) {
      throw err;
    }
  },
  async logOut({ rootState, commit }) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/user/log-out`,
        {},
        {
          Authorization: rootState.auth.jwtToken,
        },
      );
      commit('saveUser', null);
      await router.push({ path: '/login' });
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

      await router.push('/login');
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
  async verifyFindPasswordCode(none, { username, email }) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/find/password/verify`,
        { username, email },
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

      await router.push('/login');
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
