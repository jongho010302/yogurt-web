import { ActionTree } from 'vuex';
import { LectureState } from './types';
import { RootState } from '../types';
import { getCourseApi } from '@/api/lecture';

const actions: ActionTree<LectureState, RootState> = {
  async getLectures({ commit }, { startAt, endAt }) {
    try {
      const { data } = await getCourseApi(startAt, endAt);
      commit('saveLectures', data.data);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
