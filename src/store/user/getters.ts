import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUser(state) {
    return state.user;
  },
  getJwtToken(state) {
    return state.jwtToken;
  },
  getMaskingUsernames(state) {
    return state.maskingUsernames;
  },
  getUsers(state) {
    return state.users;
  },
};
export default getters;
