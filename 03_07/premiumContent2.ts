/**
 * Domenowy model Premium Content.
 *
 * Zasady (ustalone architektonicznie, nie zmieniać bez rewizji IA):
 * - ProductType to prymityw techniczny (co user faktycznie dostaje).
 * - DisplayCategory to WYŁĄCZNIE tag marketingowy do grupowania na storefroncie.
 *   Nie wpływa na access/pricing/delivery. Nigdy nie wnioskuj DisplayCategory
 *   z ProductType automatycznie — to zawsze ręczny wybór creatora.
 * - AccessModel określa czy produkt jest kupowany jednorazowo, wliczony w tier,
 *   czy jest płatnym dodatkiem do tieru.
 * - Tier <-> Product to relacja many-to-many (includedProductIds), NIE
 *   pole na produkcie wskazujące jeden tier.
 */

export type ProductType =
  | "gallery"
  | "video"
  | "audio"
  | "document"
  | "course"
  | "live-session";

export type AccessModel = "one-time" | "tier-included" | "add-on";

export type DeliveryModel = "instant" | "scheduled-drop" | "booking";

export type DisplayCategory =
  | "courses-learning"
  | "programs-coaching"
  | "digital-assets"
  | "premium-media"
  | "live-experiences";
// "membership-access" celowo pominięte — to nie jest wartość dla pojedynczego
// produktu, tylko sekcja storefrontu wynikająca z Tier.includedProductIds.

export type ProductStatus = "draft" | "published" | "archived";

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  contentUrl?: string;
}

export interface LiveSessionDetails {
  scheduledAt: string; // ISO datetime
  capacity?: number; // undefined = brak limitu
  durationMinutes: number;
}

export interface Product {
  id: string;
  creatorId: string;
  type: ProductType;
  title: string;
  description?: string;

  accessModel: AccessModel;
  /** Wymagane gdy accessModel !== "tier-included" */
  price?: number;
  currency: string;

  delivery: DeliveryModel;
  /** Wypełnione tylko gdy delivery === "scheduled-drop" */
  scheduledAt?: string;
  /** Wypełnione tylko gdy type === "live-session" */
  liveSession?: LiveSessionDetails;
  /** Wypełnione tylko gdy type === "course" */
  modules?: CourseModule[];

  displayCategory?: DisplayCategory;
  status: ProductStatus;

  createdAt: string;
  updatedAt: string;
}

export interface Bundle {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  productIds: string[];
  price: number;
  currency: string;
  status: ProductStatus;
}

export type PriceCycle = "monthly" | "yearly";

export interface Tier {
  id: string;
  creatorId: string;
  name: string;
  priceCycle: PriceCycle;
  price: number;
  currency: string;
  /** Many-to-many: produkt może być w wielu tierach jednocześnie. */
  includedProductIds: string[];
  /** Generyczna lista tekstowa, bez systemu per-archetyp. */
  perks: string[];
  status: "active" | "archived";
}

/** Metadane UI dla selektora typu produktu — jedno źródło prawdy dla labelek/opisów. */
export const PRODUCT_TYPE_META: Record<
  ProductType,
  { label: string; description: string }
> = {
  gallery: {
    label: "Gallery",
    description: "Zestaw zdjęć w wysokiej rozdzielczości",
  },
  video: {
    label: "Video",
    description: "Pojedyncze nagranie lub seria",
  },
  audio: {
    label: "Audio",
    description: "Nagranie dźwiękowe, sesja audio",
  },
  document: {
    label: "Document",
    description: "PDF, ebook, guide, template",
  },
  course: {
    label: "Course",
    description: "Kurs złożony z sekwencji modułów",
  },
  "live-session": {
    label: "Live Session",
    description: "Płatne wydarzenie na żywo z limitem miejsc",
  },
};
