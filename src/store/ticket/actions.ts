import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { getTicketsApi, getTicketApi, saveTicketApi } from '@/api/ticket';
import { RootState, AsyncStatus } from '../types';
import { infoAlert } from '@/util/ui';

const actions: ActionTree<TicketState, RootState> = {
  async getTickets({ commit, rootState }, { isSelling, classType }) {
    try {
      commit('saveTickets', {
        ...rootState.ticket.tickets,
        status: AsyncStatus.WAITING,
      });
      const res = await getTicketsApi(isSelling, classType);
      commit('saveTickets', {
        ...rootState.ticket.tickets,
        status: AsyncStatus.SUCCESS,
        data: res.data,
      });
    } catch (err) {
      throw err;
    }
  },
  async getTicket({ commit, rootState }, { id }) {
    try {
      commit('saveTicket', {
        status: AsyncStatus.WAITING,
        data: rootState.ticket.ticket.data,
      });
      const res = await getTicketApi(id);
      commit('saveTicket', {
        status: AsyncStatus.SUCCESS,
        data: res.data,
      });
    } catch (err) {
      throw err;
    }
  },
  async saveTicket(none, payload) {
    try {
      const res = await saveTicketApi(payload);
      infoAlert(res.message);
      // if (rootState.ticket.tickets.data) {
      //   const tickets = rootState.ticket.tickets.res.map((el) => ({ ...el }));
      //   tickets.push(res.data);
      //   commit('saveTickets', tickets);
      // } else {
      //   commit('saveTickets', [res.data]);
      // }
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
