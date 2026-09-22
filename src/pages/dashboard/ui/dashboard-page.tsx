import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge.tsx';
import { DashboardStats } from '@/widgets/dashboard-stats';

import { getDashboardSummary } from '@/pages/dashboard/api/get-dashboard-summary';
import { dashboardQueryKeys } from '@/pages/dashboard/model/query-keys';

export function DashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: getDashboardSummary,
  });

  if (dashboardQuery.isPending) {
    return (
      <div className="text-sm text-muted-foreground">Loading dashboard...</div>
    );
  }

  if (dashboardQuery.isError) {
    return (
      <div className="text-sm text-destructive">Failed to load dashboard.</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-light">Dashboard</h1>

          <Badge variant="secondary">Live</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Overview of users, subscriptions and Clio activity.
        </p>
      </div>

      <DashboardStats
        totalUsers={dashboardQuery.data.users.total}
        activeUsers={dashboardQuery.data.users.active}
        paidSubscriptions={dashboardQuery.data.subscriptions.paid}
        liteSubscriptions={dashboardQuery.data.subscriptions.lite}
        proSubscriptions={dashboardQuery.data.subscriptions.pro}
        revenueRub={dashboardQuery.data.payments.revenueRub}
        successfulPayments={dashboardQuery.data.payments.succeeded}
        energyBalance={dashboardQuery.data.energy.totalBalance}
      />
    </div>
  );
}
