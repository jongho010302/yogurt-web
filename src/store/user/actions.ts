import { ActionTree } from 'vuex';
import { RoleType } from '@/constants';
import { UserState } from './types';
import {
  checkUserApi,
  logInApi,
  logOutApi,
  sendFindPasswordCodeApi,
  verifyFindPasswordCodeApi,
  changePasswordApi,
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
} from '@/util/storage';

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
  async logIn({ commit }, { email, password }) {
    try {
      const { data } = await logInApi(email, password);
      const userRole = data.data.user.role;
      if (
        !(
          userRole === RoleType.ROLE_DEVELOPER ||
          userRole === RoleType.ROLE_OWNER ||
          userRole === RoleType.ROLE_MANAGER
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
  async sendFindPasswordCode(none, { email }) {
    try {
      const { data } = await sendFindPasswordCodeApi(email);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async verifyFindPasswordCode(none, { email, verificationCode }) {
    try {
      const { data } = await verifyFindPasswordCodeApi(email, verificationCode);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async changePassword(none, { email, password, verificationCode }) {
    try {
      const { data } = await changePasswordApi(
        email,
        password,
        verificationCode,
      );
      positiveAlert(data.message);
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
  async verifySignUpCode(none, { email, verificationCode }) {
    try {
      const { data } = await verifySignUpCodeApi(email, verificationCode);
      infoAlert(data.message);
    } catch (err) {
      throw err;
    }
  },
  async getUsers({ commit, rootState }, { isExit }) {
    try {
      commit('saveUsers', {
        ...rootState.user.users,
        status: AsyncStatus.WAITING,
      });
      const { data } = await getUsersApi(isExit);
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
