import { GetterTree } from 'vuex';
import { StudioState, Studio } from './types';
import { RootState } from '../types';

const getters: GetterTree<StudioState, RootState> = {
  getStudios(state) {
    return state.studios;
  },
};

export default getters;
