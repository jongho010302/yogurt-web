import client from '@/api/client';

export const getCourseApi = (startAt: string, endAt: string) =>
  client.get(`/member/lectures?start_at=${startAt}&end_at=${endAt}`);
