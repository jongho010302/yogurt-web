import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { StudioState } from './types';
import { RootState } from '../types';

export const state: StudioState = {
  studios: null
};

const namespaced = true;

const studio: Module<StudioState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default studio;
