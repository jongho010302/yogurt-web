import { GetterTree } from 'vuex';
import { AuthState } from './types';
import { RootState } from '../types';

const getters: GetterTree<AuthState, RootState> = {
  getUser(state) {
    return state.user;
  },
  getMaskingUsernames(state) {
    return state.maskingUsernames;
  },
};
export default getters;
