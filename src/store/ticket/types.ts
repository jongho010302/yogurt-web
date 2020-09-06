import { Studio } from '../studio/types';
import { BaseEntity, AsyncStatus } from '../types';

export interface Ticket extends BaseEntity {
  studio: Studio;
  classType: ClassType;
  title: string;
  price: number;
  availableDays: number;
  isSelling: boolean;
}

export interface TicketsData {
  data: Ticket[] | null;
  status: AsyncStatus;
}

export interface TicketData {
  data: Ticket | null;
  status: AsyncStatus;
}

export enum ClassType {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export interface TicketState {
  tickets: TicketsData;
  ticket: TicketData
}
