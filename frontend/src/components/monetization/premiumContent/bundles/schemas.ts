import { z } from 'zod';
import type { ProductStatus } from '@/types/premiumContent';

export const createBundleSchema = z.object({
  title: z.string().min(1, 'Bundle title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(2000, 'Description must be 2000 characters or less').optional(),
  productIds: z.array(z.string()).min(2, 'A bundle requires at least 2 products').max(20, 'Maximum 20 products per bundle'),
  price: z.number().int().positive('Price must be a positive number').max(100000, 'Price too high'),
  currency: z.string().length(3, 'Currency must be a 3-letter code').default('USDC'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
}).strict();

export const updateBundleSchema = createBundleSchema.partial().extend({
  id: z.string().min(1),
}).strict();

export type CreateBundleInput = z.infer<typeof createBundleSchema>;
export type UpdateBundleInput = z.infer<typeof updateBundleSchema>;