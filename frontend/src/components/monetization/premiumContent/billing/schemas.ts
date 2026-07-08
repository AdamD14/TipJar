import { z } from 'zod';

export const billingSchema = z.object({
  payoutSchedule: z.enum(['monthly', 'weekly', 'manual']),
  minimumPayout: z.number().int().positive('Minimum payout must be positive').default(10),
  currency: z.string().length(3, 'Currency must be a 3-letter code').default('USDC'),
  taxInfo: z.object({
    taxId: z.string().max(50).optional(),
    country: z.string().length(2, 'Country must be a 2-letter code'),
    region: z.string().max(50).optional(),
  }),
}).strict();

export type BillingInput = z.infer<typeof billingSchema>;