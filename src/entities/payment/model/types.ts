export type PaymentStatus = 'pending' | 'succeeded';

export type Payment = {
  id: number;

  userId: number;
  planId: number | null;

  provider: string;
  providerPaymentId: string | null;

  amountRub: number;

  status: PaymentStatus;

  createdAt: string;
  paidAt: string | null;
};
