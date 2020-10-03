import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import lecture from './lecture';
import user from './user';
import ticket from './ticket';
import staff from './staff';
import { UserState } from './user/types';
import { TicketState } from './ticket/types';
import studio from './studio';
import { StudioState } from './studio/types';
import { StaffState } from './staff/types';
import { LectureState } from './lecture/types';
import course from './course';
import { CourseState } from './course/types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    lecture: lecture.state as LectureState,
    course: course.state as CourseState,
    staff: staff.state as StaffState,
    studio: studio.state as StudioState,
    ticket: ticket.state as TicketState,
    user: user.state as UserState,
  },
  modules: {
    lecture,
    course,
    user,
    ticket,
    staff,
  },
};

export default new Vuex.Store<RootState>(store);
