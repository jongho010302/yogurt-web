import { ActionTree } from 'vuex';
import { roleType } from '@/constants';
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
import { RootState, AsyncStatus } from '../types';
import { errorAlert, positiveAlert, infoAlert } from '@/util/ui';
import {
  setUser,
  removeUser,
  removeAccessToken,
  setAccessToken,
} from '@/util/token';

const actions: ActionTree<UserState, RootState> = {
  async checkUser({ commit }) {
    try {
      const { data } = await checkUserApi();

      commit('saveUser', data.data);
      setUser(data.data);
    } catch (err) {
      commit('saveUser', null);
      removeAccessToken();
      removeUser();
      throw err;
    }
  },
  async logIn({ commit }, { username, password }) {
    try {
      const { data } = await logInApi(username, password);
      const userRole = data.data.user.roles[0];
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

      const { accessToken, user } = data.data;

      positiveAlert(data.message);
      commit('saveUser', user);
      setUser(user);
      setAccessToken(accessToken);
    } catch (err) {
      throw err;
    }
  },
  async logOut({ commit }) {
    try {
      const { data } = await logOutApi();
      commit('saveUser', null);
      removeAccessToken();
      removeUser();
      positiveAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async findMaskingUsername({ commit }, { name }) {
    try {
      const { data } = await findMaskingUsernameApi(name);
      commit('saveMaskingUsernames', data.data);
      positiveAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async findUsername(none, { email }) {
    try {
      const { data } = await findUsernameApi(email);
      positiveAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async sendFindPasswordCode(none, { email }) {
    try {
      const { data } = await sendFindPasswordCodeApi(email);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async verifyFindPasswordCode(none, { email, verifyCode }) {
    try {
      const { data } = await verifyFindPasswordCodeApi(email, verifyCode);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async changePassword(none, { email, password, verifyCode }) {
    try {
      const { data } = await changePasswordApi(email, password, verifyCode);
      positiveAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async verifyUsername(none, { username }) {
    try {
      const { data } = await verifyUsernameApi(username);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async sendSignUpCode(none, { email }) {
    try {
      const { data } = await sendSignUpCodeApi(email);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async verifySignUpCode(none, { email, verifyCode }) {
    try {
      const { data } = await verifySignUpCodeApi(email, verifyCode);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async getUsers({ commit, rootState }) {
    try {
      commit('saveUsers', {
        ...rootState.user.users,
        status: AsyncStatus.WAITING,
      });
      const { data } = await getUsersApi();
      commit('saveUsers', {
        ...rootState.user.users,
        status: AsyncStatus.SUCCESS,
        data: data.data,
      });
    } catch (err) {
      throw err;
    }
  },
  async getUser({ commit }, { id }) {
    try {
      const { data } = await getUserApi(id);
      commit('saveUserDetail', data.data);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
