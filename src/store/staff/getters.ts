import { GetterTree } from 'vuex';
import { StaffState } from './types';
import { RootState } from '../types';

const getters: GetterTree<StaffState, RootState> = {
  getStaffs(state): any {
    return state.staffs;
  },
};

export default getters;
