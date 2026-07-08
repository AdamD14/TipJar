import { z } from 'zod';
import type { ProductType, AccessModel, DeliveryModel, DisplayCategory, ProductStatus, CourseModule, LiveSessionDetails } from '@/types/premiumContent';

export const productTypeSchema = z.enum(['gallery', 'video', 'audio', 'document', 'course', 'live-session']);

export const productDetailsSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title must be 120 characters or less'),
  description: z.string().max(5000, 'Description must be 5000 characters or less').optional(),
}).strict();

export const productAccessSchema = z.object({
  accessModel: z.enum(['one-time', 'tier-included', 'add-on']),
  price: z.number().int().positive('Price must be a positive number').optional(),
  currency: z.string().length(3, 'Currency must be a 3-letter code').default('USDC'),
}).refine(
  (data) => data.accessModel === 'tier-included' || (data.price && data.price > 0),
  { message: 'Price is required for one-time and add-on products', path: ['price'] }
);

export const productDeliverySchema = z.object({
  delivery: z.enum(['instant', 'scheduled-drop', 'booking']),
  scheduledAt: z.string().datetime({ offset: true }).optional(),
}).refine(
  (data) => data.delivery !== 'scheduled-drop' || (data.scheduledAt && new Date(data.scheduledAt) > new Date()),
  { message: 'Scheduled drop requires a future date/time', path: ['scheduledAt'] }
);

export const courseModuleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Module title is required').max(100),
  order: z.number().int().nonnegative(),
  contentUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
}).strict();

export const liveSessionDetailsSchema = z.object({
  scheduledAt: z.string().datetime({ offset: true }, { message: 'Invalid date/time format' }),
  durationMinutes: z.number().int().positive('Duration must be positive').max(480, 'Maximum 8 hours'),
  capacity: z.number().int().positive('Capacity must be positive').optional(),
}).strict();

export const productContentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('course'),
    modules: z.array(courseModuleSchema).min(1, 'At least one module is required'),
  }),
  z.object({
    type: z.literal('live-session'),
    liveSession: liveSessionDetailsSchema,
  }),
  z.object({
    type: z.union([z.literal('gallery'), z.literal('video'), z.literal('audio'), z.literal('document')]),
    files: z.any().optional(),
  }),
]);

export const createProductSchema = z.object({
  type: productTypeSchema,
  title: z.string().min(1).max(120),
  description: z.string().max(5000).optional(),
  accessModel: z.enum(['one-time', 'tier-included', 'add-on']),
  price: z.number().int().positive().optional(),
  currency: z.string().length(3).default('USDC'),
  delivery: z.enum(['instant', 'scheduled-drop', 'booking']),
  scheduledAt: z.string().datetime({ offset: true }).optional(),
  liveSession: liveSessionDetailsSchema.optional(),
  modules: z.array(courseModuleSchema).optional(),
  displayCategory: z.enum([
    'courses-learning',
    'programs-coaching',
    'digital-assets',
    'premium-media',
    'live-experiences',
  ]).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
}).refine(
  (data) => data.accessModel === 'tier-included' || (data.price && data.price > 0),
  { message: 'Price is required for one-time and add-on products', path: ['price'] }
).refine(
  (data) => data.delivery !== 'scheduled-drop' || (data.scheduledAt && new Date(data.scheduledAt) > new Date()),
  { message: 'Scheduled drop requires a future date/time', path: ['scheduledAt'] }
).refine(
  (data) => data.type !== 'course' || (data.modules && data.modules.length > 0),
  { message: 'Course must have at least one module', path: ['modules'] }
).refine(
  (data) => data.type !== 'live-session' || data.liveSession,
  { message: 'Live session requires scheduling details', path: ['liveSession'] }
);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductDetailsInput = z.infer<typeof productDetailsSchema>;
export type ProductAccessInput = z.infer<typeof productAccessSchema>;
export type ProductDeliveryInput = z.infer<typeof productDeliverySchema>;
export type CourseModuleInput = z.infer<typeof courseModuleSchema>;
export type LiveSessionDetailsInput = z.infer<typeof liveSessionDetailsSchema>;