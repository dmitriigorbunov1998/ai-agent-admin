import { ArrowRight, CircleOff } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AdminUserListItem } from '@/pages/users/model/types';

type UsersTableProps = {
  users: AdminUserListItem[];
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const UsersTable = ({ users }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed">
        <CircleOff className="mb-3 size-5 text-muted-foreground" />

        <p className="text-sm font-medium">No users found</p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Telegram ID</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Energy</TableHead>
            <TableHead>Subscription</TableHead>

            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex flex-col">
                  <Link
                    to={`/users/${user.id}`}
                    className="font-medium hover:underline"
                  >
                    {user.username ? `@${user.username}` : `user #${user.id}`}
                  </Link>
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs">
                {user.telegramId}
              </TableCell>

              <TableCell>
                <Badge variant="outline">{user.plan?.name ?? 'No plan'}</Badge>
              </TableCell>

              <TableCell>
                {user.energy ?? '-'}
              </TableCell>

              <TableCell>
                {user.subscriptionExpiresAt ? (
                  <span className="text-muted-foreground">
                    {dateFormatter.format(
                      new Date(user.subscriptionExpiresAt)
                    )}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    -
                  </span>
                )}
              </TableCell>

              <TableCell>
                <Link
                  to={`/users/${user.id}`}
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Open user ${user.id}`}
                >
                  <ArrowRight className="size-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
