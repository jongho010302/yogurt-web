import client from '@/api/client';

export const getCourseApi = (startAt: string, endAt: string) =>
  client.get(`/admin/lectures?start-at=${startAt}&end-at=${endAt}`);
