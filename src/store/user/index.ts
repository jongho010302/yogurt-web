import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { UserState } from './types';
import { RootState } from '../types';
import { User } from '../user/types';

export const state: UserState = {
  user: localStorage.getItem('user') as User | null,
  jwtToken: localStorage.getItem('jwtToken'),
  maskingUsernames: null,
  users: null,
  userDetail: null,
};

const namespaced = true;

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default user;
