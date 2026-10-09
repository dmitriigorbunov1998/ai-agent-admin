import { apiClient } from '@/shared/api';

import type {
  AdminUsersResponse,
  GetAdminUsersParams,
} from '@/pages/users/model/types';

export function getAdminUsers({ limit, offset }: GetAdminUsersParams) {
  const searchParams = new URLSearchParams({
    limit: String(limit),

    offset: String(offset),
  });

  return apiClient<AdminUsersResponse>(
    `/api/v1/admin/users?${searchParams.toString()}`,
  );
}
