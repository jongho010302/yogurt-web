import { MutationTree } from 'vuex';
import { Studio } from '../studio/types';
import { UserState, User, UsersData } from './types';

const mutations: MutationTree<UserState> = {
  saveUser(state, payload: User) {
    state.user = payload;
  },
  saveStudio(state, payload: Studio) {
    state.studio = payload;
  },
  saveUsers(state, payload: UsersData) {
    state.users = payload;
  },
  saveUserDetail(state, payload: User) {
    state.userDetail = payload;
  },
};

export default mutations;
