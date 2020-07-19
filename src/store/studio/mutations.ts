import { MutationTree } from 'vuex';
import { StudioState } from './types';

const mutations: MutationTree<StudioState> = {
  saveStudio(state, payload) {
    state.studios = payload;
  },
};

export default mutations;
