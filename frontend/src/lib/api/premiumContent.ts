import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { Product, Tier, Bundle } from "@/types/premiumContent";
import {
  mockProducts,
  mockTiers,
  mockBundles,
  generateMockProduct,
  generateMockTier,
  generateMockBundle,
  mockDelay,
} from "@/lib/api/mocks/premiumContentMocks";

const MOCK_MODE = true;

const PRODUCTS_KEY = ["premium-content", "products"] as const;
const TIERS_KEY = ["premium-content", "tiers"] as const;
const BUNDLES_KEY = ["premium-content", "bundles"] as const;

let productsCache = [...mockProducts];
let tiersCache = [...mockTiers];
let bundlesCache = [...mockBundles];

function invalidateProducts() {
  return productsCache;
}
function invalidateTiers() {
  return tiersCache;
}
function invalidateBundles() {
  return bundlesCache;
}

function mockQuery<T>(data: T): Promise<T> {
  return mockDelay().then(() => data);
}

function mockMutation<T>(fn: () => T): Promise<T> {
  return mockDelay().then(fn);
}

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        return mockQuery([...productsCache]);
      }
      const { data } = await apiClient.get<Product[]>(
        "/api/v1/creator/premium-content/products",
      );
      return data;
    },
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, productId],
    queryFn: async () => {
      if (MOCK_MODE) {
        const product = productsCache.find((p) => p.id === productId);
        return mockQuery(product ?? null);
      }
      const { data } = await apiClient.get<Product>(
        `/api/v1/creator/premium-content/products/${productId}`,
      );
      return data;
    },
    enabled: !!productId,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Product>) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const newProduct: Product = {
            id: `prod-${Date.now()}`,
            creatorId: "mock-creator-1",
            type: (payload.type as Product["type"]) ?? "gallery",
            title: payload.title ?? "Untitled",
            description: payload.description,
            accessModel: payload.accessModel ?? "one-time",
            price: payload.price,
            currency: payload.currency ?? "USDC",
            delivery: payload.delivery ?? "instant",
            scheduledAt: payload.scheduledAt,
            liveSession: payload.liveSession,
            modules: payload.modules,
            displayCategory: payload.displayCategory,
            status: payload.status ?? "draft",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          productsCache.unshift(newProduct);
          return newProduct;
        });
      }
      const { data } = await apiClient.post<Product>(
        "/api/v1/creator/premium-content/products",
        payload,
      );
      return data;
    },
    onSuccess: () => {
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
          if (idx === -1) throw new Error("Product not found");
          productsCache[idx] = {
            ...productsCache[idx],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          return productsCache[idx];
        });
      }
      const { data } = await apiClient.patch<Product>(
        `/api/v1/creator/premium-content/products/${productId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
}

export function useTiers() {
  return useQuery({
    queryKey: TIERS_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        return mockQuery([...tiersCache]);
      }
      const { data } = await apiClient.get<Tier[]>(
        "/api/v1/creator/premium-content/tiers",
      );
      return data;
    },
  });
}

export function useTier(tierId: string) {
  return useQuery({
    queryKey: [...TIERS_KEY, tierId],
    queryFn: async () => {
      if (MOCK_MODE) {
        const tier = tiersCache.find((t) => t.id === tierId);
        return mockQuery(tier ?? null);
      }
      const { data } = await apiClient.get<Tier>(
        `/api/v1/creator/premium-content/tiers/${tierId}`,
      );
      return data;
    },
    enabled: !!tierId,
  });
}

export function useSaveTier(tierId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Tier>) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          if (tierId) {
            const idx = tiersCache.findIndex((t) => t.id === tierId);
            if (idx === -1) throw new Error("Tier not found");
            tiersCache[idx] = { ...tiersCache[idx], ...payload };
            return tiersCache[idx];
          }
          const newTier: Tier = {
            id: `tier-${Date.now()}`,
            creatorId: "mock-creator-1",
            name: payload.name ?? "New Tier",
            priceCycle: payload.priceCycle ?? "monthly",
            price: payload.price ?? 0,
            currency: payload.currency ?? "USDC",
            includedProductIds: payload.includedProductIds ?? [],
            perks: payload.perks ?? [],
            status: payload.status ?? "active",
          };
          tiersCache.unshift(newTier);
          return newTier;
        });
      }
      const { data } = tierId
        ? await apiClient.patch<Tier>(
            `/api/v1/creator/premium-content/tiers/${tierId}`,
            payload,
          )
        : await apiClient.post<Tier>(
            "/api/v1/creator/premium-content/tiers",
            payload,
          );
      return data;
    },
    onSuccess: () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_KEY });
    },
  });
}

export function useBundles() {
  return useQuery({
    queryKey: BUNDLES_KEY,
    queryFn: async () => {
      if (MOCK_MODE) {
        return mockQuery([...bundlesCache]);
      }
      const { data } = await apiClient.get<Bundle[]>(
        "/api/v1/creator/premium-content/bundles",
      );
      return data;
    },
  });
}

export function useBundle(bundleId: string) {
  return useQuery({
    queryKey: [...BUNDLES_KEY, bundleId],
    queryFn: async () => {
      if (MOCK_MODE) {
        const bundle = bundlesCache.find((b) => b.id === bundleId);
        return mockQuery(bundle ?? null);
      }
      const { data } = await apiClient.get<Bundle>(
        `/api/v1/creator/premium-content/bundles/${bundleId}`,
      );
      return data;
    },
    enabled: !!bundleId,
  });
}

export function useCreateBundle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Bundle>) => {
      if (MOCK_MODE) {
        return mockMutation(() => {
          const newBundle: Bundle = {
            id: `bundle-${Date.now()}`,
            creatorId: "mock-creator-1",
            title: payload.title ?? "Untitled Bundle",
            description: payload.description,
            productIds: payload.productIds ?? [],
            price: payload.price ?? 0,
            currency: payload.currency ?? "USDC",
            status: payload.status ?? "draft",
          };
          bundlesCache.unshift(newBundle);
          return newBundle;
        });
      }
      const { data } = await apiClient.post<Bundle>(
        "/api/v1/creator/premium-content/bundles",
        payload,
      );
      return data;
    },
    onSuccess: () => {
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
          if (idx === -1) throw new Error("Bundle not found");
          bundlesCache[idx] = {
            ...bundlesCache[idx],
            ...payload,
          };
          return bundlesCache[idx];
        });
      }
      const { data } = await apiClient.patch<Bundle>(
        `/api/v1/creator/premium-content/bundles/${bundleId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUNDLES_KEY });
    },
  });
}

export { MOCK_MODE };