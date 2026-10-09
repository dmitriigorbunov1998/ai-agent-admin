import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bot, ShieldCheck } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton';

import { authQueryKeys, getMe, login, LoginForm } from '@/features/auth';

import { ApiError } from '@/shared/api';

type LoginLocationState = {
  from?: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: authQueryKeys.me(),

    queryFn: getMe,

    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });

      const state = location.state as LoginLocationState | null;

      navigate(state?.from ?? '/dashboard', {
        replace: true,
      });
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          toast.error('Invalid email or password');

          return;
        }

        if (error.status === 403) {
          toast.error('You do not have access to the administration panel.');

          return;
        }

        if (error.status === 429) {
          toast.error('Too many sign-in attempts. Try again later');

          return;
        }
      }

      toast.error('Unable to sign in. Please try again.');
    },
  });

  if (meQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center bg-background justify-center p-6">
        <Skeleton className="h-105 w-full max-w-md rounded-xl" />
      </div>
    );
  }

  if (meQuery.isSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-6">
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border bg-card">
            <Bot className="size-5" />
          </div>

          <div>
            <div className="font-semibold">Clio</div>

            <div className="text-xs text-muted-foreground">Admin Console</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="size-5" />
            </div>

            <CardTitle>Welcome back</CardTitle>

            <CardDescription>
              Sign in to continue to the Clio administration console.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm
              isPending={loginMutation.isPending}
              onSubmit={(values) => loginMutation.mutate(values)}
            />
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Private administration interface
        </p>
      </div>
    </div>
  );
};
