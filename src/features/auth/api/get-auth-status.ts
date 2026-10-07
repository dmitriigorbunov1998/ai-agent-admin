import { apiClient } from '@/shared/api';

import type { AuthStatus } from '@/features/auth/model/types.ts';

export function getAuthStatus() {
  return apiClient<AuthStatus>('/api/admin/auth/status');
}
