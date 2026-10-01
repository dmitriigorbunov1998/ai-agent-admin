import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, User } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { usersQueryKeys } from '@/pages/users/model/query-keys';

import { getAdminUser } from '../api/get-admin-user';
import { UserAiActivityCard } from './user-ai-activity-card';
import { UserEnergyCard } from './user-energy-card';
import { UserPaymentsTable } from './user-payments-table';
import { UserProfileCard } from './user-profile-card';
import { UserSubscriptionCard } from './user-subscription-card';

export function UserDetailsPage() {
  const { userId } = useParams();

  const location = useLocation();

  const parsedUserId = Number(userId);

  const isValidUserId = Number.isSafeInteger(parsedUserId) && parsedUserId > 0;

  const userQuery = useQuery({
    queryKey: usersQueryKeys.detail(parsedUserId),

    queryFn: () => getAdminUser(parsedUserId),

    enabled: isValidUserId,
  });

  const backTo =
    typeof location.state?.from === 'string' ? location.state.from : '/users';

  if (!isValidUserId) {
    return (
      <div className="space-y-4">
        <Link
          to="/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Users
        </Link>

        <p className="text-sm text-destructive">Invalid user ID.</p>
      </div>
    );
  }

  if (userQuery.isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />

        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>

        <Skeleton className="h-60" />
      </div>
    );
  }

  if (userQuery.isError) {
    return (
      <div className="space-y-4">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Users
        </Link>

        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">
            Failed to load user.
          </p>
        </div>
      </div>
    );
  }

  const data = userQuery.data;

  const user = data.user;

  return (
    <div className="space-y-6">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Users
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <User className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                {user.firstName ?? `User #${user.id}`}
              </h1>

              <Badge variant={user.isActive ? 'secondary' : 'outline'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <p>@{user.username ?? 'unknown'} · Telegram </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-2">
            <UserProfileCard user={user} />

            <UserSubscriptionCard subscription={data.subscription} />
          </div>

          <UserEnergyCard telegramId={user.telegramId} energy={data.energy} />

          <UserAiActivityCard activity={data.aiActivity} />
        </TabsContent>

        <TabsContent value="payments">
          <UserPaymentsTable payments={data.payments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
