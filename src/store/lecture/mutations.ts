import { MutationTree } from 'vuex';
import { LectureState, Lecture } from './types';

const mutations: MutationTree<LectureState> = {
  loadLectures(state, payload: Lecture[]) {
    state.lectures = payload;
  },
};

export default mutations;
