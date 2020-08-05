import { Studio } from '../studio/types';

export interface Ticket {
  id: number;
  studio: Studio;
  ticketType: TicketType;
  classType: ClassType;
  title: string;
  price: number;
  availableDays: number;
  isSelling: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketType {
  TIME = 'TIME',
  CLASS_TYPE = 'PERIOD'
}

export enum ClassType {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE'
}

export interface TicketState {
  tickets: Ticket[];
  ticket: Ticket | null;
}
