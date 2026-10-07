import { BatteryCharging, Lock, Zap } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { GrantEnergyDialog } from '@/features/grant-energy';

import type { AdminUserDetails } from '@/pages/user-details/model/types';

type UserEnergyCardProps = {
  telegramId: string;

  energy: AdminUserDetails['energy'];
};

export function UserEnergyCard({ telegramId, energy }: UserEnergyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <BatteryCharging className="size-4" />
          Energy
        </CardTitle>

        <GrantEnergyDialog defaultTelegramId={telegramId} lockTelegramId />
      </CardHeader>

      <CardContent>
        {!energy ? (
          <p className="text-sm text-muted-foreground">
            Energy account is not available
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <BatteryCharging className="size-3" />
                Balance
              </p>

              <p className="mt-2 text-2xl font-semibold">{energy.balance}</p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="size-3" />
                Reserved
              </p>

              <p className="mt-2 text-2xl font-semibold">{energy.reserved}</p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="size-3" />
                Available
              </p>

              <p className="mt-2 text-2xl font-semibold">{energy.available}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
