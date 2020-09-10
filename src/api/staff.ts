import client from '@/api/client';

export const getStaffsApi = () => client.get('/admin/staff');

export const saveStaffApi = (payload: any) =>
  client.post('/admin/staff', payload);

export const deleteStaffApi = (payload: any) =>
  client.post('/admin/staff', payload);

export const resetPasswordApi = (payload: any) =>
  client.post('/admin/staff/reset-password', payload);
