// import { z } from 'zod';

// import { coingeckoMarketDataResponseSchema } from '@/features/market/schemas';

// const PER_PAGE = 5;

// export const getMarketDataByPage = async (page: number) => {
//   const url =
//     `https://api.coingecko.com/api/v3/coins/markets` +
//     `?vs_currency=usd&order=market_cap_desc&per_page=${PER_PAGE}&page=${page}&sparkline=false`;

//   const res = await fetch(url);

//   if (!res.ok) {
//     throw new Error(`CoinGecko error: ${res.status}`);
//   }

//   const jsonData = await res.json();
//   const parsed = coingeckoMarketDataResponseSchema.safeParse(jsonData);

//   if (!parsed.success) {
//     console.error(z.prettifyError(parsed.error));
//     throw new Error('Invalid response from CoinGecko');
//   }

//   return parsed.data;
// };

import { z } from 'zod';

import {
  type CoingeckoMarketDataItem,
  coingeckoMarketDataResponseSchema,
} from '@/features/market/schemas';

export class RateLimitError extends Error {
  constructor() {
    super('Too many requests. Please wait a moment.');
    this.name = 'RateLimitError';
  }
}

const PER_PAGE = 5;

type GetMarketDataByPageParams = {
  page: number;
  query?: string;
};

const fetchMarketData = async (url: string): Promise<CoingeckoMarketDataItem[]> => {
  let res: Response;

  try {
    res = await fetch(url);
  } catch (error) {
    // When 429 is blocked by CORS, fetch throws a network error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new RateLimitError();
    }
    throw error;
  }

  if (res.status === 429) {
    throw new RateLimitError();
  }

  if (!res.ok) {
    throw new Error(`CoinGecko error: ${res.status}`);
  }

  const jsonData = await res.json();
  const parsed = coingeckoMarketDataResponseSchema.safeParse(jsonData);

  if (!parsed.success) {
    console.error(z.prettifyError(parsed.error));
    throw new Error('Invalid response from CoinGecko');
  }

  return parsed.data;
};

export const getMarketDataByPage = async ({ page, query }: GetMarketDataByPageParams) => {
  const baseUrl =
    `https://api.coingecko.com/api/v3/coins/markets` +
    `?vs_currency=usd&order=market_cap_desc&per_page=${PER_PAGE}&page=${page}&sparkline=false`;

  if (query && query.trim()) {
    const [byName, bySymbol] = await Promise.all([
      fetchMarketData(`${baseUrl}&names=${encodeURIComponent(query)}`),
      fetchMarketData(
        `${baseUrl}&symbols=${encodeURIComponent(query)}&include_tokens=all`,
      ),
    ]);

    const combined = [...byName, ...bySymbol];
    const deduped = Array.from(new Map(combined.map((item) => [item.id, item])).values());

    return deduped;
  }

  return fetchMarketData(baseUrl);
};
