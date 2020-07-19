import { MutationTree } from 'vuex';
import { StaffState, Staff } from './types';

const mutations: MutationTree<StaffState> = {
  loadStaffs(state, payload: Staff[]) {
    state.staffs = payload;
  },
};

export default mutations;
