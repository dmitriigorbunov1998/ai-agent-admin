import { Activity, CircleCheck, CircleX, Cpu } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { AdminUserDetails } from '@/pages/user-details/model/types';

type UserAiActivityCardProps = {
  activity: AdminUserDetails['aiActivity'];
};

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 4,
  maximumFractionDigits: 6,
});

export function UserAiActivityCard({ activity }: UserAiActivityCardProps) {
  const spent = Number(activity.spentUsd);
  const reserved = Number(activity.reservedUsd);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="size-4" />
          AI Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Cpu className="size-3" />
              Tasks
            </p>

            <p className="mt-1 text-xl font-semibold">{activity.totalTasks}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Running</p>

            <p className="mt-1 text-xl font-semibold">
              {activity.runningTasks}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CircleCheck className="size-3" />
              Completed
            </p>

            <p className="mt-1 text-xl font-semibold">
              {activity.completedTasks}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CircleX className="size-3" />
              Failed
            </p>

            <p className="mt-1 text-xl font-semibold">{activity.failedTasks}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Total spent</p>

            <p className="mt-1 font-mono text-lg font-medium">
              {Number.isFinite(spent) ? usdFormatter.format(spent) : '-'}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Reserved budget</p>

            <p className="mt-1 font-mono text-lg font-medium">
              {Number.isFinite(reserved) ? usdFormatter.format(reserved) : '-'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
