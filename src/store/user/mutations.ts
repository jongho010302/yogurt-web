import { MutationTree } from 'vuex';
import { UserState, User } from './types';

const mutations: MutationTree<UserState> = {
  saveUser(state, payload: any) {
    state.user = payload;
  },
  saveJwtToken(state, payload: any) {
    state.jwtToken = payload;
  },
  saveMaskingUsernames(state, payload: string[]) {
    state.maskingUsernames = payload;
  },
  saveUsers(state, payload: User[]) {
    state.users = payload;
  },
  saveUserDetail(state, payload: User) {
    state.userDetail = payload;
  },
};

export default mutations;
