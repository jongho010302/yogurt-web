import { GetterTree } from 'vuex';
import { TicketState } from './types';
import { RootState } from '../types';

const getters: GetterTree<TicketState, RootState> = {
  getTicketList(state): any {
    return state.ticketList;
  },
  getTicketDetail(state): any {
    return state.ticketDetail;
  },
};

export default getters;
