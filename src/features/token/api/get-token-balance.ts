import { type Address, formatUnits } from 'viem';
import { readContract } from 'wagmi/actions';

import { MOCK_ERC20 } from '@/features/token/constants';
import { config } from '@/features/wallet/config/rainbowkit-config';

export const getTokenBalance = async (address: Address) => {
  if (!address) return '0';

  const balance = await readContract(config, {
    address: MOCK_ERC20.address,
    abi: MOCK_ERC20.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return formatUnits(balance, 18);
};
