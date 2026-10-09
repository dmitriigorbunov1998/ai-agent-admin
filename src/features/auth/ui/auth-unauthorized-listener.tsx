import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { subscribeToAuthUnauthorized } from '@/shared/api/auth-events';

import { authQueryKeys } from '../model/query-keys';

export function AuthUnauthorizedListener() {
  const queryClient = useQueryClient();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    return subscribeToAuthUnauthorized(() => {
      queryClient.removeQueries({
        queryKey: authQuetyKeys.all,
      });

      if (location.pathname === '/login') {
        return;
      }

      navigate(`/login`, {
        replace: true,

        state: {
          from: `${location.pathname}${location.search}`,
        },
      });
    });
  }, [location.pathname, location.search, navigate, queryClient]);

  return null;
}
