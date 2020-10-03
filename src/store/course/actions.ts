import { ActionTree } from 'vuex';
import { CourseState } from './types';
import { RootState } from '../types';
import { createCoursesApi } from '@/api/course';

const actions: ActionTree<CourseState, RootState> = {
  async saveCourses(
    none,
    {
      studioId,
      staffId,
      classType,
      title,
      description,
      maxTrainee,
      minTrainee,
      startDate,
      endDate,
      bookingEndTime,
      bookingCancelEndTime,
      bookingChangeEndTime,
      hasMonClass,
      monClassStartTime,
      monClassEndTime,
      hasTueClass,
      tueClassStartTime,
      tueClassEndTime,
      hasWedClass,
      wedClassStartTime,
      wedClassEndTime,
      hasThuClass,
      thuClassStartTime,
      thuClassEndTime,
      hasFriClass,
      friClassStartTime,
      friClassEndTime,
      hasSatClass,
      satClassStartTime,
      satClassEndTime,
      hasSunClass,
      sunClassStartTime,
      sunClassEndTime,
    },
  ) {
    try {
      await createCoursesApi(
        studioId,
        staffId,
        classType,
        title,
        description,
        maxTrainee,
        minTrainee,
        startDate,
        endDate,
        bookingEndTime,
        bookingCancelEndTime,
        bookingChangeEndTime,
        hasMonClass,
        monClassStartTime,
        monClassEndTime,
        hasTueClass,
        tueClassStartTime,
        tueClassEndTime,
        hasWedClass,
        wedClassStartTime,
        wedClassEndTime,
        hasThuClass,
        thuClassStartTime,
        thuClassEndTime,
        hasFriClass,
        friClassStartTime,
        friClassEndTime,
        hasSatClass,
        satClassStartTime,
        satClassEndTime,
        hasSunClass,
        sunClassStartTime,
        sunClassEndTime,
      );
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
