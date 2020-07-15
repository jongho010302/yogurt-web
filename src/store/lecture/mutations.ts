import { MutationTree } from 'vuex';
import { LectureState, Lecture } from './types';

const mutations: MutationTree<LectureState> = {
  loadLectureList(state, payload: Lecture[]) {
    state.lectureList = payload;
  },
};

export default mutations;
