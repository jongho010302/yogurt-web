import { MutationTree } from 'vuex';
import { LessonState, Lesson } from './types';

const mutations: MutationTree<LessonState> = {
  loadLessons(state, payload: Lesson[]) {
    state.lessons = payload;
  },
};

export default mutations;
