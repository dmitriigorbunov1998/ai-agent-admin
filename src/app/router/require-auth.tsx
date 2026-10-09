import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authQueryKeys, getMe } from '@/features/auth';

export function RequireAuth() {
  const location = useLocation();

  const meQuery = useQuery({
    queryKey: authQueryKeys.me(),

    queryFn: getMe,

    retry: false,
  });

  if (meQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">
          Checking session...
        </span>
      </div>
    );
  }

  if (meQuery.isError) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return <Outlet />;
}
