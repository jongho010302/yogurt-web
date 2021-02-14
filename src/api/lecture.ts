import client from '@/api/client';
import { ApiResponse } from '@/types';

export const getLecturesApi = (
  startAt: string,
  endAt: string,
): Promise<ApiResponse> =>
  client.get(`/admin/lectures?start_at=${startAt}&end_at=${endAt}`);
