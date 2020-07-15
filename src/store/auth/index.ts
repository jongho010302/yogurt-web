import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { LoginState } from './types';
import { RootState } from '../types';

export const state: LoginState = {
  jwtToken: '',
  user: {},
};

const namespaced = true;

const lecture: Module<LoginState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default lecture;
