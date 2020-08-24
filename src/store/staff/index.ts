import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { StaffState } from './types';
import { RootState } from '../types';

export const state: StaffState = {
  staffs: [],
};

const namespaced = true;

const lecture: Module<StaffState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default lecture;
