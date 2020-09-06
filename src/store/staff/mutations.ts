import { MutationTree } from 'vuex';
import { StaffState, StaffData } from './types';

const mutations: MutationTree<StaffState> = {
  saveStaffs(state, payload: StaffData) {
    state.staffs = payload;
  },
};

export default mutations;
