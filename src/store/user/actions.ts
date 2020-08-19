import { ActionTree } from 'vuex';
import { UserState } from './types';
import { getUsersApi } from '@/api/user';

const actions: ActionTree<UserState, any> = {
  async getUsers({ commit }) {
    try {
      const res = await getUsersApi();
      commit('saveUsers', res.data);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
