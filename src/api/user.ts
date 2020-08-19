import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const getUsersApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/user`);
