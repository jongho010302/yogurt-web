import { MutationTree } from 'vuex';
import { StaffState, Staff } from './types';

const mutations: MutationTree<StaffState> = {
  loadStaffList(state, payload: Staff[]) {
    state.staffList = payload;
  },
};

export default mutations;
