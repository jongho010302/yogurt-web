import { ActionTree } from 'vuex';
import axios from 'axios';
import { TicketState } from './types';
import { RootState } from '../types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<TicketState, RootState> = {
  async loadTicketList({ commit }) {
    try {
      const response = await axios.get(`${VUE_APP_MY_BACK_URL}/api/ticket`);
      const payload = response && response.data;
      commit('loadTicketList', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async loadTicketDetail({ commit }, { id }) {
    try {
      const response = await axios.get(`${VUE_APP_MY_BACK_URL}/api/ticket/${id}`);
      const payload = response && response.data;
      commit('loadTicketDetail', payload);
    } catch (err) {
      console.error(err);
    }
  },
  async saveTicket(none, { lectureType, lectureTitle, lectureCount, availablePeriod, maxTrainee, price }) {
    try {
      await axios.post(`${VUE_APP_MY_BACK_URL}/api/ticket/save`, {
        lectureType, lectureTitle, lectureCount, availablePeriod, maxTrainee, price 
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
