import { ActionTree } from 'vuex';
import { TicketState } from './types';
import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<TicketState, any> = {
  async getTickets({ commit }) {
    try {
      const response = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/admin/ticket`,
      );
      const payload = response && response.data;
      commit('saveTickets', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async getTicket({ commit }, { id }) {
    try {
      const response = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/admin/ticket/${id}`,
      );
      const payload = response && response.data;
      commit('saveTicket', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async saveTicket(none, payload) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/ticket`, payload);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
