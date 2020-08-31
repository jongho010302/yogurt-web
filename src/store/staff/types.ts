import { Studio } from '../studio/types';
import { User } from '@/store/user/types';
import { BaseEntity } from '../types';

export interface Staff extends BaseEntity {
  user: User;
  hiredAt: string;
  introduce: string;
  isMonDayOff: boolean;
  monWorkingStartTime: string;
  monWorkingEndTime: string;
  isTueDayOff: boolean;
  tueWorkingStartTime: string;
  tueWorkingEndTime: string;
  isWedDayOff: boolean;
  wedWorkingStartTime: string;
  wedWorkingEndTime: string;
  isThuDayOff: boolean;
  thuWorkingStartTime: string;
  thuWorkingEndTime: string;
  isFriDayOff: boolean;
  friWorkingStartTime: string;
  friWorkingEndTime: string;
  isSatDayOff: boolean;
  satWorkingStartTime: string;
  satWorkingEndTime: string;
  isSunDayOff: boolean;
  sunWorkingStartTime: string;
  sunWorkingEndTime: string;
}

export interface StaffState {
  staffs: Staff[] | null;
}
