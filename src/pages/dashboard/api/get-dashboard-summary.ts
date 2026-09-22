import { apiClient } from '@/shared/api';

import type { DashboardSummary } from '../model/types';

export function getDashboardSummary() {
  return apiClient<DashboardSummary>('/api/admin/dashboard');
}
