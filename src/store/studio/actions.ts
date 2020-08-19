import { ActionTree } from 'vuex';
import { StudioState } from './types';
import { getStudiosApi, saveStudioApi } from '@/api/studio';

const actions: ActionTree<StudioState, any> = {
  async getStudios({ commit }) {
    try {
      const res = await getStudiosApi();

      commit('saveStudios', res.data);
    } catch (err) {
      throw err;
    }
  },
  async saveStudio({ commit }, payload) {
    try {
      await saveStudioApi(payload);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
