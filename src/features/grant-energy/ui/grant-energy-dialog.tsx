import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BatteryCharging, Plus } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { dashboardQueryKeys } from '@/pages/dashboard/model/query-keys';
import { usersQueryKeys } from '@/pages/users/model/query-keys';

import { grantEnergy } from '@/features/grant-energy/api/grant-energy';

type GrantEnergyDialogProps = {
  defaultTelegramId?: string;
};

export function GrantEnergyDialog({
  defaultTelegramId = '',
}: GrantEnergyDialogProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [telegramId, setTelegramId] = useState(defaultTelegramId);

  const [amount, setAmount] = useState('');

  const [reason, setReason] = useState('');

  const mutation = useMutation({
    mutationFn: grantEnergy,

    onSuccess: async (result) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: dashboardQueryKeys.all,
        }),
      ]);

      toast.success(`Added ${result.energy.granted} Energy`, {
        description: `Telegram ID ${result.user.telegramId} · balance ${result.energy.balanceAfter}`,
      });

      setAmount('');
      setAmount('');
      setOpen(false);
    },

    onError: (error) => {
      toast.error('Failed to add Energy', {
        description: message,
      });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTelegramId = telegramId.trim();

    const parsedAmount = Number(amount);

    if (!normalizedTelegramId) {
      toast.error('Telegram ID is required');

      return;
    }

    if (!Number.isSafeInteger(parsedAmount) || parsedAmount <= 0) {
      toast.error('Energy must be a positive whole number');

      return;
    }

    mutation.mutate({
      telegramId: normalizedTelegramId,

      amount: parsedAmount,

      reason: reason.trim() || undefined,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
        Add Energy
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex size=10 items-center justify-center rounded-lg border bg-muted">
              <BatteryCharging className="size-5" />
            </div>

            <DialogTitle>Add Energy</DialogTitle>

            <DialogDescription>
              Manually add Energy to a Clio user using their Telegram ID.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-6">
            <Field>
              <FieldLabel htmlFor="telegram-id">Telegram ID</FieldLabel>

              <Input
                id="telegram-id"
                inputMode="numeric"
                autoComplete="off"
                placeholder="700000001"
                value={telegramId}
                disabled={mutation.isPending}
                onChange={(event) => setTelegramId(event.target.value)}
              />

              <FieldDescription>Numeric Telegram account ID.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="energy-amount">Energy</FieldLabel>

              <Input
                id="energy-amount"
                type="number"
                min={1}
                step={1}
                placeholder="10"
                value={amount}
                disabled={mutation.isPending}
                onChange={(event) => setAmount(event.target.value)}
              />

              <FieldDescription>
                Amount added to the current balance.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="energy-reason">Reason</FieldLabel>

              <Input
                id="energy-reason"
                placeholder="Support compensation"
                value={reason}
                disabled={mutation.isPending}
                onChange={(event) => setReason(event.target.value)}
              />

              <FieldDescription>
                Optional, but useful for the future audit log.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Adding...' : 'Add Energy'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
