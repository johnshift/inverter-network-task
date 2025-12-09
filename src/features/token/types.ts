export type TokenTransfersPage = {
  pageKey: string | undefined;
  transfers: Array<{
    from: string;
    to: string;
    amount: number;
    timestamp: string;
    hash: string;
    token: string | undefined;
  }>;
};
