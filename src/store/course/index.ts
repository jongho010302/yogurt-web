import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { CourseState } from './types';
import { RootState } from '../types';

export const state: CourseState = {};

const namespaced = true;

const course: Module<CourseState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default course;
