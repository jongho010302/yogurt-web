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

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
    ticketStyle: 'background-image: linear-gradient(#4485F7, #A7C5F9)',
    lecture: lecture.state as LectureState,
    staff: staff.state as StaffState,
    studio: studio.state as StudioState,
    ticket: ticket.state as TicketState,
    user: user.state as UserState,
  },
  modules: {
    lecture,
    user,
    ticket,
    staff,
  },
};

export default new Vuex.Store<RootState>(store);
