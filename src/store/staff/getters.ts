import { GetterTree } from 'vuex';
import { StaffState } from './types';
import { RootState } from '../types';

const getters: GetterTree<StaffState, RootState> = {
  getStaffList(state): any {
    return state.staffList;
  },
};

export default getters;
