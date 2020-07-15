import { GetterTree } from 'vuex';
import { LoginState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LoginState, RootState> = {
  getJwtToken(state): string {
    return state.jwtToken;
  },
  getUser(state): any {
    return state.user;
  }
};

export default getters;
