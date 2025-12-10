import { MarketData } from '@/features/market/components/market-data';

const MarketPage = () => {
  return (
    <div className='space-y-4 p-6'>
      <h1 className='text-2xl font-semibold'>Crypto Market</h1>

      <MarketData />
    </div>
  );
};
export default MarketPage;
