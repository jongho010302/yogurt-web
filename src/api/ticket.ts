import client from '@/api/client';
import { ClassType } from '@/store/ticket/types';
import { ApiResponse } from '@/types';

export const getTicketsApi = (
  isSelling: boolean | '',
  classType: ClassType,
): Promise<ApiResponse> =>
  client.get(`/admin/tickets?isSelling=${isSelling}&classType=${classType}`);

export const getTicketApi = (id: number): Promise<ApiResponse> =>
  client.get(`/admin/tickets/${id}`);

export const saveTicketApi = (payload: any): Promise<ApiResponse> =>
  client.post('/admin/tickets', payload);
