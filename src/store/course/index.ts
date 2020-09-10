import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { LectureState } from './types';
import { RootState } from '../types';

export const state: LectureState = {
  lectures: [],
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
