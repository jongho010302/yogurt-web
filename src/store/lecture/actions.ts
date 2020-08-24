import { ActionTree } from 'vuex';
import axios from 'axios';
import { LectureState } from './types';
import { RootState } from '../types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<LectureState, RootState> = {
  async loadLectures({ commit }, { lectureDate, lectureType }) {
    try {
      const response = await axios.get(
        `${VUE_APP_MY_BACK_URL}/api/lecture?lectureDate=${lectureDate}&lectureType=${lectureType}`,
      );
      const payload = response && response.data;
      commit('loadLectures', payload);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
