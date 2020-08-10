import { MutationTree } from 'vuex';
import { AuthState } from './types';

const mutations: MutationTree<AuthState> = {
  saveUser(state, payload: any) {
    state.user = payload;
  },
  saveJwtToken(state, payload: string) {
    state.jwtToken = payload;
  },
};

export default mutations;
