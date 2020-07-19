import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { LessonState } from './types';
import { RootState } from '../types';

export const state: LessonState = {
  lessons: [],
};

const namespaced = true;

const lesson: Module<LessonState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default lesson;
