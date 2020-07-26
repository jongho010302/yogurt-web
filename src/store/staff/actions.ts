import { ActionTree } from 'vuex';
import { makeRequest } from '@/util';
import { StaffState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StaffState, any> = {
  async getStaffs({ rootState, commit }) {
    try {
      const res = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/staff`, null, {
        Authorization: rootState.auth.jwtToken
      });
      commit('saveStaffs', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async saveStaff({ rootState }, payload) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload, {
        Authorization: rootState.auth.jwtToken
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async deleteStaff({ rootState }, payload) {
    try {
      const res = await makeRequest('delete', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload, {
        Authorization: rootState.auth.jwtToken
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  async resetPassword({ rootState }, payload) {
    try {
      const res = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/staff/reset-password`, payload, {
        Authorization: rootState.auth.jwtToken
      });
      console.log(res);
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default actions;
