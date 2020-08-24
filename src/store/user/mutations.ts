import { MutationTree } from 'vuex';
import { UserState, User, Role } from './types';

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
    payload.forEach((item) => {
      item.role = item.roles[0].replace('ROLE_', '') as Role;
    });
    state.users = payload;
  },
};

export default mutations;
