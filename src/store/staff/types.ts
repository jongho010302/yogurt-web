import { Studio } from '../studio/types';

export interface Staff {
  id: number;
  studio: Studio;
  phone: string;
  staffTypeId: string;
  name: string;
  introduce: string;
  profileUrl: string;
  isMonHoliday: number;
  monWorkingStartTime: string;
  monWorkingEndTime: string;
  isTueHoliday: number;
  tueWorkingStartTime: string;
  tueWorkingEndTime: string;
  isWedHoliday: number;
  wedWorkingStartTime: string;
  wedWorkingEndTime: string;
  isThuHoliday: number;
  thuWorkingStartTime: string;
  thuWorkingEndTime: string;
  isFriHoliday: number;
  friWorkingStartTime: string;
  friWorkingEndTime: string;
  isSatHoliday: number;
  satWorkingStartTime: string;
  satWorkingEndTime: string;
  isSunHoliday: number;
  sunWorkingStartTime: string;
  sunWorkingEndTime: string;
}

export interface StaffState {
  staffs: Staff[];
}