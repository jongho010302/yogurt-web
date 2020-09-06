import { Studio } from '../studio/types';
import { BaseEntity, AsyncStatus } from '../types';
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

export interface UsersData {
  data: User[] | null;
  status: AsyncStatus;
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
  maskingUsernames: string[] | null;
  users: UsersData
  userDetail: User | null;
}
