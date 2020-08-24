import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { getTicketsApi, getTicketApi, saveTicketApi } from '@/api/ticket';
import { RootState } from '../types';

const actions: ActionTree<TicketState, RootState> = {
  async getTickets({ commit }) {
    try {
      const res = await getTicketsApi();
      commit('saveTickets', res.data);
    } catch (err) {
      throw err;
    }
  },
  async getTicket({ commit }, { id }) {
    try {
      const res = await getTicketApi(id);
      commit('saveTicket', res.data);
    } catch (err) {
      throw err;
    }
  },
  async saveTicket(none, payload) {
    try {
      await saveTicketApi(payload);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
