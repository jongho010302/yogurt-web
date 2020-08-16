import { ActionTree } from 'vuex';
import { makeRequest } from '@/util/common';
import { StaffState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StaffState, any> = {
  async getStaffs({ rootState, commit }) {
    try {
      const res = await makeRequest(
        'get',
        `${VUE_APP_MY_BACK_URL}/admin/staff`,
        null,
        {
          Authorization: rootState.auth.jwtToken,
        },
      );
      commit('saveStaffs', res.data);
    } catch (err) {
      throw err;
    }
  },
  async saveStaff({ rootState }, payload) {
    try {
      await makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload, {
        Authorization: rootState.auth.jwtToken,
      });
    } catch (err) {
      throw err;
    }
  },
  async deleteStaff({ rootState }, payload) {
    try {
      await makeRequest(
        'delete',
        `${VUE_APP_MY_BACK_URL}/admin/staff`,
        payload,
        {
          Authorization: rootState.auth.jwtToken,
        },
      );
    } catch (err) {
      throw err;
    }
  },
  async resetPassword({ rootState }, payload) {
    try {
      await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/admin/staff/reset-password`,
        payload,
        {
          Authorization: rootState.auth.jwtToken,
        },
      );
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
