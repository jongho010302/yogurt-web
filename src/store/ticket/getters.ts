import { GetterTree } from 'vuex';
import { TicketState } from './types';
import { RootState } from '../types';

const getters: GetterTree<TicketState, RootState> = {
  getTickets(state): any {
    return state.tickets;
  },
  getTicket(state): any {
    return state.ticket;
  },
};

export default getters;
