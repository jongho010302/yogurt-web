import { Studio } from '../studio/types';

export interface Ticket {
  id: number;
  studio: Studio;
  classType: ClassType;
  title: string;
  price: number;
  availableDays: number;
  isSelling: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ClassType {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export interface TicketState {
  tickets: Ticket[] | null;
  ticket: Ticket | null;
}
