import { Separator } from '@/components/ui/separator';
import { BalanceInfo } from '@/features/token/components/balance-info';
import { MintForm } from '@/features/token/components/mint-form';
import { NetworkGuard } from '@/features/token/components/network-guard';
import { WalletStatus } from '@/features/token/components/wallet-status';

export const MintPage = () => {
  return (
    <div className='container mx-auto max-w-2xl space-y-8 py-8'>
      <div className='space-y-6'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Wallet Status</h2>
          <WalletStatus balanceInfo={<BalanceInfo />} />
        </div>

        <Separator />

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Mint Tokens</h2>
          <NetworkGuard>
            <MintForm />
          </NetworkGuard>
        </div>
      </div>
    </div>
  );
};
