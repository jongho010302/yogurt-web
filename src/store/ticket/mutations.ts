import { MutationTree } from 'vuex';
import { TicketState, Ticket } from './types';

const mutations: MutationTree<TicketState> = {
  loadTicketList(state, payload: Ticket[]) {
    state.ticketList = payload;
  },
  loadTicketDetail(state, payload) {
    state.ticketDetail = payload;
  },
};

export default mutations;
