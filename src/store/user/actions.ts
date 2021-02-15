import { ActionTree } from 'vuex';
import { UserState } from './types';
import {
  checkUserApi,
  loginApi,
  logoutApi,
  sendFindPasswordCodeApi,
  verifyFindPasswordCodeApi,
  findPasswordApi,
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
  setStudio,
} from '@/util/storage';
import { whoCanLogins } from '@/util/role';

const actions: ActionTree<UserState, RootState> = {
  /**
   * 유저 로그인 정보 확인
   */
  async checkUser({ commit }) {
    try {
      const res = await checkUserApi();
      const { user, studio } = res.data;
      commit('saveUser', user);
      commit('saveStudio', studio);
      setUser(user);
      setStudio(studio);
    } catch (err) {
      commit('saveUser', null);
      removeAccessToken();
      removeUser();
      throw err;
    }
  },
  /**
   * 로그인: 이메일
   */
  async login({ commit }, { email, password }) {
    try {
      const res = await loginApi(email, password);
      const userRole = res.data.user.role;
      if (!whoCanLogins.includes(userRole)) {
        errorAlert('로그인 할 권한이 없습니다.');
        return;
      }

      const { accessToken, user, studio } = res.data;

      positiveAlert(res.message);
      commit('saveUser', user);
      commit('saveStudio', studio);
      setUser(user);
      setStudio(studio);
      setAccessToken(accessToken);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 로그아웃
   */
  async logout({ commit }) {
    try {
      commit('saveUser', null);
      commit('saveStudio', null);
      removeAccessToken();
      removeUser();
      const res = await logoutApi();
      positiveAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 인증번호 전송: 비밀번호 찾기
   */
  async sendFindPasswordCode(none, { email }) {
    try {
      const res = await sendFindPasswordCodeApi(email);
      infoAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 인증번호 인증: 비밀번호 찾기
   */
  async verifyFindPasswordCode(none, { email, verificationCode }) {
    try {
      const res = await verifyFindPasswordCodeApi(email, verificationCode);
      infoAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 비밀번호 찾기
   */
  async findPassword(none, { email, password, verificationCode }) {
    try {
      const res = await findPasswordApi(email, password, verificationCode);
      positiveAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 인증번호 전송: 회원가입
   */
  async sendSignUpCode(none, { email }) {
    try {
      const res = await sendSignUpCodeApi(email);
      infoAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 인증번호 인증: 회원가입
   */
  async verifySignUpCode(none, { email, verificationCode }) {
    try {
      const res = await verifySignUpCodeApi(email, verificationCode);
      infoAlert(res.message);
    } catch (err) {
      throw err;
    }
  },
  /**
   * 유저 리스트 조회
   */
  async getUsers({ commit, rootState }) {
    try {
      commit('saveUsers', {
        ...rootState.user.users,
        status: AsyncStatus.WAITING,
      });
      const res = await getUsersApi();
      commit('saveUsers', {
        ...rootState.user.users,
        status: AsyncStatus.SUCCESS,
        data: res.data,
      });
    } catch (err) {
      throw err;
    }
  },
  /**
   * 하나의 유저 조회
   */
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
