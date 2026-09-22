export type PlanCode = 'freemium' | 'lite' | 'pro';

export type Plan = {
  id: number;

  code: PlanCode;
  name: string;

  priceRub: number;
  energyLimit: number;

  maxConcurrentTasks: number;
  maxCronJobs: number;

  isActive: boolean;
};
