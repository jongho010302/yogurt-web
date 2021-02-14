import client from '@/api/client';

export const getStaffsApi = () => client.get('/admin/staffs');

export const saveStaffApi = (payload: any) =>
  client.post('/admin/staffs', payload);

export const deleteStaffApi = (payload: any) =>
  client.post('/admin/staffs', payload);

export const resetPasswordApi = (payload: any) =>
  client.post('/admin/staffs/reset-password', payload);
