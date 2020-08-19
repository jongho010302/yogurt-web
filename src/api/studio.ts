import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const getStudiosApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/studio`);

export const saveStudioApi = (payload: any) =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/studio`, payload);
