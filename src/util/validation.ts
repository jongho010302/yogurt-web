import { warningAlert } from '@/util/ui';

export const validateParam = (value: any, message: string) => {
  if (!value) {
    warningAlert(message);
    throw new Error();
  }
};
