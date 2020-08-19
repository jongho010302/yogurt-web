import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const getTicketsApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/ticket`);

export const getTicketApi = (id: number) =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/ticket/${id}`);

export const saveTicketApi = (payload: any) =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/ticket`, payload);
