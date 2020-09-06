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
  async getStaffs({ commit, rootState }) {
    try {
      commit('saveStaffs', {
        ...rootState.staff.staffs,
        status: AsyncStatus.WAITING,
      });
      const { data } = await getStaffsApi();
      commit('saveStaffs', {
        ...rootState.staff.staffs,
        status: AsyncStatus.SUCCESS,
        data: data.data,
      });
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
