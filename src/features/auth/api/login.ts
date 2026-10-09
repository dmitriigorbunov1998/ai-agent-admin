import { apiClient } from '@/shared/api';

import type { AuthResponse, LoginPayload } from '@/features/auth/model/types';

export function login(payload: LoginPayload) {
  return apiClient<AuthResponse>('/api/v1/admin/auth/login', {
    method: 'POST',

    skipUnauthorizedEvent: true,

    body: JSON.stringify(payload),
  });
}
