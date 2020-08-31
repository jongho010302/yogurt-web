import { Staff } from '../staff/types';
import { BaseEntity } from '../types';

export interface LectureType {
  id: number;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lecture extends BaseEntity {
  lectureName: string;
  lectureDate: string;
  attendedCount: string;
  totalCount: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  lectureType: LectureType;
  staff: Staff;
}

export interface LectureState {
  lectures: Lecture[] | null;
}
