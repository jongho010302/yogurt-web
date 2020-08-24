import { UserState } from '@/store/user/types';
import { TicketState } from '@/store/ticket/types';
import { StudioState } from '@/store/studio/types';
import { StaffState } from '@/store/staff/types';
import { LectureState } from '@/store/lecture/types';

export interface RootState {
  version: string;
  ticketStyle: string;
  user: UserState;
  ticket: TicketState;
  studio: StudioState;
  staff: StaffState;
  lecture: LectureState;
}
