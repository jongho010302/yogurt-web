import { Notify } from 'quasar';

export const yogurtConfirm = (message: string) => window.confirm(message);

export const positiveAlert = (message: string) =>
  Notify.create({
    type: 'positive',
    message: message,
  });

export const infoAlert = (message: string) =>
  Notify.create({
    type: 'info',
    message: message,
  });

export const warningAlert = (message: string) =>
  Notify.create({
    type: 'warning',
    message: message,
  });

export const errorAlert = (message: string) =>
  Notify.create({
    type: 'negative',
    message: message,
  });
