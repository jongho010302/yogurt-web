import { ActionTree } from 'vuex';
import { setAxiosHeaders } from '@/util/common';
import { roleType } from '@/constants';
import { errorAlert, positiveAlert } from '@/util/ui';
import { UserState } from './types';
import {
  checkUserApi,
  logInApi,
  logOutApi,
  findMaskingUsernameApi,
  findUsernameApi,
  sendFindPasswordCodeApi,
  verifyFindPasswordCodeApi,
  changePasswordApi,
  verifyUsernameApi,
  sendSignUpCodeApi,
  verifySignUpCodeApi,
  getUsersApi,
  getUserApi,
} from '@/api/user';
import { RootState } from '../types';

const processLogOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwtToken');
  setAxiosHeaders('');
};

const actions: ActionTree<UserState, RootState> = {
  async checkUser({ commit }) {
    try {
      const res = await checkUserApi();

      commit('saveUser', res.data);
      localStorage.setItem('user', res.data);
    } catch (err) {
      commit('saveJwtToken', null);
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
      const res = await logOutApi();
      commit('saveUser', null);
      commit('saveJwtToken', null);
      processLogOut();
      positiveAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  async findMaskingUsername({ commit }, { name }) {
    try {
      const res = await findMaskingUsernameApi(name);
      commit('saveMaskingUsernames', res.data);
    } catch (err) {
      throw err;
    }
  },
  async findUsername(none, { email }) {
    try {
      await findUsernameApi(email);
    } catch (err) {
      throw err;
    }
  },
  async sendFindPasswordCode(none, { email }) {
    try {
      await sendFindPasswordCodeApi(email);
    } catch (err) {
      throw err;
    }
  },
  async verifyFindPasswordCode(none, { email, verifyCode }) {
    try {
      await verifyFindPasswordCodeApi(email, verifyCode);
    } catch (err) {
      throw err;
    }
  },
  async changePassword(none, { email, password, verifyCode }) {
    try {
      await changePasswordApi(email, password, verifyCode);
    } catch (err) {
      throw err;
    }
  },
  async verifyUsername(none, { username }) {
    try {
      verifyUsernameApi(username);
    } catch (err) {
      throw err;
    }
  },
  async sendSignUpCode(none, { email }) {
    try {
      await sendSignUpCodeApi(email);
    } catch (err) {
      throw err;
    }
  },
  async verifySignUpCode(none, { email, verifyCode }) {
    try {
      await verifySignUpCodeApi(email, verifyCode);
    } catch (err) {
      throw err;
    }
  },
  async getUsers({ commit }) {
    try {
      const res = await getUsersApi();
      commit('saveUsers', res.data);
    } catch (err) {
      throw err;
    }
  },
  async getUser({ commit }, { id }) {
    try {
      const res = await getUserApi(id);
      commit('saveUserDetail', res.data);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
