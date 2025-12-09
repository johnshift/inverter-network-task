import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z
    .string()
    .min(1, 'Rainbowkit Project ID is required'),
  NEXT_PUBLIC_ALCHEMY_KEY: z.string().min(1, 'Alchemy Key is required'),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:\n', z.prettifyError(parsed.error));
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
