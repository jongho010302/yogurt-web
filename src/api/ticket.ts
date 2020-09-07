import apiAxios from '@/util/apiAxios';
import { ClassType } from '@/store/ticket/types';

export const getTicketsApi = (isSelling: boolean | '', classType: ClassType) =>
  apiAxios.get(`/admin/ticket?isSelling=${isSelling}&classType=${classType}`);

export const getTicketApi = (id: number) => apiAxios.get(`/admin/ticket/${id}`);

export const saveTicketApi = (payload: any) =>
  apiAxios.post('/admin/ticket', payload);
