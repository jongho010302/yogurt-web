import { GetterTree } from 'vuex';
import { AuthState } from './types';
import { RootState } from '../types';

const getters: GetterTree<AuthState, RootState> = {
  getJwtToken(state): string {
    return state.jwtToken;
  },
  getUser(state): any {
    return state.user;
  }
};

export default getters;
