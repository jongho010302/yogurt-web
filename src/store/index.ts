import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import lecture from './lecture';
import user from './user';
import ticket from './ticket';
import staff from './staff';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
    ticketStyle: 'background-image: linear-gradient(#4485F7, #A7C5F9)',
    lecture: {
      lectures: null,
    },
    staff: {
      staffs: null,
    },
    studio: {
      studios: null,
    },
    ticket: {
      ticket: null,
      tickets: null,
    },
    user: {
      jwtToken: null,
      maskingUsernames: null,
      user: null,
      users: null,
    },
  },
  modules: {
    lecture,
    user,
    ticket,
    staff,
  },
};

export default new Vuex.Store<RootState>(store);
