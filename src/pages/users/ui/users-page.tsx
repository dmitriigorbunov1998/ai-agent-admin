import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Search, Users } from 'lucide-react';
import { type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

import { getAdminUsers } from '@/pages/users/api/get-admin-users';
import { usersQueryKeys } from '@/pages/users/model/query-keys';
import { UsersTable } from '@/pages/users/ui/users-table';
import { GrantEnergyDialog } from '@/features/grant-energy/ui/grant-energy-dialog';

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

  const search = searchParams.get('search') ?? '';

  const params = {
    page,
    pageSize: PAGE_SIZE,
    search: search || undefined,
  };

  const usersQuery = useQuery({
    queryKey: usersQueryKeys.list(params),

    queryFn: () => getAdminUsers(params),

    placeholderData: keepPreviousData,
  });

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams);

    const formData = new FormData(event.currentTarget);

    const normalizedSearch = String(formData.get('search') ?? '').trim();

    if (normalizedSearch) {
      nextParams.set('search', normalizedSearch);
    } else {
      nextParams.delete('search');
    }

    nextParams.set('page', '1');

    setSearchParams(nextParams);
  }

  function changePage(nextPage: number) {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(nextPage));

    setSearchParams(nextParams);
  }

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

        <GrantEnergyDialog />
      </div>

      <form
        key={search}
        onSubmit={handleSearch}
        className="flex max-w-md gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            name="search"
            defaultValue={search}
            placeholder="Name, username or Telegram ID"
            className="pl-9"
          />
        </div>

        <Button type="submit">Search</Button>
      </form>

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
          <UsersTable users={usersQuery.data.items} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {usersQuery.data.pagination.total} users
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
                Page {page} of{' '}
                {Math.max(usersQuery.data.pagination.totalPages, 1)}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={
                  page >= usersQuery.data.pagination.totalPages ||
                  usersQuery.isPlaceholderData
                }
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
