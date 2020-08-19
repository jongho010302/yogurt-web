import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { getTicketsApi, getTicketApi, saveTicketApi } from '@/api/ticket';

const actions: ActionTree<TicketState, any> = {
  async getTickets({ commit }) {
    try {
      const res = await getTicketsApi();
      commit('saveTickets', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async getTicket({ commit }, { id }) {
    try {
      const res = await getTicketApi(id);
      commit('saveTicket', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async saveTicket(none, payload) {
    try {
      await saveTicketApi(payload);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
