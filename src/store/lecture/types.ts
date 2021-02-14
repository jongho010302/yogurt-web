import { AsyncStatus, BaseEntity } from '../types';

export interface LecturesData {
  data: Lecture[];
  status: AsyncStatus;
}

export interface Lecture extends BaseEntity {
  title: string;
  classType: string;
  lectureAt: string;
  entry: string;
  bookingEndAt: string;
  bookingCancelEndAt: string;
  bookingChangeEndAt: string;
  staffName: string;
}

export interface LectureState {
  lectures: LecturesData;
}
