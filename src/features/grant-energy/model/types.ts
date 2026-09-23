export type GrantEnergyPayload = {
  telegramId: string;
  amount: number;
  reason?: string;
};

export type GrantEnergyResponse = {
  user: {
    id: number;
    telegramId: string;
    username: string | null;
    firstName: string | null;
  };

  energy: {
    granted: number;

    balanceBefore: number;
    balanceAfter: number;

    reserved: number;
    availableAfter: number;
  };
};
