import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { StaffState } from './types';
import { RootState, AsyncStatus } from '../types';

export const state: StaffState = {
  staffs: {
    status: AsyncStatus.INIT,
    data: null,
  },
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
