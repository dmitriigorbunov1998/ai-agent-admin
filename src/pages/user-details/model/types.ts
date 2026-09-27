import type { PlanCode } from '@/entities/plan';
import type { PaymentStatus } from '@/entities/payment';
import type { SubscriptionStatus } from '@/entities/subscription';

export type AdminUserDetails = {
  user: {
    id: number;

    telegramId: string;

    username: string | null;
    firstName: string | null;

    isActive: boolean;

    createdAt: string;
    updatedAt: string;
  }

  subscription: {
    id: number;
    status: SubscriptionStatus;

    startedAt: string;
    expiresAt: string;

    plan: {
      id: number;

      code: PlanCode;
      name: string;

      priceRub: number;
      energyLimit: number

      maxConcurrentTasks: number;
      maxCronJobs: number;
    }
  } | null;

  energy: {
    balance: number;
    reserved: number;
    available: number;
  } | null;

  aiActivity: {
    totalTasks: number;

    runningTasks: number;
    completedTasks: number;
    failedTasks: number;

    spentUsd: string;
    reservedUsd: string;

    lastTaskAt: string | null;
  }

  payments: {
    id: number;

    amountRub: number;

    provider: string;
    status: PaymentStatus;

    createdAt: string;
    paidAt: string | null;
  }[]
}
