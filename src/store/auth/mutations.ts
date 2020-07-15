import { MutationTree } from 'vuex';
import { LoginState } from './types';

const mutations: MutationTree<LoginState> = {
  handleLogin(state, payload: any) {
    state.user = payload.data.user;
    state.jwtToken = payload.data.jwtToken;
  },
  handleLogout(state) {
    state.user = {};
  },
};

export default mutations;
