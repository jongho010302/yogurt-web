import { UserState } from '@/store/user/types';
import { TicketState } from '@/store/ticket/types';
import { StudioState } from '@/store/studio/types';
import { StaffState } from '@/store/staff/types';
import { LectureState } from '@/store/lecture/types';
import { CourseState } from './course/types';

export interface RootState {
  user: UserState;
  ticket: TicketState;
  studio: StudioState;
  staff: StaffState;
  lecture: LectureState;
  course: CourseState;
}

export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export enum AsyncStatus {
  INIT = 'INIT',
  WAITING = 'WAITING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}
