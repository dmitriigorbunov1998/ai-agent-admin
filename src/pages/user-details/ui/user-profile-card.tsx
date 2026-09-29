import { AtSign, Calendar, Hash, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { AdminUserDetails } from '@/pages/user-details/model/types';

type UserProfileCardProps = {
  user: AdminUserDetails['user'];
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="size-4" />
          Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-xs text-muted-foreground">Name</p>

          <p className="mt-1 font-medium">
            {user.firstName ?? `User #${user.id}`}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <AtSign className="size-3" />
            Username
          </p>

          <p className="mt-1 font-medium">
            {user.username ? `@${user.username}` : '-'}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="size-3" />
            Telegram ID
          </p>

          <p className="mt-1 font-mono text-sm">
            {user.telegramId}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Status
          </p>

          <div className="mt-1">
            <Badge
              variant={
              user.isActive ? 'secondary' : 'outline'
              }
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            Registered
          </p>

          <p className="mt-1 text-sm">
            {dateFormatter.format(
              new Date(user.createdAt),
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
