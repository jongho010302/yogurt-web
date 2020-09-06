import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { getTicketsApi, getTicketApi, saveTicketApi } from '@/api/ticket';
import { RootState, AsyncStatus } from '../types';
import { infoAlert } from '@/util/ui';

const actions: ActionTree<TicketState, RootState> = {
  async getTickets({ commit, rootState }) {
    try {
      commit('saveTickets', {
        ...rootState.ticket.tickets,
        status: AsyncStatus.WAITING,
      });
      const { data } = await getTicketsApi();
      commit('saveTickets', {
        ...rootState.ticket.tickets,
        status: AsyncStatus.SUCCESS,
        data: data.data,
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
      const { data } = await getTicketApi(id);
      commit('saveTicket', {
        status: AsyncStatus.SUCCESS,
        data: data.data,
      });
    } catch (err) {
      throw err;
    }
  },
  async saveTicket({ commit, rootState }, payload) {
    try {
      const { data } = await saveTicketApi(payload);
      infoAlert(data.message);
      if (rootState.ticket.tickets.data) {
        const tickets = rootState.ticket.tickets.data.map((el) => ({ ...el }));
        tickets.push(data.data);
        commit('saveTickets', tickets);
      } else {
        commit('saveTickets', [data.data]);
      }
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
