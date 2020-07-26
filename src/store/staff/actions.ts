import { ActionTree } from 'vuex';
import { makeRequest } from '@/util';
import { StaffState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StaffState, any> = {
  async getStaffs({ rootState }) {
    try {
      const res = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/staff`, null, {
        Authorization: rootState.auth.jwtToken
      });
      return res;
    } catch (err) {
      return err.response.data;
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
};

export default actions;
