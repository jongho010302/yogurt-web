import { Notification } from 'element-ui';

export const yogurtConfirm = (message: string) => window.confirm(message);

export const positiveAlert = (message: string) =>
  Notification({
    title: '성공',
    message: message,
    type: 'success',
  });

export const infoAlert = (message: string) =>
  Notification.info({
    title: '정보',
    message: message,
  });

export const warningAlert = (message: string) =>
  Notification({
    title: '경고',
    message: message,
    type: 'warning',
  });

export const errorAlert = (message: string) =>
  Notification.error({
    title: '에러',
    message: message,
  });
