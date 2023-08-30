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
  cutoffDate: bigint;
  decisionDate: bigint;
  decisionProvider: `0x${string}`;
  description: string;
}
