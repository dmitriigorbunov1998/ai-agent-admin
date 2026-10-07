import { apiClient } from '@/shared/api';

import type {
  AuthResponse,
  LoginPayload,
} from '@/features/auth/model/types.ts';

export function login(payload: LoginPayload) {
  return apiClient<AuthResponse>('/api/admin/auth/login', {
    method: 'POST',

    body: JSON.stringify(payload),
  });
}
