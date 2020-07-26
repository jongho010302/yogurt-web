import { ActionTree } from 'vuex';
import { makeRequest } from '@/util';
import { UserState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<UserState, any> = {
  async getUsers({ commit, rootState }) {
    try {
      const res = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/user`, null, {
        Authorization: rootState.auth.jwtToken
      });
      commit('getUsers', res.data);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
