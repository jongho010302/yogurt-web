import client from '@/api/client';
import { ApiResponse } from '@/types';

export const getStaffsApi = (): Promise<ApiResponse> =>
  client.get('/admin/staffs');

export const saveStaffApi = (payload: any): Promise<ApiResponse> =>
  client.post('/admin/staffs', payload);

export const deleteStaffApi = (payload: any): Promise<ApiResponse> =>
  client.post('/admin/staffs', payload);

export const resetPasswordApi = (payload: any): Promise<ApiResponse> =>
  client.post('/admin/staffs/reset-password', payload);
