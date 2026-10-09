import { apiClient } from '@/shared/api';

import type { AuthResponse } from '../model/types';

export function getMe() {
  return apiClient<AuthResponse>('/api/v1/admin/auth/me', {
    skipUnauthorizedEvent: true,
  });
}
