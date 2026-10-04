import { apiClient } from '@/shared/api';

import type {
  AdminUsersResponse,
  GetAdminUsersParams,
} from '@/pages/users/model/types';

export function getAdminUsers({ page, pageSize }: GetAdminUsersParams) {
  const limit = pageSize;

  const offset = (page - 1) * pageSize;

  const searchParams = new URLSearchParams({
    limit: String(limit),

    offset: String(offset),
  });

  return apiClient<AdminUsersResponse>(
    `/api/admin/users?${searchParams.toString()}`,
  );
}
