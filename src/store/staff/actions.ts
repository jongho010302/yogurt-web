import { ActionTree } from 'vuex';
import {
  getStaffsApi,
  resetPasswordApi,
  deleteStaffApi,
  saveStaffApi,
} from '@/api/staff';
import { StaffState } from './types';
import { RootState } from '../types';

const actions: ActionTree<StaffState, RootState> = {
  async getStaffs({ commit }) {
    try {
      const res = await getStaffsApi();
      commit('saveStaffs', res.data);
    } catch (err) {
      throw err;
    }
  },
  async saveStaff(none, payload) {
    try {
      await saveStaffApi(payload);
    } catch (err) {
      throw err;
    }
  },
  async deleteStaff(none, payload) {
    try {
      await deleteStaffApi(payload);
    } catch (err) {
      throw err;
    }
  },
  async resetPassword(none, payload) {
    try {
      await resetPasswordApi(payload);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
