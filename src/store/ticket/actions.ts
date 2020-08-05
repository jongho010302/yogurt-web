import { ActionTree } from 'vuex';
import { TicketState } from './types';
// import { RootState } from '../types';
import {makeRequest} from "@/util";

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<TicketState, any> = {
  async getTickets({ commit, rootState }) {
    try {
      const response = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/ticket`, {}, {
        Authorization: rootState.auth.jwtToken
      });
      const payload = response && response.data;
      commit('saveTickets', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async getTicket({ commit, rootState }, { id }) {
    try {
      const response = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/ticket/${id}`, {}, {
        Authorization: rootState.auth.jwtToken
      });
      const payload = response && response.data;
      commit('saveTicket', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async saveTicket({ rootState }, payload) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/api/ticket/save`, payload, {
        Authorization: rootState.auth.jwtToken
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
