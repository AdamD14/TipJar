import type {
  ProductType,
  AccessModel,
  DeliveryModel,
  DisplayCategory,
  ProductStatus,
  PriceCycle,
  CourseModule,
  LiveSessionDetails,
  Product,
  Tier,
  Bundle,
} from '@/types/premiumContent';

export interface CreateProductInput {
  type: ProductType;
  title: string;
  description?: string;
  accessModel: AccessModel;
  price?: number;
  currency: string;
  delivery: DeliveryModel;
  scheduledAt?: string;
  liveSession?: LiveSessionDetailsInput;
  modules?: CourseModuleInput[];
  displayCategory?: DisplayCategory;
  status: ProductStatus;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export interface LiveSessionDetailsInput {
  scheduledAt: string;
  durationMinutes: number;
  capacity?: number;
}

export interface CourseModuleInput {
  id?: string;
  title: string;
  order: number;
  contentUrl?: string;
}

export interface CreateTierInput {
  name: string;
  priceCycle: PriceCycle;
  price: number;
  currency: string;
  includedProductIds: string[];
  perks: string[];
  status: 'active' | 'archived';
}

export interface UpdateTierInput extends Partial<CreateTierInput> {
  id: string;
}

export interface CreateBundleInput {
  title: string;
  description?: string;
  productIds: string[];
  price: number;
  currency: string;
  status: ProductStatus;
}

export interface UpdateBundleInput extends Partial<CreateBundleInput> {
  id: string;
}

export interface AccessSettingsInput {
  allowedRegions: string[];
  blockedRegions: string[];
  defaultCurrency: string;
  supportedCurrencies: string[];
  requireAgeGate: boolean;
  ageGateThreshold: number;
}

export interface BillingInput {
  payoutSchedule: 'monthly' | 'weekly' | 'manual';
  minimumPayout: number;
  currency: string;
  taxInfo: {
    taxId?: string;
    country: string;
    region?: string;
  };
}

export type { Product, Tier, Bundle, ProductType, AccessModel, DeliveryModel, DisplayCategory, ProductStatus, PriceCycle, CourseModule, LiveSessionDetails };

export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, string[]>;

  constructor(message: string, code: string, status: number, details?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  static fromResponse(error: unknown): ApiError {
    if (error instanceof ApiError) return error;
    if (error instanceof Response) {
      return new ApiError('Network error', 'NETWORK_ERROR', error.status);
    }
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response?: { status: number; data?: { message?: string; code?: string; details?: Record<string, string[]> } } }).response;
      if (response) {
        return new ApiError(
          response.data?.message ?? 'API error',
          response.data?.code ?? 'API_ERROR',
          response.status,
          response.data?.details
        );
      }
    }
    if (error instanceof Error) {
      return new ApiError(error.message, 'UNKNOWN_ERROR', 500);
    }
    return new ApiError('Unknown error', 'UNKNOWN_ERROR', 500);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}