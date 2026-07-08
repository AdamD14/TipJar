import { z } from 'zod';
import type { PriceCycle, Tier } from '@/types/premiumContent';

export const tierPerksSchema = z.array(z.string().min(1, 'Perk cannot be empty').max(200, 'Perk must be 200 characters or less')).max(20, 'Maximum 20 perks allowed');

export const createTierSchema = z.object({
  name: z.string().min(1, 'Tier name is required').max(50, 'Name must be 50 characters or less'),
  priceCycle: z.enum(['monthly', 'yearly']),
  price: z.number().int().positive('Price must be a positive number').max(10000, 'Price too high'),
  currency: z.string().length(3, 'Currency must be a 3-letter code').default('USDC'),
  includedProductIds: z.array(z.string()).default([]),
  perks: tierPerksSchema.default([]),
  status: z.enum(['active', 'archived']).default('active'),
}).strict();

export const updateTierSchema = createTierSchema.partial().extend({
  id: z.string().min(1),
}).strict();

export type CreateTierInput = z.infer<typeof createTierSchema>;
export type UpdateTierInput = z.infer<typeof updateTierSchema>;
export type TierPerksInput = z.infer<typeof tierPerksSchema>;