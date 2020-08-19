import { MutationTree } from 'vuex';
import { StudioState } from './types';

const mutations: MutationTree<StudioState> = {
  saveStudios(state, payload) {
    state.studios = payload;
  },
};

export default mutations;
