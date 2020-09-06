import apiAxios from '@/util/apiAxios';

export const getStaffsApi = () => apiAxios.get('/admin/staff');

export const saveStaffApi = (payload: any) =>
  apiAxios.post('/admin/staff', payload);

export const deleteStaffApi = (payload: any) =>
  apiAxios.post('/admin/staff', payload);

export const resetPasswordApi = (payload: any) =>
  apiAxios.post('/admin/staff/reset-password', payload);
