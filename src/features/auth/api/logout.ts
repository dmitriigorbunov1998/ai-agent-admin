import { apiClient } from '@/shared/api';

export function logout() {
  return apiClient<void>('/api/v1/admin/auth/logout', {
    method: 'POST',
  });
}
