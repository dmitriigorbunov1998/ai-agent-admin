export type SubscriptionStatus = 'active' | 'expired';

export type Subscription = {
  id: number;

  userId: number;
  planId: number;

  status: SubscriptionStatus;

  startedAt: string;
  expiresAt: string;
  createdAt: string;
};
