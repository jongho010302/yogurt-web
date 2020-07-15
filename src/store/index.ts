import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import lecture from './lecture';
import user from './user';
import ticket from './ticket';
import staff from './staff';
import auth from './auth';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
    primaryColor: 'primary',
    ticketStyle: 'background-image: linear-gradient(#4485F7, #A7C5F9)',
  },
  modules: {
    lecture,
    user,
    ticket,
    staff,
    auth
  },
};

export default new Vuex.Store<RootState>(store);
