import { makeRequest } from '@/util/common';

const { VUE_APP_MY_BACK_URL } = process.env;

export const getStaffsApi = () =>
  makeRequest('get', `${VUE_APP_MY_BACK_URL}/admin/staff`);

export const saveStaffApi = (payload: any) =>
  makeRequest('post', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload);

export const deleteStaffApi = (payload: any) =>
  makeRequest('delete', `${VUE_APP_MY_BACK_URL}/admin/staff`, payload);

export const resetPasswordApi = (payload: any) =>
  makeRequest(
    'post',
    `${VUE_APP_MY_BACK_URL}/admin/staff/reset-password`,
    payload,
  );
