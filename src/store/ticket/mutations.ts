import { MutationTree } from 'vuex';
import { TicketState, Ticket } from './types';

const mutations: MutationTree<TicketState> = {
  saveTickets(state, payload: Ticket[]) {
    state.tickets = payload;
  },
  saveTicket(state, payload: Ticket) {
    state.ticket = payload;
  },
};

export default mutations;
