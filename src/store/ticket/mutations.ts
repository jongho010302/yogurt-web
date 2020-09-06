import { MutationTree } from 'vuex';
import { TicketState, TicketsData, TicketData } from './types';

const mutations: MutationTree<TicketState> = {
  saveTickets(state, payload: TicketsData) {
    state.tickets = payload;
  },
  saveTicket(state, payload: TicketData) {
    state.ticket = payload;
  },
};

export default mutations;
