import { MutationTree } from 'vuex';
import { UserState } from './types';

const mutations: MutationTree<UserState> = {
  getUsers(state, payload) {
    state.users = payload;
  },
};

export default mutations;
