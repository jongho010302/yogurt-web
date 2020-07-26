import { GetterTree } from 'vuex';
import { UserState, User } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUsers(state): User[] {
    return state.users;
  }
};

export default getters;
