import { LogOut, UserRound } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { logout } from '../api/logout';
import { authQueryKeys } from '../model/query-keys';

import type { AdminUser } from '../model/types';

type AdminSessionControlsProps = {
  user: AdminUser;
};

export function AdminSessionControls({ user }: AdminSessionControlsProps) {
  const navigate = useNavigate();

  const useQueryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      useClient.removeQueries({
        queryKey: authQueryKeys.all,
      });

      navigate('/login', {
        replace: true,
      });
    },

    onError: () => {
      toast.error('Unable to sign out. Please try again.');
    },
  });

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <div className="text-sm font-medium">{user.name}</div>

        <div className="text-xs text-muted-foreground">{user.email}</div>
      </div>

      <div className="flex size-9 items-center justify-center rounded-full border bg-muted">
        <UserRound className="size-4" />
      </div>

      <Button
        variant="ghost"
        size="icon"
        disabled={logoutMutation.isPending}
        onClick={() => logoutMutation.mutate()}
        aria-label="Sign out"
        title="Sign out"
      >
        <Logout className="size-4" />
      </Button>
    </div>
  );
}
