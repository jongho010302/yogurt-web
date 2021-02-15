import { MutationTree } from 'vuex';
import { AsyncStatus } from '../types';
import { StaffState, Staff } from './types';

const mutations: MutationTree<StaffState> = {
  saveStaffsData(state, payload: Staff[]) {
    state.staffs.data = payload;
  },
  saveStaffsStatus(state, payload: AsyncStatus) {
    state.staffs.status = payload;
  },
};

export default mutations;
