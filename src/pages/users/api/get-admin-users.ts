import { apiClient } from '@/shared/api';

import type {
  AdminUsersResponse,
  GetAdminUsersParams,
} from '@/pages/users/model/types.ts';

export function getAdminUsers({ page, pageSize, search }: GetAdminUsersParams) {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  return apiClient<AdminUsersResponse>(
    `/api/admin/users?${searchParams.toString()}`,
  );
}
