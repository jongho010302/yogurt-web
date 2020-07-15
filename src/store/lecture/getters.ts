import { GetterTree } from 'vuex';
import { LectureState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LectureState, RootState> = {
  getLectureList(state): any {
    const lectureList = [];

    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

    for(const lecture of state.lectureList) {
      const lessonDay = week[new Date(lecture.lectureDate).getDay()];
      
      lectureList.push({
        name: `${lecture.lectureDate} ${lessonDay} ${lecture.startTime}~${lecture.endTime}`,
        instructor: lecture.staff.name,
        lectureType: lecture.lectureType.name,
        lectureName: lecture.lectureName,
        entry: `${lecture.attendedCount}/${lecture.totalCount}`,
        reservationTime: '',
        cancelTime: '',
      });
    }
    return lectureList;
  },
};

export default getters;
