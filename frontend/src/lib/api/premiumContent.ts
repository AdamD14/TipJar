import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import type { Product, Tier, Bundle, ProductType, ProductStatus, PriceCycle, CourseModule, LiveSessionDetails } from '@/types/premiumContent';
import {
  mockProducts,
  mockTiers,
  mockBundles,
  generateMockProduct,
  generateMockTier,
  generateMockBundle,
} from '@/lib/api/mocks/premiumContentMocks';
import type { ApiError } from '@/lib/api/premiumContent.types';

const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_PREMIUM_CONTENT === 'true';

export const PRODUCTS_KEY = ['premium-content', 'products'] as const;
export const TIERS_KEY = ['premium-content', 'tiers'] as const;
export const BUNDLES_KEY = ['premium-content', 'bundles'] as const;

export function productKey(id: string) {
  return [...PRODUCTS_KEY, id] as const;
}
export function tierKey(id: string) {
  return [...TIERS_KEY, id] as const;
}
export function bundleKey(id: string) {
  return [...BUNDLES_KEY, id] as const;
}

let productsCache = [...mockProducts];
let tiersCache = [...mockTiers];
let bundlesCache = [...mockBundles];

async function mockDelay(ms = 300) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function mockQuery<T>(data: T): T {
  return data;
}

async function mockMutation<T>(fn: () => T): Promise<T> {
  await mockDelay();
  return fn();
}

const defaultQueryOptions = {
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 30_000,
  gcTime: 5 * 60_000,
} satisfies Partial<UseQueryOptions<unknown, unknown>>;

export function useProducts(options?: Partial<UseQueryOptions<Product[], ApiError>>) {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        return mockQuery([...productsCache]);
      }
      const { data } = await apiClient.get<Product[]>('/api/v1/creator/premium-content/products');
      return data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useProduct(productId: string, options?: Partial<UseQueryOptions<Product | null, ApiError>>) {
  return useQuery({
    queryKey: productKey(productId),
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        const product = productsCache.find((p) => p.id === productId);
        return mockQuery(product ?? null);
      }
      const { data } = await apiClient.get<Product>(`/api/v1/creator/premium-content/products/${productId}`);
      return data;
    },
    enabled: !!productId,
    ...defaultQueryOptions,
    ...options,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { type: ProductType; title: string; description?: string; accessModel: 'one-time' | 'tier-included' | 'add-on'; price?: number; currency: string; delivery: 'instant' | 'scheduled-drop' | 'booking'; scheduledAt?: string; liveSession?: LiveSessionDetails; modules?: CourseModule[]; displayCategory?: string; status: ProductStatus }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const newProduct: Product = {
            id: `prod-${Date.now()}`,
            creatorId: 'mock-creator-1',
            type: payload.type,
            title: payload.title,
            description: payload.description,
            accessModel: payload.accessModel,
            price: payload.price,
            currency: payload.currency,
            delivery: payload.delivery,
            scheduledAt: payload.scheduledAt,
            liveSession: payload.liveSession,
            modules: payload.modules,
            displayCategory: payload.displayCategory as Product['displayCategory'],
            status: payload.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          productsCache.unshift(newProduct);
          return newProduct;
        });
      }
      const { data } = await apiClient.post<Product>('/api/v1/creator/premium-content/products', payload);
      return data;
    },
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: PRODUCTS_KEY });
      const previousProducts = queryClient.getQueryData<Product[]>(PRODUCTS_KEY);
      const optimisticProduct: Product = {
        id: `opt-${Date.now()}`,
        creatorId: 'mock-creator-1',
        type: newProduct.type,
        title: newProduct.title,
        description: newProduct.description,
        accessModel: newProduct.accessModel,
        price: newProduct.price,
        currency: newProduct.currency,
        delivery: newProduct.delivery,
        scheduledAt: newProduct.scheduledAt,
        liveSession: newProduct.liveSession,
        modules: newProduct.modules,
        displayCategory: newProduct.displayCategory as Product['displayCategory'],
        status: newProduct.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      queryClient.setQueryData<Product[]>(PRODUCTS_KEY, (old) => [optimisticProduct, ...(old ?? [])]);
      return { previousProducts };
    },
    onError: (err, variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCTS_KEY, context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
}

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Product>) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = productsCache.findIndex((p) => p.id === productId);
          if (idx === -1) throw new Error('Product not found');
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(`/api/v1/creator/premium-content/products/${productId}`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productKey(productId) });
      await queryClient.cancelQueries({ queryKey: PRODUCTS_KEY });
      const previousProduct = queryClient.getQueryData<Product | null>(productKey(productId));
      const previousProducts = queryClient.getQueryData<Product[]>(PRODUCTS_KEY);
      queryClient.setQueryData<Product | null>(productKey(productId), (old) => old ? { ...old, ...payload, updatedAt: new Date().toISOString() } : null);
      queryClient.setQueryData<Product[]>(PRODUCTS_KEY, (old) => old?.map((p) => p.id === productId ? { ...p, ...payload, updatedAt: new Date().toISOString() } : p) ?? []);
      return { previousProduct, previousProducts };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productKey(productId), context.previousProduct);
      }
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCTS_KEY, context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKey(productId) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
}

