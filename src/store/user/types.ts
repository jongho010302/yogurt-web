import { Studio } from '../studio/types';
import { BaseEntity } from '../types';
import { Ticket } from '../ticket/types';

export interface User extends BaseEntity {
  studio: Studio;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  profileUrl: string;
  roles: Role[];
  userTickets: UserTicket[];
}

export interface UserTicket extends BaseEntity {
  maxCancel: number;
  maxCoupon: number;
  remainingCancel: number;
  remainingCoupon: number;
  startDate: string;
  endDate: string;
  ticket: Ticket;
}

export enum Role {
  'ROLE_DEVELOPER' = 'ROLE_DEVELOPER',
  'ROLE_OWNER' = 'ROLE_OWNER',
  'ROLE_MANAGER' = 'ROLE_MANAGER',
  'ROLE_STAFF' = 'ROLE_STAFF',
  'ROLE_STUDENT' = 'ROLE_STUDENT',
}

export interface UserState {
  user: User | null;
  jwtToken: string | null;
  maskingUsernames: string[] | null;
  users: User[] | null;
}
