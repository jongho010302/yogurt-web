import { ActionTree } from 'vuex';
import { makeRequest } from '@/util';
import { UserState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;


const actions: ActionTree<UserState, any> = {
  async loadUsers({ commit, rootState }) {
    const res = await makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/user`, null, {
      Authorization: rootState.auth.jwtToken
    });
    commit('loadUsers', res.data);
  },
};

export default actions;
