import apiAxios from '@/api/client';

export const getStudiosApi = () => apiAxios.get('/admin/studio');

export const saveStudioApi = (payload: any) =>
  apiAxios.post('/admin/studio', payload);
