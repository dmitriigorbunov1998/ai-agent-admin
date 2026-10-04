import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { getAdminUsers } from '@/pages/users/api/get-admin-users';
import { usersQueryKeys } from '@/pages/users/model/query-keys';
import { UsersTable } from '@/pages/users/ui/users-table';

const PAGE_SIZE = 10;

function parsePage(value: string | null) {
  const page = Number(value);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePage(searchParams.get('page'));

  const params = {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  };

  const usersQuery = useQuery({
    queryKey: usersQueryKeys.list(params),
    queryFn: () => getAdminUsers(params),
    placeholderData: keepPreviousData,
  });

  function changePage(nextPage: number) {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(nextPage));

    setSearchParams(nextParams);
  }

  const totalPages = usersQuery.data
    ? Math.max(Math.ceil(usersQuery.data.total / usersQuery.data.limit), 1)
    : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border bg-muted">
            <Users className="size-4" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Users</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Telegram users registered in Clio
            </p>
          </div>
        </div>
      </div>

      {usersQuery.isPending ? (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : usersQuery.isError ? (
        <div className="rounded-lg border-destructive/40 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">
            Failed to load users.
          </p>
        </div>
      ) : (
        <>
          <UsersTable users={usersQuery.data.users} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {usersQuery.data.total} users
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || usersQuery.isPlaceholderData}
                onClick={() => changePage(page - 1)}
              >
                Previous
              </Button>

              <span className="min-w-24 text-center text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || usersQuery.isPlaceholderData}
                onClick={() => changePage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
