import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUser(state) {
    return state.user;
  },
  getIsLogined(state) {
    return state.user ? true : false;
  },
  getStudio(state) {
    return state.studio;
  },
  getUsers(state) {
    return state.users;
  },
  getUserDetail(state) {
    return state.userDetail;
  },
};
export default getters;
