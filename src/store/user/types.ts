import { Studio } from '../studio/types';
import { Staff } from '../staff/types';

export interface User {
  studio: Studio;
  staff: Staff;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  profileUrl: string;
  roles: 'ROLE_DEVELOPER' | 'ROLE_OWNER' | 'ROLE_MANAGER' | 'ROLE_STAFF' | 'ROLE_STUDENT'
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: User[];
}