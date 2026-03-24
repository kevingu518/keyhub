import type { ProviderId } from './provider';

export interface UsageRecord {
  id?: number;
  provider: ProviderId;
  date: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  model?: string;
}

export interface BudgetSettings {
  monthlyBudgetUsd: number;
  alertThreshold: number; // 0-1, e.g. 0.8 = alert at 80%
}
