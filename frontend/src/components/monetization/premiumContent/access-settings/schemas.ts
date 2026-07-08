import { z } from 'zod';

export const accessSettingsSchema = z.object({
  allowedRegions: z.array(z.string().length(2, 'Region must be a 2-letter country code')).default([]),
  blockedRegions: z.array(z.string().length(2, 'Region must be a 2-letter country code')).default([]),
  defaultCurrency: z.string().length(3, 'Currency must be a 3-letter code').default('USDC'),
  supportedCurrencies: z.array(z.string().length(3)).default(['USDC']),
  requireAgeGate: z.boolean().default(false),
  ageGateThreshold: z.number().int().min(13, 'Minimum age is 13').max(21, 'Maximum age gate is 21').default(18),
}).strict();

export type AccessSettingsInput = z.infer<typeof accessSettingsSchema>;