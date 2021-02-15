import { ActionTree } from 'vuex';
import {
  getStaffsApi,
  resetPasswordApi,
  deleteStaffApi,
  saveStaffApi,
} from '@/api/staff';
import { StaffState } from './types';
import { RootState, AsyncStatus } from '../types';

const actions: ActionTree<StaffState, RootState> = {
  async getStaffs({ commit }) {
    try {
      commit('saveStaffsStatus', AsyncStatus.WAITING);
      const res = await getStaffsApi();
      commit('saveStaffsStatus', AsyncStatus.SUCCESS);
      commit('saveStaffsData', res.data);
    } catch (err) {
      commit('saveStaffsStatus', AsyncStatus.FAILURE);
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
