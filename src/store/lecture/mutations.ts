import { MutationTree } from 'vuex';
import { AsyncStatus } from '../types';
import { LectureState, Lecture } from './types';

const mutations: MutationTree<LectureState> = {
  saveLecturesData(state, payload: Lecture[]) {
    state.lectures.data = payload;
  },
  saveLecturesState(state, payload: AsyncStatus) {
    state.lectures.status = payload;
  },
};

export default mutations;
