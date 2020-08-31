import { Studio } from '../studio/types';
import { BaseEntity } from '../types';

export interface Ticket extends BaseEntity {
  studio: Studio;
  classType: ClassType;
  title: string;
  price: number;
  availableDays: number;
  isSelling: boolean;
}

export enum ClassType {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export interface TicketState {
  tickets: Ticket[] | null;
  ticket: Ticket | null;
}
