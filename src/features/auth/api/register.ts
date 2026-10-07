import { apiClient } from '@/shared/api';

import type { AuthResponse, RegisterPayload } from '../model/types';

export function register(payload: RegisterPayload) {
  return apiClient<AuthResponse>('/api/admin/auth/register', {
    method: 'POST',

    body: JSON.stringify(payload),
  });
}
