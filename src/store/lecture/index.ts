import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { LectureState } from './types';
import { AsyncStatus, RootState } from '../types';

export const state: LectureState = {
  lectures: {
    data: [],
    status: AsyncStatus.INIT,
  },
};

const namespaced = true;

const lecture: Module<LectureState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default lecture;
