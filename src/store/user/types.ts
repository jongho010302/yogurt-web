import { Studio } from '../studio/types';
import { BaseEntity, AsyncStatus } from '../types';
import { Ticket } from '../ticket/types';

export interface User extends BaseEntity {
  studio: Studio;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  profileUrl: string;
  roles: Role[];
  tickets: UserTicket[];
}

export interface UsersData {
  data: UsersResponse[] | null;
  status: AsyncStatus;
}

export interface UsersResponse {
  id: number;
  email: string;
  authType: string;
  name: string;
  phone: string;
  profileUrl: string;
  createdAt: string;
  ticketTitle: string;
  maxCoupon: number;
  remainingCoupon: number;
  startDate: string;
  endDate: string;
  role: string;
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
  studio: Studio | null;
  users: UsersData;
  userDetail: User | null;
}
