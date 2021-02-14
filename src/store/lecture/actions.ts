import { ActionTree } from 'vuex';
import { LectureState } from './types';
import { AsyncStatus, RootState } from '../types';
import { getLecturesApi } from '@/api/lecture';

const actions: ActionTree<LectureState, RootState> = {
  async getLectures({ commit }, { startAt, endAt }) {
    try {
      commit('saveLecturesState', AsyncStatus.WAITING);
      const res = await getLecturesApi(startAt, endAt);
      commit('saveLecturesData', res.data);
      commit('saveLecturesState', AsyncStatus.SUCCESS);
    } catch (err) {
      commit('saveLecturesState', AsyncStatus.FAILURE);
      throw err;
    }
  },
};

export default actions;