export function useUpdateProductContent(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { modules?: CourseModule[]; liveSession?: LiveSessionDetails; files?: File[] }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = productsCache.findIndex((p) => p.id === productId);
          if (idx === -1) throw new Error('Product not found');
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(`/api/v1/creator/premium-content/products/${productId}/content`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productKey(productId) });
      const previousProduct = queryClient.getQueryData<Product | null>(productKey(productId));
      queryClient.setQueryData<Product | null>(productKey(productId), (old) => old ? { ...old, ...payload, updatedAt: new Date().toISOString() } : null);
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productKey(productId), context.previousProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKey(productId) });
    },
  });
}

export function useUpdateProductAccess(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { accessModel: 'one-time' | 'tier-included' | 'add-on'; price?: number; currency: string }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = productsCache.findIndex((p) => p.id === productId);
          if (idx === -1) throw new Error('Product not found');
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(`/api/v1/creator/premium-content/products/${productId}/access`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productKey(productId) });
      const previousProduct = queryClient.getQueryData<Product | null>(productKey(productId));
      queryClient.setQueryData<Product | null>(productKey(productId), (old) => old ? { ...old, ...payload, updatedAt: new Date().toISOString() } : null);
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productKey(productId), context.previousProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKey(productId) });
    },
  });
}

export function useUpdateProductPricing(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { price?: number; currency: string }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = productsCache.findIndex((p) => p.id === productId);
          if (idx === -1) throw new Error('Product not found');
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(`/api/v1/creator/premium-content/products/${productId}/pricing`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productKey(productId) });
      const previousProduct = queryClient.getQueryData<Product | null>(productKey(productId));
      queryClient.setQueryData<Product | null>(productKey(productId), (old) => old ? { ...old, ...payload, updatedAt: new Date().toISOString() } : null);
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productKey(productId), context.previousProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKey(productId) });
    },
  });
}

export function useUpdateProductDelivery(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { delivery: 'instant' | 'scheduled-drop' | 'booking'; scheduledAt?: string }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = productsCache.findIndex((p) => p.id === productId);
          if (idx === -1) throw new Error('Product not found');
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(`/api/v1/creator/premium-content/products/${productId}/delivery`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productKey(productId) });
      const previousProduct = queryClient.getQueryData<Product | null>(productKey(productId));
      queryClient.setQueryData<Product | null>(productKey(productId), (old) => old ? { ...old, ...payload, updatedAt: new Date().toISOString() } : null);
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productKey(productId), context.previousProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKey(productId) });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          productsCache = productsCache.filter((p) => p.id !== productId);
        });
      }
      await apiClient.delete(`/api/v1/creator/premium-content/products/${productId}`);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: PRODUCTS_KEY });
      const previousProducts = queryClient.getQueryData<Product[]>(PRODUCTS_KEY);
      queryClient.setQueryData<Product[]>(PRODUCTS_KEY, (old) => old?.filter((p) => p.id !== productId) ?? []);
      return { previousProducts };
    },
    onError: (err, variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCTS_KEY, context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
}

export function useTiers(options?: Partial<UseQueryOptions<Tier[], ApiError>>) {
  return useQuery({
    queryKey: TIERS_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        return mockQuery([...tiersCache]);
      }
      const { data } = await apiClient.get<Tier[]>('/api/v1/creator/premium-content/tiers');
      return data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useTier(tierId: string, options?: Partial<UseQueryOptions<Tier | null, ApiError>>) {
  return useQuery({
    queryKey: tierKey(tierId),
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        const tier = tiersCache.find((t) => t.id === tierId);
        return mockQuery(tier ?? null);
      }
      const { data } = await apiClient.get<Tier>(`/api/v1/creator/premium-content/tiers/${tierId}`);
      return data;
    },
    enabled: !!tierId,
    ...defaultQueryOptions,
    ...options,
  });
}

