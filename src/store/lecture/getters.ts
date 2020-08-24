import { GetterTree } from 'vuex';
import { LectureState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LectureState, RootState> = {
  getLectures(state): any {
    if (!state) {
      return null;
    }

    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

    const lectures = state.lectures?.map((lecture) => {
      const lectureDay = week[new Date(lecture.lectureDate).getDay()];

      return {
        name: `${lecture.lectureDate} ${lectureDay} ${lecture.startTime}~${lecture.endTime}`,
        instructor: lecture.staff.user.name,
        lectureType: lecture.lectureType.name,
        lectureName: lecture.lectureName,
        entry: `${lecture.attendedCount}/${lecture.totalCount}`,
        reservationTime: '',
        cancelTime: '',
      };
    });
    return lectures;
  },
};

export default getters;
