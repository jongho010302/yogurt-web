import apiAxios from '@/util/apiAxios';

export const getStudiosApi = () => apiAxios.get('/admin/studio');

export const saveStudioApi = (payload: any) =>
  apiAxios.post('/admin/studio', payload);
