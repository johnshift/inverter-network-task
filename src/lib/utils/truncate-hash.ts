export const truncateHash = (txHash: string) => {
  if (txHash.length <= 10) return txHash;
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
};
