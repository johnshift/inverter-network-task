import { readContract } from 'wagmi/actions';

import { MOCK_ERC20 } from '@/features/token/constants';
import { config } from '@/features/wallet/config/rainbowkit-config';

export const getTokenName = async () => {
  const name = await readContract(config, {
    address: MOCK_ERC20.address,
    abi: MOCK_ERC20.abi,
    functionName: 'name',
    args: [],
  });

  return name;
};
