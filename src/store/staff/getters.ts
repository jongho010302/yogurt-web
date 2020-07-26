import { GetterTree } from 'vuex';
import { StaffState, Staff } from './types';
import { RootState } from '../types';

const getters: GetterTree<StaffState, RootState> = {
  getStaffs(state): Staff[] {
    return state.staffs;
  },
};

export default getters;
