import apiAxios from '@/util/apiAxios';

export const getTicketsApi = () => apiAxios.get('/admin/ticket');

export const getTicketApi = (id: number) => apiAxios.get(`/admin/ticket/${id}`);

export const saveTicketApi = (payload: any) =>
  apiAxios.post('/admin/ticket', payload);
