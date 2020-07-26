import { GetterTree } from 'vuex';
import { LessonState } from './types';
import { RootState } from '../types';

const getters: GetterTree<LessonState, RootState> = {
  getLessons(state): any {
    const lessons = [];

    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

    for(const lesson of state.lessons) {
      const lessonDay = week[new Date(lesson.lessonDate).getDay()];
      
      lessons.push({
        name: `${lesson.lessonDate} ${lessonDay} ${lesson.startTime}~${lesson.endTime}`,
        instructor: lesson.staff.user.name,
        lessonType: lesson.lessonType.name,
        lessonName: lesson.lessonName,
        entry: `${lesson.attendedCount}/${lesson.totalCount}`,
        reservationTime: '',
        cancelTime: '',
      });
    }
    return lessons;
  },
};

export default getters;
