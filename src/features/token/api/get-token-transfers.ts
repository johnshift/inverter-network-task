import { Address } from 'viem';

import { MOCK_ERC20 } from '@/features/token/constants';
import { getTokenTransfersResponseSchema } from '@/features/token/schemas';

export const getTokenTransfers = async (address: Address, pageKeyParam?: string) => {
  const res = await fetch(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            pageKey: pageKeyParam || undefined,
            fromBlock: '0x0',
            toBlock: 'latest',
            toAddress: address,
            contractAddresses: [MOCK_ERC20.address],
            category: ['erc20'],
            excludeZeroValue: false,
            maxCount: '0x3',
            order: 'desc',
            withMetadata: true,
          },
        ],
      }),
    },
  );

  const jsonData = await res.json();
  const parsed = getTokenTransfersResponseSchema.safeParse(jsonData);

  if (!parsed.success) {
    throw new Error('Invalid response from Alchemy');
  }

  const { pageKey, transfers } = parsed.data.result;

  return {
    pageKey,
    transfers: transfers.map((transfer) => ({
      from: transfer.from,
      to: transfer.to,
      amount: transfer.value,
      token: transfer.asset || undefined,
      timestamp: transfer.metadata?.blockTimestamp || 'N/A',
      hash: transfer.hash,
    })),
  };
};
