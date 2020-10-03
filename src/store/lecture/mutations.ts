import { MutationTree } from 'vuex';
import { LectureState, Lecture } from './types';

const mutations: MutationTree<LectureState> = {
  saveLectures(state, payload: Lecture[]) {
    state.lectures = payload;
  },
};

export default mutations;
