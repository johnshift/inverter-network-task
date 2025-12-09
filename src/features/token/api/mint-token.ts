import { type Address } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

import { MOCK_ERC20 } from '@/features/token/constants';
import { config } from '@/features/wallet/config/rainbowkit-config';

export const mintToken = async (address: Address, amount: bigint) => {
  const hash = await writeContract(config, {
    address: MOCK_ERC20.address,
    abi: MOCK_ERC20.abi,
    functionName: 'mint',
    args: [address, amount],
  });

  const receipt = await waitForTransactionReceipt(config, { hash });

  return { hash, receipt };
};
