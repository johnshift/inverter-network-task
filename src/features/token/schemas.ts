import z from 'zod';

export const getTokenTransfersResponseSchema = z.object({
  result: z.object({
    pageKey: z.string().optional(),
    transfers: z
      .object({
        from: z.string(),
        to: z.string(),
        blockNum: z.string(),
        value: z.number(),
        hash: z.string(),
        asset: z.string().nullish(),
        metadata: z
          .object({
            blockTimestamp: z.string(),
          })
          .optional(),
      })
      .array(),
  }),
});
export type GetTokenTransfersResponse = z.infer<typeof getTokenTransfersResponseSchema>;
