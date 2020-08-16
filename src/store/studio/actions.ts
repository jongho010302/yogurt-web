import { ActionTree } from 'vuex';
import { StudioState } from './types';
import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StudioState, any> = {
  async saveStudio({ commit, rootState }, { username, password }) {
    try {
      const response = await makeRequest(
        'post',
        `${VUE_APP_MY_BACK_URL}/auth/log-in`,
        {
          username,
          password,
        },
      );

      const payload = response && response.data;
      commit('logIn', payload);
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
};

export default actions;
