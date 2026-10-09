import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authQueryKeys, getAuthStatus } from '@/features/auth';

export function RequireAuth() {
  const location = useLocation();

  const authQuery = useQuery({
    queryKey: authQueryKeys.status(),

    queryFn: getAuthStatus,

    staleTime: 30_000,
  });

  if (authQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">
          Checking session...
        </span>
      </div>
    );
  }

  if (authQuery.isError || !authQuery.data.authenticated) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return <Outlet />;
}
