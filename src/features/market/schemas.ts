import z from 'zod';

export const coingeckoMarketDataItemSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string().url(),
  current_price: z.number(),
  price_change_percentage_24h: z.number(),
  market_cap: z.number(),
  total_volume: z.number(),
});

export const coingeckoMarketDataResponseSchema = coingeckoMarketDataItemSchema.array();

export type CoingeckoMarketDataItem = z.infer<typeof coingeckoMarketDataItemSchema>;
export type CoingeckoMarketDataResponse = z.infer<
  typeof coingeckoMarketDataResponseSchema
>;
