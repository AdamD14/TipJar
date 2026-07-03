import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { Product, Tier, Bundle } from "../../types/premiumContent";

const PRODUCTS_KEY = ["premium-content", "products"] as const;
const TIERS_KEY = ["premium-content", "tiers"] as const;

/** Lista produktów creatora (products/index). */
export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>(
        "/api/v1/creator/premium-content/products",
      );
      return data;
    },
  });
}

/** Tworzenie produktu — używane na końcu kreatora (products/create/). */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Product>) => {
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

/** Lista tierów creatora (tiers/index). */
export function useTiers() {
  return useQuery({
    queryKey: TIERS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Tier[]>(
        "/api/v1/creator/premium-content/tiers",
      );
      return data;
    },
  });
}

/**
 * Tworzenie/edycja tieru. includedProductIds to relacja many-to-many —
 * backend musi to zapisać jako join table, nie jako pole na produkcie.
 */
export function useSaveTier(tierId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Tier>) => {
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

const BUNDLES_KEY = ["premium-content", "bundles"] as const;

export function useBundles() {
  return useQuery({
    queryKey: BUNDLES_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Bundle[]>(
        "/api/v1/creator/premium-content/bundles",
      );
      return data;
    },
  });
}

export function useCreateBundle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Bundle>) => {
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
