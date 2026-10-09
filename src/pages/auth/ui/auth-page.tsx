import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bot, ShieldCheck } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

import {
  authQueryKeys,
  getAuthStatus,
  login,
  LoginForm,
  register,
  RegisterForm,
} from '@/features/auth';

export const AuthPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: authQueryKeys.status(),

    queryFn: getAuthStatus,
  });

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });

      navigate('/dashboard', {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error('Unable to sign in', {
        description: error.message,
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });

      navigate('/dashboard', {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error('Unable to create administrator', {
        description: error.message,
      });
    },
  });

  if (statusQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center bg-background justify-center p-6">
        <Skeleton className="h-[420px] w-full max-w-md rounded-xl" />
      </div>
    );
  }

  if (statusQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentification unavailable</CardTitle>

            <CardDescription>
              Clio Admin could not check the authentication state.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (statusQuery.data.authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const setupRequired = statusQuery.data.setupRequired;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top, _var(--color-muted)_0,_transparent_42%)] opacity-40" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm">
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

            <CardTitle>
              {setupRequired ? 'Create administrator' : 'Welcome back'}
            </CardTitle>

            <CardDescription>
              {setupRequired
                ? 'No administrator account exists yet. Create the first account to configure Clio Admin.'
                : 'Sign in to continue to the Clio administration console.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {setupRequired ? (
              <RegisterForm
                isPending={registerMutation.isPending}
                onSubmit={(values) => {
                  registerMutation.mutate({
                    login: values.login,

                    password: values.password,
                  });
                }}
              />
            ) : (
              <LoginForm
                isPending={loginMutation.isPending}
                onSubmit={(values) => loginMutation.mutate(values)}
              />
            )}
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Private administration interface
        </p>
      </div>
    </div>
  );
};
