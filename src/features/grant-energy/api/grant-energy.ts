import { apiClient } from '@/shared/api';

import type {
  GrantEnergyPayload,
  GrantEnergyResponse,
} from '@/features/grant-energy/model/types';

export function grantEnergy({
  telegramId,
  amount,
  reason,
}: GrantEnergyPayload) {
  return apiClient<GrantEnergyResponse>(
    `/api/admin/users/${encodeURIComponent(telegramId)}/energy/grants`,
    {
      method: 'POST',

      body: JSON.stringify({
        amount,
        reason: reason || undefined,
      }),
    },
  );
}
