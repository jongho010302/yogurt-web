import { MutationTree } from 'vuex';
import { User, UserState, Role } from './types';

const mutations: MutationTree<UserState> = {
  saveUsers(state, payload: User[]) {
    payload.forEach((item) => {
      item.role = item.roles[0].replace('ROLE_', '') as Role;
    });
    state.users = payload;
  },
};

export default mutations;
