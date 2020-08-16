import { ActionTree } from 'vuex';
import { makeRequest } from '@/util/common';
import { StaffState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StaffState, any> = {
  async getStaffs({ commit }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/admin/staff`,
        null,
      );
      commit('saveStaffs', res.data);
    } catch (err) {
      throw err;
    }
  },
  async saveStaff(none, payload) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload);
    } catch (err) {
      throw err;
    }
  },
  async deleteStaff(none, payload) {
    try {
      await makeRequest(
        'delete',
        `${VUE_APP_MY_BACK_URL}/admin/staff`,
        payload,
      );
    } catch (err) {
      throw err;
    }
  },
  async resetPassword(none, payload) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/admin/staff/reset-password`,
        payload,
      );
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
