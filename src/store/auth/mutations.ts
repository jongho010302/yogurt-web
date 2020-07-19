import { MutationTree } from 'vuex';
import { AuthState } from './types';

const mutations: MutationTree<AuthState> = {
  handleLogin(state, payload: any) {
    state.user = payload.user;
    state.jwtToken = payload.jwtToken;
  },
  handleLogout(state) {
    state.user = null;
  },
};

export default mutations;
