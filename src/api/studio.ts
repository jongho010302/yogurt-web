import client from '@/api/client';

export const getStudiosApi = () => client.get('/admin/studio');

export const saveStudioApi = (payload: any) =>
  client.post('/admin/studio', payload);
