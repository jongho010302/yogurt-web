import client from '@/api/client';
import { ClassType } from '@/store/ticket/types';

export const getTicketsApi = (isSelling: boolean | '', classType: ClassType) =>
  client.get(`/admin/tickets?isSelling=${isSelling}&classType=${classType}`);

export const getTicketApi = (id: number) => client.get(`/admin/tickets/${id}`);

export const saveTicketApi = (payload: any) =>
  client.post('/admin/tickets', payload);
