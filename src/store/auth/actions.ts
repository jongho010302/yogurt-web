import { ActionTree } from 'vuex';
import { Notify } from 'quasar';
import router from '@/router';
import { makeRequest, yogurtAlert } from '@/util/common';
import { roleType } from '@/constants';
import { AuthState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<AuthState, any> = {
  async logIn({ commit }, { username, password }) {
    const res = await makeRequest(
      'post',
      `${VUE_APP_MY_BACK_URL}/auth/log-in`,
      {
        username,
        password,
      },
    );

    if (!res.success) {
      Notify.create({
        message: res.message,
        position: 'top-right',
        color: 'negative',
        icon: 'warning',
      });
      return;
    }

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
  },
  async logOut({ rootState, commit }) {
    try {
      const res = await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/user/log-out`,
        {},
        {
          Authorization: rootState.auth.jwtToken,
        },
      );

      commit('saveUser', null);
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async findMaskingUsername(none, { name }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/masking-username?name=${name}`,
      );
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async findUsername(none, { email }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/username?email=${email}`,
      );
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async sendFindPasswordCode(none, { email }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/find/password/verify?email=${email}`,
      );
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async verifyFindPasswordCode(none, { username, email }) {
    try {
      const res = await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/find/password/verify`,
        { username, email },
      );
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async findPassword(none, { email, password, verifyCode }) {
    try {
      const res = await makeRequest(
        'put',
        `${VUE_APP_MY_BACK_URL}/auth/find/password`,
        { email, password, verifyCode },
      );
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async verifyUsername(none, { username }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify/username?username=${username}`,
      );

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async sendSignUpCode(none, { email }) {
    try {
      const res = await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify/email?email=${email}`,
      );

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async verifySignUpCode(none, { email, verifyCode }) {
    try {
      const res = await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/sign-up/verify`,
        {
          email,
          verifyCode,
        },
      );

      return res;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default actions;
