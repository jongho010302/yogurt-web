import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { AuthState } from './types';
import { RootState } from '../types';
import { User } from '../user/types';

export const state: AuthState = {
  user: localStorage.getItem('user') as User | null,
  jwtToken: localStorage.getItem('jwtToken'),
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
