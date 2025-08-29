import { z } from 'zod';

export const identitySchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/i),
  avatarUrl: z.string().url(),
  coverUrl: z.string().url().optional().or(z.literal('')),
});

export const bioSchema = z.object({
  displayName: z.string().min(2).max(60),
  bio: z.string().min(10).max(280),
  socials: z.object({
    website: z.string().url().optional().or(z.literal('')),
    x: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
    twitch: z.string().url().optional().or(z.literal('')),
  }),
});

export const tierSchema = z.object({
  name: z.string().min(2).max(40),
  priceCents: z.number().int().min(100).max(100000),
  perks: z.array(z.string().min(2)).min(1),
  active: z.boolean(),
});

