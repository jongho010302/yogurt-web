import { ActionTree } from 'vuex';
import { StudioState } from './types';
import { getStudiosApi } from '@/api/studio';
import { RootState } from '../types';

const actions: ActionTree<StudioState, RootState> = {
  async getStudios({ commit }) {
    try {
      const res = await getStudiosApi();
      commit('saveStudios', res.data);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
