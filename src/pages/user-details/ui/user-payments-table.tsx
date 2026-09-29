import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AdminUserDetails } from '@/pages/user-details/model/types';

type UserPaymentsTableProps = {
  payments: AdminUserDetails['payments'];
};

const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.NumberFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function UserPaymentsTable({ payments }: UserPaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">No payments yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-mono text=xs">#{payment.id}</TableCell>

              <TableCell className="font-medium">
                {rubFormatter.format(payment.amountRub)}
              </TableCell>

              <TableCell>{payment.provider}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    payment.status === 'succeeded' ? 'secondary' : 'outline'
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {dateFormatter.format(new Date(payment.createdAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
