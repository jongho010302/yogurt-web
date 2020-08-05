import { GetterTree } from 'vuex';
import { UserState, User } from './types';
import { RootState } from '../types';

const getters: GetterTree<UserState, RootState> = {
  getUsers(state): User[] {
    // User Page 에서 뿌려주기 위해 ROLE_ 라는 값은 없애준다.
    // if (state.users.length) {
    //   state.users.forEach((user, index1) => {
    //     user.roles.forEach((role, index2) => {
    //       state.users[index1].roles[index2] = role.replace('ROLE_', '') as Role;
    //     });
    //   });
    // }
    return state.users;
  },
};

export default getters;
