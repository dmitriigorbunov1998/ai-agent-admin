import { apiClient } from '@/shared/api';

import type { AdminUserDetails } from '@/pages/user-details/model/types.ts';

export function getAdminUser(userId: number) {
  return apiClient<AdminUserDetails>(`/api/admin/users/${userId}`);
}
