import { Separator } from '@/components/ui/separator';
import { BalanceInfo } from '@/features/token/components/balance-info';
import { TransactionsList } from '@/features/token/components/transactions-list';

export const TransactionsPage = () => {
  return (
    <div className='container mx-auto max-w-2xl space-y-8 py-8'>
      <div className='space-y-6'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Balance</h2>
          <BalanceInfo />
        </div>

        <Separator />

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Transaction History</h2>
          <TransactionsList />
        </div>
      </div>
    </div>
  );
};
