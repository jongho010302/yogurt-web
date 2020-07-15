export interface Staff {
  staffTypeId: string;
  name: string;
  phone: string;
  introduce: string;
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
  staffList: Staff[];
}