export function useSaveTier(tierId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string; priceCycle: PriceCycle; price: number; currency: string; includedProductIds: string[]; perks: string[]; status: 'active' | 'archived' }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          if (tierId) {
            const idx = tiersCache.findIndex((t) => t.id === tierId);
            if (idx === -1) throw new Error('Tier not found');
            tiersCache[idx] = { ...tiersCache[idx], ...payload };
            return tiersCache[idx];
          }
          const newTier: Tier = {
            id: `tier-${Date.now()}`,
            creatorId: 'mock-creator-1',
            name: payload.name,
            priceCycle: payload.priceCycle,
            price: payload.price,
            currency: payload.currency,
            includedProductIds: payload.includedProductIds,
            perks: payload.perks,
            status: payload.status,
          };
          tiersCache.unshift(newTier);
          return newTier;
        });
      }
      const { data } = tierId
        ? await apiClient.patch<Tier>(`/api/v1/creator/premium-content/tiers/${tierId}`, payload)
        : await apiClient.post<Tier>('/api/v1/creator/premium-content/tiers', payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: TIERS_KEY });
      const previousTiers = queryClient.getQueryData<Tier[]>(TIERS_KEY);
      if (tierId) {
        queryClient.setQueryData<Tier[]>(TIERS_KEY, (old) => old?.map((t) => t.id === tierId ? { ...t, ...payload } : t) ?? []);
      } else {
        const optimisticTier: Tier = {
          id: `opt-${Date.now()}`,
          creatorId: 'mock-creator-1',
          ...payload,
        };
        queryClient.setQueryData<Tier[]>(TIERS_KEY, (old) => [optimisticTier, ...(old ?? [])]);
      }
      return { previousTiers };
    },
    onError: (err, variables, context) => {
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_KEY, context.previousTiers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_KEY });
    },
  });
}

export function useDeleteTier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tierId: string) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          tiersCache = tiersCache.filter((t) => t.id !== tierId);
        });
      }
      await apiClient.delete(`/api/v1/creator/premium-content/tiers/${tierId}`);
    },
    onMutate: async (tierId) => {
      await queryClient.cancelQueries({ queryKey: TIERS_KEY });
      const previousTiers = queryClient.getQueryData<Tier[]>(TIERS_KEY);
      queryClient.setQueryData<Tier[]>(TIERS_KEY, (old) => old?.filter((t) => t.id !== tierId) ?? []);
      return { previousTiers };
    },
    onError: (err, variables, context) => {
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_KEY, context.previousTiers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_KEY });
    },
  });
}

export function useBundles(options?: Partial<UseQueryOptions<Bundle[], ApiError>>) {
  return useQuery({
    queryKey: BUNDLES_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        return mockQuery([...bundlesCache]);
      }
      const { data } = await apiClient.get<Bundle[]>('/api/v1/creator/premium-content/bundles');
      return data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useBundle(bundleId: string, options?: Partial<UseQueryOptions<Bundle | null, ApiError>>) {
  return useQuery({
    queryKey: bundleKey(bundleId),
    queryFn: async () => {
      if (MOCK_MODE) {
        await mockDelay();
        const bundle = bundlesCache.find((b) => b.id === bundleId);
        return mockQuery(bundle ?? null);
      }
      const { data } = await apiClient.get<Bundle>(`/api/v1/creator/premium-content/bundles/${bundleId}`);
      return data;
    },
    enabled: !!bundleId,
    ...defaultQueryOptions,
    ...options,
  });
}

export function useCreateBundle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { title: string; description?: string; productIds: string[]; price: number; currency: string; status: ProductStatus }) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const newBundle: Bundle = {
            id: `bundle-${Date.now()}`,
            creatorId: 'mock-creator-1',
            title: payload.title,
            description: payload.description,
            productIds: payload.productIds,
            price: payload.price,
            currency: payload.currency,
            status: payload.status,
          };
          bundlesCache.unshift(newBundle);
          return newBundle;
        });
      }
      const { data } = await apiClient.post<Bundle>('/api/v1/creator/premium-content/bundles', payload);
      return data;
    },
    onMutate: async (newBundle) => {
      await queryClient.cancelQueries({ queryKey: BUNDLES_KEY });
      const previousBundles = queryClient.getQueryData<Bundle[]>(BUNDLES_KEY);
      const optimisticBundle: Bundle = {
        id: `opt-${Date.now()}`,
        creatorId: 'mock-creator-1',
        title: newBundle.title,
        description: newBundle.description,
        productIds: newBundle.productIds,
        price: newBundle.price,
        currency: newBundle.currency,
        status: newBundle.status,
      };
      queryClient.setQueryData<Bundle[]>(BUNDLES_KEY, (old) => [optimisticBundle, ...(old ?? [])]);
      return { previousBundles };
    },
    onError: (err, variables, context) => {
      if (context?.previousBundles) {
        queryClient.setQueryData(BUNDLES_KEY, context.previousBundles);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BUNDLES_KEY });
    },
  });
}

