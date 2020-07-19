import { ActionTree } from 'vuex';
import axios from 'axios';
import { LessonState } from './types';
import { RootState } from '../types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<LessonState, RootState> = {
  async loadLessons({ commit }, { lessonDate, lessonType }) {
    try {
      const response = await axios.get(`${VUE_APP_MY_BACK_URL}/api/lesson?lessonDate=${lessonDate}&lessonType=${lessonType}`);
      const payload = response && response.data;
      commit('loadLessons', payload);
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
