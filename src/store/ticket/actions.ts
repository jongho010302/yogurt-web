import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { getTicketsApi, getTicketApi, saveTicketApi } from '@/api/ticket';
import { RootState } from '../types';
import { infoAlert } from '@/util/ui';

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
  async saveTicket({ commit, rootState }, payload) {
    try {
      const res = await saveTicketApi(payload);
      infoAlert(res.message);
      if (rootState.ticket.tickets) {
        const tickets = rootState.ticket.tickets.map((el) => ({ ...el }));
        tickets.push(res.data);
        commit('saveTickets', tickets);
      } else {
        commit('saveTickets', [res.data]);
      }
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
