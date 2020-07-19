import { Staff } from '../staff/types';

export interface LessonType {
  id: number;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: number;
  lessonName: string;
  lessonDate: string;
  attendedCount: string;
  totalCount: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  lessonType: LessonType;
  staff: Staff;
}

export interface LessonState {
  lessons: Lesson[];
}