import type { Product, Tier, Bundle, ProductType, CourseModule, LiveSessionDetails } from '@/types/premiumContent';

const MOCK_CREATOR_ID = 'mock-creator-1';

let productsCache: Product[] = [];
let tiersCache: Tier[] = [];
let bundlesCache: Bundle[] = [];

function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function randomDate(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString();
}

function randomPastDate(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysOffset);
  return d.toISOString();
}

async function mockDelay(ms?: number): Promise<void> {
  const delay = ms ?? (200 + Math.random() * 300);
  await new Promise((resolve) => setTimeout(resolve, delay));
}

function initializeMocks() {
  if (productsCache.length > 0) return;

  const baseProducts: Product[] = [
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'course',
      title: 'Mastering Photography: From Beginner to Pro',
      description:
        'Complete 12-module course covering camera basics, composition, lighting, editing, and building a portfolio. Includes RAW files for practice.',
      accessModel: 'tier-included',
      currency: 'USDC',
      delivery: 'instant',
      modules: [
        { id: 'mod-1', title: 'Camera Fundamentals', order: 1, contentUrl: '#' },
        { id: 'mod-2', title: 'Exposure Triangle', order: 2, contentUrl: '#' },
        { id: 'mod-3', title: 'Composition Rules', order: 3, contentUrl: '#' },
        { id: 'mod-4', title: 'Natural Light Mastery', order: 4, contentUrl: '#' },
        { id: 'mod-5', title: 'Flash & Artificial Light', order: 5, contentUrl: '#' },
        { id: 'mod-6', title: 'Portrait Photography', order: 6, contentUrl: '#' },
        { id: 'mod-7', title: 'Landscape & Travel', order: 7, contentUrl: '#' },
        { id: 'mod-8', title: 'Post-Processing Workflow', order: 8, contentUrl: '#' },
        { id: 'mod-9', title: 'Color Grading', order: 9, contentUrl: '#' },
        { id: 'mod-10', title: 'Building Your Portfolio', order: 10, contentUrl: '#' },
        { id: 'mod-11', title: 'Client Work & Pricing', order: 11, contentUrl: '#' },
        { id: 'mod-12', title: 'Final Project & Review', order: 12, contentUrl: '#' },
      ],
      displayCategory: 'courses-learning',
      status: 'published',
      createdAt: randomPastDate(30),
      updatedAt: randomPastDate(5),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'gallery',
      title: 'Exclusive Tokyo Street Photography Collection',
      description:
        '50 high-resolution images from my 2024 Tokyo trip. Night streets, neon alleys, candid moments. All RAW + edited JPG included.',
      accessModel: 'one-time',
      price: 49,
      currency: 'USDC',
      delivery: 'instant',
      displayCategory: 'premium-media',
      status: 'published',
      createdAt: randomPastDate(15),
      updatedAt: randomPastDate(2),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'video',
      title: 'Behind the Scenes: Commercial Shoot Breakdown',
      description:
        'Full 45-minute walkthrough of a $50k commercial production. Lighting diagrams, gear list, client communication, post-production.',
      accessModel: 'one-time',
      price: 29,
      currency: 'USDC',
      delivery: 'instant',
      displayCategory: 'premium-media',
      status: 'published',
      createdAt: randomPastDate(10),
      updatedAt: randomPastDate(1),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'audio',
      title: 'Daily Creative Habits - 30 Day Audio Program',
      description:
        'Guided daily audio sessions (10 min each) to build consistent creative practice. Morning prompts, evening reflection, weekend deep-dives.',
      accessModel: 'tier-included',
      currency: 'USDC',
      delivery: 'instant',
      displayCategory: 'programs-coaching',
      status: 'published',
      createdAt: randomPastDate(45),
      updatedAt: randomPastDate(3),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'document',
      title: 'The Creator Business Blueprint (PDF + Templates)',
      description:
        '80-page guide + Notion templates for pricing, contracts, client onboarding, content calendar, and revenue tracking.',
      accessModel: 'one-time',
      price: 39,
      currency: 'USDC',
      delivery: 'instant',
      displayCategory: 'digital-assets',
      status: 'published',
      createdAt: randomPastDate(60),
      updatedAt: randomPastDate(7),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'live-session',
      title: 'Live Portfolio Review - Monthly Group Session',
      description:
        '90-minute live group call (max 15 people). Submit your work for live feedback. Q&A on pricing, clients, growth. Recording included.',
      accessModel: 'add-on',
      price: 99,
      currency: 'USDC',
      delivery: 'booking',
      liveSession: {
        scheduledAt: randomDate(7),
        durationMinutes: 90,
        capacity: 15,
      },
      displayCategory: 'live-experiences',
      status: 'published',
      createdAt: randomPastDate(5),
      updatedAt: randomPastDate(1),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'course',
      title: 'Video Editing Masterclass: DaVinci Resolve',
      description:
        '15 modules from basics to advanced color grading. Includes practice footage, LUTs, and project files. Beginner to professional workflow.',
      accessModel: 'tier-included',
      currency: 'USDC',
      delivery: 'instant',
      modules: [
        { id: 'mod-v1', title: 'Interface & Project Setup', order: 1, contentUrl: '#' },
        { id: 'mod-v2', title: 'Cut Page Essentials', order: 2, contentUrl: '#' },
        { id: 'mod-v3', title: 'Edit Page Deep Dive', order: 3, contentUrl: '#' },
        { id: 'mod-v4', title: 'Fusion Basics', order: 4, contentUrl: '#' },
        { id: 'mod-v5', title: 'Color Page Fundamentals', order: 5, contentUrl: '#' },
        { id: 'mod-v6', title: 'Node-Based Grading', order: 6, contentUrl: '#' },
        { id: 'mod-v7', title: 'Advanced Color Tools', order: 7, contentUrl: '#' },
        { id: 'mod-v8', title: 'Fairlight Audio', order: 8, contentUrl: '#' },
        { id: 'mod-v9', title: 'Delivery & Export', order: 9, contentUrl: '#' },
        { id: 'mod-v10', title: 'Collaborative Workflows', order: 10, contentUrl: '#' },
      ],
      displayCategory: 'courses-learning',
      status: 'draft',
      createdAt: randomPastDate(3),
      updatedAt: randomPastDate(1),
    },
    {
      id: genId('prod'),
      creatorId: MOCK_CREATOR_ID,
      type: 'gallery',
      title: 'Preset Pack: Cinematic Color Grades',
      description:
        '20 Lightroom/Capture One presets + 10 LUTs for video. Teal & orange, moody, vintage, clean modern. Before/after examples included.',
      accessModel: 'one-time',
      price: 24,
      currency: 'USDC',
      delivery: 'instant',
      displayCategory: 'digital-assets',
      status: 'published',
      createdAt: randomPastDate(20),
      updatedAt: randomPastDate(4),
    },
  ];

  productsCache = baseProducts;

  const tierIncludedProducts = baseProducts.filter((p) => p.accessModel === 'tier-included');

  tiersCache = [
    {
      id: genId('tier'),
      creatorId: MOCK_CREATOR_ID,
      name: 'Supporter',
      priceCycle: 'monthly',
      price: 5,
      currency: 'USDC',
      includedProductIds: tierIncludedProducts.slice(0, 2).map((p) => p.id),
      perks: [
        'Access to Supporter-only posts',
        'Monthly behind-the-scenes content',
        'Early access to public videos',
        'Discord Supporter role',
      ],
      status: 'active',
    },
    {
      id: genId('tier'),
      creatorId: MOCK_CREATOR_ID,
      name: 'Creator',
      priceCycle: 'monthly',
      price: 15,
      currency: 'USDC',
      includedProductIds: tierIncludedProducts.slice(0, 4).map((p) => p.id),
      perks: [
        'Everything in Supporter',
        'Full course library access',
        'Monthly live Q&A sessions',
        'Downloadable templates & presets',
        'Priority comment replies',
        'Creator Discord channel',
      ],
      status: 'active',
    },
    {
      id: genId('tier'),
      creatorId: MOCK_CREATOR_ID,
      name: 'Pro',
      priceCycle: 'monthly',
      price: 49,
      currency: 'USDC',
      includedProductIds: tierIncludedProducts.map((p) => p.id),
      perks: [
        'Everything in Creator',
        'All current & future courses',
        'Bi-weekly portfolio reviews',
        'Direct message access',
        'Co-working sessions',
        'Custom preset requests',
        'Pro Discord community',
      ],
      status: 'active',
    },
  ];

  bundlesCache = [
    {
      id: genId('bundle'),
      creatorId: MOCK_CREATOR_ID,
      title: 'Complete Photography Starter Kit',
      description:
        'Everything you need to start: Mastering Photography course + Tokyo Street Collection + Preset Pack. Save 35% vs buying separately.',
      productIds: baseProducts
        .filter((p) => p.type === 'course' || p.type === 'gallery' || p.type === 'document')
        .slice(0, 3)
        .map((p) => p.id),
      price: 89,
      currency: 'USDC',
      status: 'published',
    },
    {
      id: genId('bundle'),
      creatorId: MOCK_CREATOR_ID,
      title: 'Video Creator Bundle',
      description:
        'DaVinci Resolve Masterclass + Commercial Shoot Breakdown + Cinematic LUTs. Complete video production toolkit.',
      productIds: baseProducts.filter((p) => p.type === 'course' || p.type === 'video').slice(0, 3).map((p) => p.id),
      price: 79,
      currency: 'USDC',
      status: 'published',
    },
  ];
}

