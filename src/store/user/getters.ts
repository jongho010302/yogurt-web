import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUser(state) {
    return state.user;
  },
  getStudio(state) {
    return state.user?.studio;
  },
  getMaskingUsernames(state) {
    return state.maskingUsernames;
  },
  getUsers(state) {
    return state.users;
  },
  getUserDetail(state) {
    return state.userDetail;
  },
};
export default getters;
