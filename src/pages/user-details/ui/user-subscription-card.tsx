import { Clock, Crown, Timer } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { AdminUserDetails } from '@/pages/user-details/model/types';

type UserSubscriptionCardProps = {
  subscription: AdminUserDetails['subscription'];
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
});

export function UserSubscriptionCard({
  subscription,
}: UserSubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Crown className="size-4" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!subscription ? (
          <p className="text-sm text-muted-foreground">
            No active subscription.
          </p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Plan</p>

                <p className="mt-1 text-xl font-semibold">
                  {subscription.plan.name}
                </p>
              </div>

              <Badge variant="secondary">{subscription.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>

                <p>{subscription.plan.priceRub.toLocaleString('ru-RU')} ₽</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Energy</p>

                <p className="mt-1 font-medium">
                  {subscription.plan.energyLimit}
                </p>
              </div>

              <div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Timer className="size-3" />
                  Concurrent tasks
                </p>

                <p className="mt-1 font-medium">
                  {subscription.plan.maxConcurrentTasks}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Cron jobs</p>

                <p className="mt-1 font-medium">
                  {subscription.plan.maxCronJobs}
                </p>
              </div>
            </div>

            <div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                Expires
              </p>

              <p className="mt-1 text-sm">
                {dateFormatter.format(new Date(subscription.expiresAt))}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
