import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUsers(state): any {
    return state.users;
  }
};

export default getters;
