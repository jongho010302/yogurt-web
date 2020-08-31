import { BaseEntity } from '../types';

export interface Studio extends BaseEntity {
  name: string;
  telNo: string;
  addr1: string;
  addr2: string;
  regAt: string;
}

export interface StudioState {
  studios: Studio[] | null;
}
