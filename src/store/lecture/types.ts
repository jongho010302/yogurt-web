import { Course } from '../course/types';
import { Staff } from '../staff/types';
import { BaseEntity } from '../types';

export interface Lecture extends BaseEntity {
  title: string;
  bookingCancelEndAt: string;
  bookingChangeEndAt: string;
  bookingEndAt: string;
  course: Course;
  description: string;
  endAt: string;
  maxTrainee: number;
  minTrainee: number;
  staff: Staff;
  startAt: string;
}

export interface LectureState {
  lectures: Lecture[] | null;
}
