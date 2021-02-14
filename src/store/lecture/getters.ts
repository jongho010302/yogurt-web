import { GetterTree } from 'vuex';
import { LecturesData, LectureState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LectureState, RootState> = {
  getLectures(state): LecturesData {
    return state.lectures;
  },
};

export default getters;