export function useUpdateBundle(bundleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Bundle>) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const idx = bundlesCache.findIndex((b) => b.id === bundleId);
          if (idx === -1) throw new Error('Bundle not found');
          bundlesCache[idx] = {
            ...bundlesCache[idx],
            ...payload,
          };
          return bundlesCache[idx];
        });
      }
      const { data } = await apiClient.patch<Bundle>(`/api/v1/creator/premium-content/bundles/${bundleId}`, payload);
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: bundleKey(bundleId) });
      await queryClient.cancelQueries({ queryKey: BUNDLES_KEY });
      const previousBundle = queryClient.getQueryData<Bundle | null>(bundleKey(bundleId));
      const previousBundles = queryClient.getQueryData<Bundle[]>(BUNDLES_KEY);
      queryClient.setQueryData<Bundle | null>(bundleKey(bundleId), (old) => old ? { ...old, ...payload } : null);
      queryClient.setQueryData<Bundle[]>(BUNDLES_KEY, (old) => old?.map((b) => b.id === bundleId ? { ...b, ...payload } : b) ?? []);
      return { previousBundle, previousBundles };
    },
    onError: (err, variables, context) => {
      if (context?.previousBundle) {
        queryClient.setQueryData(bundleKey(bundleId), context.previousBundle);
      }
      if (context?.previousBundles) {
        queryClient.setQueryData(BUNDLES_KEY, context.previousBundles);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bundleKey(bundleId) });
      queryClient.invalidateQueries({ queryKey: BUNDLES_KEY });
    },
  });
}

export function useDeleteBundle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bundleId: string) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          bundlesCache = bundlesCache.filter((b) => b.id !== bundleId);
        });
      }
      await apiClient.delete(`/api/v1/creator/premium-content/bundles/${bundleId}`);
    },
    onMutate: async (bundleId) => {
      await queryClient.cancelQueries({ queryKey: BUNDLES_KEY });
      const previousBundles = queryClient.getQueryData<Bundle[]>(BUNDLES_KEY);
      queryClient.setQueryData<Bundle[]>(BUNDLES_KEY, (old) => old?.filter((b) => b.id !== bundleId) ?? []);
      return { previousBundles };
    },
    onError: (err, variables, context) => {
      if (context?.previousBundles) {
        queryClient.setQueryData(BUNDLES_KEY, context.previousBundles);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BUNDLES_KEY });
    },
  });
}

export function useAccessSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { allowedRegions: string[]; blockedRegions: string[]; defaultCurrency: string; supportedCurrencies: string[]; requireAgeGate: boolean; ageGateThreshold: number }) => {
      if (MOCK_MODE) {
        return mockMutation(() => payload);
      }
      const { data } = await apiClient.patch('/api/v1/creator/premium-content/access-settings', payload);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['premium-content', 'access-settings'] });
    },
  });
}

export function useBilling() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { payoutSchedule: 'monthly' | 'weekly' | 'manual'; minimumPayout: number; currency: string; taxInfo: { taxId?: string; country: string; region?: string } }) => {
      if (MOCK_MODE) {
        return mockMutation(() => payload);
      }
      const { data } = await apiClient.patch('/api/v1/creator/premium-content/billing', payload);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['premium-content', 'billing'] });
    },
  });
}

export { MOCK_MODE };