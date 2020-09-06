import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { TicketState } from './types';
import { RootState, AsyncStatus } from '../types';

export const state: TicketState = {
  tickets: {
    data: null,
    status: AsyncStatus.INIT,
  },
  ticket: {
    data: null,
    status: AsyncStatus.INIT,
  },
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
