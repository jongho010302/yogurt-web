import { MutationTree } from 'vuex';
import { UserState, User, UsersData } from './types';

const mutations: MutationTree<UserState> = {
  saveUser(state, payload: any) {
    state.user = payload;
  },
  saveUsers(state, payload: UsersData) {
    state.users = payload;
  },
  saveUserDetail(state, payload: User) {
    state.userDetail = payload;
  },
};

export default mutations;
