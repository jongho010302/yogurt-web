import {AuthState} from "@/store/auth/types";
import {UserState} from "@/store/user/types";
import {TicketState} from "@/store/ticket/types";
import {StudioState} from "@/store/studio/types";
import {StaffState} from "@/store/staff/types";
import {LessonState} from "@/store/lesson/types";

export interface RootState {
  version: string;
  primaryColor: string;
  ticketStyle: string;
  // auth: AuthState;
  // user: UserState
  // ticket: TicketState;
  // studio: StudioState;
  // staff: StaffState;
  // lesson: LessonState;
}
