import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { TicketState } from './types';
import { RootState } from '../types';

export const state: TicketState = {
  tickets: [],
  ticket: null,
};

const namespaced = true;

const ticket: Module<TicketState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default ticket;
