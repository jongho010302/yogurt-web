import { MutationTree } from 'vuex';
import { UserState } from './types';

const mutations: MutationTree<UserState> = {
  saveUsers(state, payload) {
    state.users = payload;
  },
};

export default mutations;