export async function getMockProducts(): Promise<Product[]> {
  initializeMocks();
  await mockDelay();
  return [...productsCache];
}

export async function getMockProduct(productId: string): Promise<Product | null> {
  initializeMocks();
  await mockDelay();
  return productsCache.find((p) => p.id === productId) ?? null;
}

export async function createMockProduct(payload: Partial<Product>): Promise<Product> {
  initializeMocks();
  await mockDelay();

  const types: ProductType[] = ['gallery', 'video', 'audio', 'document', 'course', 'live-session'];
  const type = (payload.type as ProductType) ?? types[Math.floor(Math.random() * types.length)];

  const newProduct: Product = {
    id: genId('prod'),
    creatorId: MOCK_CREATOR_ID,
    type,
    title: payload.title ?? `New ${type}`,
    description: payload.description,
    accessModel: payload.accessModel ?? 'one-time',
    price: payload.price ?? (type === 'course' ? 99 : 29),
    currency: payload.currency ?? 'USDC',
    delivery: payload.delivery ?? 'instant',
    scheduledAt: payload.scheduledAt,
    liveSession: payload.liveSession,
    modules: payload.modules,
    displayCategory: payload.displayCategory ?? 'premium-media',
    status: payload.status ?? 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (type === 'course' && !newProduct.modules) {
    newProduct.modules = Array.from({ length: 8 }, (_, i) => ({
      id: `mod-${i + 1}`,
      title: `Module ${i + 1}`,
      order: i + 1,
    }));
  }
  if (type === 'live-session' && !newProduct.liveSession) {
    newProduct.liveSession = {
      scheduledAt: randomDate(14),
      durationMinutes: 60,
      capacity: 20,
    };
  }

  productsCache.unshift(newProduct);
  return newProduct;
}

export async function updateMockProduct(productId: string, payload: Partial<Product>): Promise<Product> {
  initializeMocks();
  await mockDelay();

  const idx = productsCache.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error('Product not found');

  productsCache[idx] = {
    ...productsCache[idx],
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  return productsCache[idx];
}

export async function deleteMockProduct(productId: string): Promise<void> {
  initializeMocks();
  await mockDelay();
  productsCache = productsCache.filter((p) => p.id !== productId);
}

export async function getMockTiers(): Promise<Tier[]> {
  initializeMocks();
  await mockDelay();
  return [...tiersCache];
}

export async function getMockTier(tierId: string): Promise<Tier | null> {
  initializeMocks();
  await mockDelay();
  return tiersCache.find((t) => t.id === tierId) ?? null;
}

export async function saveMockTier(tierId: string | undefined, payload: Partial<Tier>): Promise<Tier> {
  initializeMocks();
  await mockDelay();

  if (tierId) {
    const idx = tiersCache.findIndex((t) => t.id === tierId);
    if (idx === -1) throw new Error('Tier not found');
    tiersCache[idx] = { ...tiersCache[idx], ...payload };
    return tiersCache[idx];
  }

  const newTier: Tier = {
    id: genId('tier'),
    creatorId: MOCK_CREATOR_ID,
    name: payload.name ?? 'New Tier',
    priceCycle: payload.priceCycle ?? 'monthly',
    price: payload.price ?? 0,
    currency: payload.currency ?? 'USDC',
    includedProductIds: payload.includedProductIds ?? [],
    perks: payload.perks ?? [],
    status: payload.status ?? 'active',
  };
  tiersCache.unshift(newTier);
  return newTier;
}

export async function deleteMockTier(tierId: string): Promise<void> {
  initializeMocks();
  await mockDelay();
  tiersCache = tiersCache.filter((t) => t.id !== tierId);
}

export async function getMockBundles(): Promise<Bundle[]> {
  initializeMocks();
  await mockDelay();
  return [...bundlesCache];
}

export async function getMockBundle(bundleId: string): Promise<Bundle | null> {
  initializeMocks();
  await mockDelay();
  return bundlesCache.find((b) => b.id === bundleId) ?? null;
}

export async function createMockBundle(payload: Partial<Bundle>): Promise<Bundle> {
  initializeMocks();
  await mockDelay();

  const newBundle: Bundle = {
    id: genId('bundle'),
    creatorId: MOCK_CREATOR_ID,
    title: payload.title ?? 'Untitled Bundle',
    description: payload.description,
    productIds: payload.productIds ?? [],
    price: payload.price ?? 0,
    currency: payload.currency ?? 'USDC',
    status: payload.status ?? 'draft',
  };
  bundlesCache.unshift(newBundle);
  return newBundle;
}

export async function updateMockBundle(bundleId: string, payload: Partial<Bundle>): Promise<Bundle> {
  initializeMocks();
  await mockDelay();

  const idx = bundlesCache.findIndex((b) => b.id === bundleId);
  if (idx === -1) throw new Error('Bundle not found');

  bundlesCache[idx] = {
    ...bundlesCache[idx],
    ...payload,
  };
  return bundlesCache[idx];
}

export async function deleteMockBundle(bundleId: string): Promise<void> {
  initializeMocks();
  await mockDelay();
  bundlesCache = bundlesCache.filter((b) => b.id !== bundleId);
}

export const mockProducts = [] as Product[];
export const mockTiers = [] as Tier[];
export const mockBundles = [] as Bundle[];

export function generateMockProduct(overrides: Partial<Product> = {}): Product {
  const types: ProductType[] = ['gallery', 'video', 'audio', 'document', 'course', 'live-session'];
  const type = (overrides.type as ProductType) ?? types[Math.floor(Math.random() * types.length)];

  const base: Product = {
    id: genId('prod'),
    creatorId: MOCK_CREATOR_ID,
    type,
    title: overrides.title ?? `New ${type}`,
    description: overrides.description,
    accessModel: overrides.accessModel ?? 'one-time',
    price: overrides.price ?? (type === 'course' ? 99 : 29),
    currency: overrides.currency ?? 'USDC',
    delivery: overrides.delivery ?? 'instant',
    scheduledAt: overrides.scheduledAt,
    liveSession: overrides.liveSession,
    modules: overrides.modules,
    displayCategory: overrides.displayCategory ?? 'premium-media',
    status: overrides.status ?? 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (type === 'course') {
    base.modules = Array.from({ length: 8 }, (_, i) => ({
      id: `mod-${i + 1}`,
      title: `Module ${i + 1}`,
      order: i + 1,
    }));
  }
  if (type === 'live-session') {
    base.liveSession = {
      scheduledAt: randomDate(14),
      durationMinutes: 60,
      capacity: 20,
    };
  }

  return { ...base, ...overrides };
}

export function generateMockTier(overrides: Partial<Tier> = {}): Tier {
  return {
    id: genId('tier'),
    creatorId: MOCK_CREATOR_ID,
    name: overrides.name ?? 'New Tier',
    priceCycle: overrides.priceCycle ?? 'monthly',
    price: overrides.price ?? 10,
    currency: overrides.currency ?? 'USDC',
    includedProductIds: overrides.includedProductIds ?? [],
    perks: overrides.perks ?? ['New perk'],
    status: overrides.status ?? 'active',
  };
}

export function generateMockBundle(overrides: Partial<Bundle> = {}): Bundle {
  return {
    id: genId('bundle'),
    creatorId: MOCK_CREATOR_ID,
    title: overrides.title ?? 'New Bundle',
    description: overrides.description,
    productIds: overrides.productIds ?? [],
    price: overrides.price ?? 49,
    currency: overrides.currency ?? 'USDC',
    status: overrides.status ?? 'draft',
  };
}