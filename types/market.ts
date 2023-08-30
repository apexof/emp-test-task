import { Dayjs } from 'dayjs';

export interface Market {
  id: string;
  description: string;
  address: string;
  providerAddress: string;
  state: boolean;
  winToken: null;
  lastEventDate: number;
}

export interface CreateMarketForm {
  cutoffDate: Dayjs;
  decisionDate: Dayjs;
  decisionProvider: `0x${string}`;
  description: string;
}
