export const MOCK_ERC20 = {
  address: '0x065775C7aB4E60ad1776A30DCfB15325d231Ce4F' as const,
  abi: [
    {
      name: 'mint',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
      ],
      outputs: [],
    },
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'address', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
    },
    {
      name: 'name',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }],
    },
    {
      name: 'symbol',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }],
    },
  ] as const,
};

export const SEPOLIA_EXPLORER_URL = 'https://sepolia.etherscan.io';
