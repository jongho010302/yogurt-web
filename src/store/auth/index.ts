import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { AuthState } from './types';
import { RootState } from '../types';

export const state: AuthState = {
  jwtToken: null,
  user: null,
  maskingUsernames: null,
};

const namespaced = true;

const lesson: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default lesson;
