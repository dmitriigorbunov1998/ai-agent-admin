export type DashboardSummary = {
  users: {
    total: number;
    active: number;
  };

  subscriptions: {
    paid: number;

    freemium: number;
    lite: number;
    pro: number;
  };

  payments: {
    succeeded: number;
    revenueRub: number;
  };

  energy: {
    totalBalance: number;
  };
};
