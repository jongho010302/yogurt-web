import { GetterTree } from 'vuex';
import { LectureState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LectureState, RootState> = {
  getLectures(state): any {
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

    const lectures = state.lectures?.map((lecture) => {
      const lectureDay = week[new Date(lecture.startAt).getDay()];
      const lectureAt = `${lecture.startAt.split(' ')[0]} ${lectureDay} ${
        lecture.startAt.split(' ')[1]
      } ~ ${lecture.endAt.split(' ')[1]}`;

      return {
        lectureAt: lectureAt,
        instructor: lecture.staff.user.name,
        lectureType: lecture.course.classType,
        title: lecture.title,
        entry: `${lecture.maxTrainee}/${lecture.minTrainee}`,
        bookingEndAt: lecture.bookingEndAt,
        bookingCancelEndAt: lecture.bookingCancelEndAt,
        bookingChangeEndAt: lecture.bookingChangeEndAt,
      };
    });
    return lectures;
  },
};

export default getters;
