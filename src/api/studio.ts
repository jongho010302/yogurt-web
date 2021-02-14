import client from '@/api/client';
import { ApiResponse } from '@/types';

export const getStudiosApi = () => client.get('/admin/studio');

export const saveStudioApi = (payload: any): Promise<ApiResponse> =>
  client.post('/admin/studio', payload);
