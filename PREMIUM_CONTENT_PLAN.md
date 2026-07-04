# PREMIUM CONTENT - COMPLETE IMPLEMENTATION PLAN (UPDATED)
## Target Path: `frontend/src/app/@[username]/creator-desktop/studio/monetization/premiumContent/`

---

## 1. EXISTING STRUCTURE ANALYSIS

### Current App Router Structure
```
/frontend/src/app/[username]/creator-desktop/
├── layout.tsx (has RQProvider, Navbar, CreatorSidebar, PathBreadcrumb)
├── studio/
│   └── page.tsx (empty <div className="pt-14" />)
└── monetization/  ← DOES NOT EXIST YET
```

### Existing UI Components (src/components/ui/)
| Component | Path | Status |
|-----------|------|--------|
| Button | `ui/buttons/Button.tsx` | ✅ Variants: primary, secondary, tertiary, ghost, danger, link, glass, cta-gold-01..04 |
| Input | `ui/forms/Input.tsx` | ✅ |
| Toast/useToast | `ui/notifications/Toast.tsx` | ✅ |
| Spinner | `ui/Spinner.tsx` | ✅ |
| Modal | `ui/Modal.tsx` | ✅ |
| Select | `ui/Select.tsx` | ✅ |
| errors/normalize | `lib/api/errors.ts` | ✅ |
| apiClient | `lib/apiClient.ts` | ✅ axios with auth interceptor |

### Auth Pattern
```tsx
import { useAuthStore } from "@/lib/store/authStore";
const user = useAuthStore((s) => s.user);
const creatorId = user?.id;  // Used in queries
```
User object: `{ id, username, role: "CREATOR"|"FAN", email, displayName, avatarUrl, ... }`

---

## 2. BACKEND STATUS
**Premium Content routes DO NOT EXIST** in NestJS (not in startup logs). 
- Need to create mock data/hooks for now
- Backend routes to implement later: `/api/v1/creator/premium-content/products`, `/tiers`, `/bundles`

---

## 3. SOURCE FILES FROM 04_07 (18 components + types + hooks)

### Types & API (3 files)
| Source | Target | Status |
|--------|--------|--------|
| `04_07/premiumContent2.ts` | `src/types/premiumContent.ts` | ✅ Ready - domain types |
| `04_07/mnt/user-data/outputs/premium-content/lib/api/premiumContent.ts` | `src/lib/api/premiumContent.ts` | ⚠️ Needs path fixes + mock mode |
| `04_07/premiumContent.ts` | **DELETE** (duplicate) | ❌ Remove |

### Components - Products (7 files)
| Source | Target | Notes |
|--------|--------|-------|
| `04_07/ProductCreateWizard.tsx` | `components/monetization/premiumContent/products/ProductCreateWizard.tsx` | Main entry, step 1+2 |
| `04_07/ProductTypeSelector.tsx` | `components/monetization/premiumContent/products/ProductTypeSelector.tsx` | Step 1 |
| `04_07/ProductDetailsForm.tsx` | `components/monetization/premiumContent/products/ProductDetailsForm.tsx` | Step 2 orchestrator |
| `04_07/ProductAccessSection.tsx` | `components/monetization/premiumContent/products/ProductAccessSection.tsx` | Access/pricing/delivery |
| `04_07/DisplayCategoryPicker.tsx` | `components/monetization/premiumContent/products/DisplayCategoryPicker.tsx` | Marketing tag |
| `04_07/content/CourseModulesEditor.tsx` | `components/monetization/premiumContent/products/content/CourseModulesEditor.tsx` | Type-specific |
| `04_07/content/LiveSessionScheduler.tsx` | `components/monetization/premiumContent/products/content/LiveSessionScheduler.tsx` | Type-specific |
| `04_07/content/GenericContentUpload.tsx` | `components/monetization/premiumContent/products/content/GenericContentUpload.tsx` | Type-specific |

### Components - Tiers (3 files)
| Source | Target | Notes |
|--------|--------|-------|
| `04_07/TierForm.tsx` | `components/monetization/premiumContent/tiers/TierForm.tsx` | Config + preview |
| `04_07/TierPerksEditor.tsx` | `components/monetization/premiumContent/tiers/TierPerksEditor.tsx` | Perks list |
| `04_07/TierCompareView.tsx` | `components/monetization/premiumContent/tiers/TierCompareView.tsx` | Fan-facing public |

### Components - Bundles (1 file)
| Source | Target | Notes |
|--------|--------|-------|
| `04_07/BundleForm.tsx` | `components/monetization/premiumContent/bundles/BundleForm.tsx` | Multi-select + price |

### Components - Shared (2 files)
| Source | Target | Notes |
|--------|--------|-------|
| `04_07/ProductMultiSelect.tsx` | `components/monetization/premiumContent/products/ProductMultiSelect.tsx` | Used by Tiers + Bundles |
| `04_07/PremiumContentIndexes.tsx` | `components/monetization/premiumContent/PremiumContentIndexes.tsx` | 3 indexes (Products/Tiers/Bundles) |

---

## 4. TARGET FOLDER STRUCTURE TO CREATE

```
frontend/
├── src/
│   ├── app/
│   │   └── @[username]/
│   │       └── creator-desktop/
│   │           └── studio/
│   │               └── monetization/
│   │                   └── premiumContent/
│   │                       ├── layout.tsx                    ← NEW (tab nav)
│   │                       ├── page.tsx                      ← NEW (redirect to products)
│   │                       ├── products/
│   │                       │   ├── page.tsx                  ← NEW (ProductsIndex)
│   │                       │   ├── create/
│   │                       │   │   └── page.tsx              ← NEW (ProductCreateWizard)
│   │                       │   └── [productId]/
│   │                       │       ├── page.tsx              ← NEW (placeholder)
│   │                       │       ├── content/page.tsx      ← NEW (placeholder)
│   │                       │       ├── access/page.tsx       ← NEW (placeholder)
│   │                       │       ├── pricing/page.tsx      ← NEW (placeholder)
│   │                       │       └── delivery/page.tsx     ← NEW (placeholder)
│   │                       ├── tiers/
│   │                       │   ├── page.tsx                  ← NEW (TiersIndex)
│   │                       │   ├── create/
│   │                       │   │   └── page.tsx              ← NEW (TierForm create)
│   │                       │   ├── [tierId]/
│   │                       │   │   └── page.tsx              ← NEW (TierForm edit)
│   │                       │   └── compare/
│   │                       │       └── page.tsx              ← NEW (TierCompareView - public)
│   │                       ├── bundles/
│   │                       │   ├── page.tsx                  ← NEW (BundlesIndex)
│   │                       │   └── create/
│   │                       │       └── page.tsx              ← NEW (BundleForm)
│   │                       ├── access-settings/
│   │                       │   └── page.tsx                  ← NEW (placeholder)
│   │                       └── billing/
│   │                           └── page.tsx                  ← NEW (placeholder)
│   │
│   ├── components/
│   │   └── monetization/
│   │       └── premiumContent/
│   │           ├── products/
│   │           │   ├── ProductCreateWizard.tsx               ← FROM 04_07
│   │           │   ├── ProductTypeSelector.tsx               ← FROM 04_07
│   │           │   ├── ProductDetailsForm.tsx                ← FROM 04_07
│   │           │   ├── ProductAccessSection.tsx              ← FROM 04_07
│   │           │   ├── DisplayCategoryPicker.tsx             ← FROM 04_07
│   │           │   ├── ProductMultiSelect.tsx                ← FROM 04_07
│   │           │   └── content/
│   │           │       ├── CourseModulesEditor.tsx           ← FROM 04_07
│   │           │       ├── LiveSessionScheduler.tsx          ← FROM 04_07
│   │           │       └── GenericContentUpload.tsx          ← FROM 04_07
│   │           ├── tiers/
│   │           │   ├── TierForm.tsx                          ← FROM 04_07
│   │           │   ├── TierPerksEditor.tsx                   ← FROM 04_07
│   │           │   └── TierCompareView.tsx                   ← FROM 04_07
│   │           ├── bundles/
│   │           │   └── BundleForm.tsx                        ← FROM 04_07
│   │           └── PremiumContentIndexes.tsx                 ← FROM 04_07
│   │
│   ├── lib/
│   │   └── api/
│   │       └── premiumContent.ts                             ← FROM 04_07/mnt/... (fix paths + add mock)
│   │
│   └── types/
│       └── premiumContent.ts                                 ← FROM 04_07/premiumContent2.ts
```

---

## 5. REQUIRED MODIFICATIONS TO SOURCE FILES

### 5.1 Import Path Fixes (ALL components)
```tsx
// BEFORE (relative from 04_07)
import type { ProductType } from "../../types/premiumContent";
import { PRODUCT_TYPE_META } from "../../types/premiumContent";
import { useCreateProduct } from "../../lib/api/premiumContent";

// AFTER (absolute from @/)
import type { ProductType } from "@/types/premiumContent";
import { PRODUCT_TYPE_META } from "@/types/premiumContent";
import { useCreateProduct } from "@/lib/api/premiumContent";
```

### 5.2 API Hooks (`lib/api/premiumContent.ts`)
```tsx
// Fix import
import type { Product, Tier, Bundle } from "@/types/premiumContent";

// Add MOCK_MODE flag
const MOCK_MODE = true; // Set to false when backend ready

// Mock data generators for each hook
const mockProducts: Product[] = [/* ... */];
const mockTiers: Tier[] = [/* ... */];
const mockBundles: Bundle[] = [/* ... */];

// Each hook checks MOCK_MODE and returns mock data
```

### 5.3 Mock Data Location
Create `/src/lib/api/mocks/premiumContentMocks.ts` with all mock data - single source of truth.

---

## 6. IMPLEMENTATION ORDER (One by one, no parallel)

### Phase 1: Foundation (2 files)
1. `src/types/premiumContent.ts` - Copy from `04_07/premiumContent2.ts`
2. `src/lib/api/mocks/premiumContentMocks.ts` - Create mock data
3. `src/lib/api/premiumContent.ts` - Copy from 04_07/mnt + fix imports + add mock mode

### Phase 2: Shared Component (1 file)
4. `components/monetization/premiumContent/products/ProductMultiSelect.tsx`

### Phase 3: Product Content Editors (3 files - bottom up)
5. `components/monetization/premiumContent/products/content/CourseModulesEditor.tsx`
6. `components/monetization/premiumContent/products/content/LiveSessionScheduler.tsx`
7. `components/monetization/premiumContent/products/content/GenericContentUpload.tsx`

### Phase 4: Product Form Sections (3 files)
8. `components/monetization/premiumContent/products/DisplayCategoryPicker.tsx`
9. `components/monetization/premiumContent/products/ProductAccessSection.tsx`
10. `components/monetization/premiumContent/products/ProductTypeSelector.tsx`

### Phase 5: Product Main Forms (2 files)
11. `components/monetization/premiumContent/products/ProductDetailsForm.tsx`
12. `components/monetization/premiumContent/products/ProductCreateWizard.tsx`

### Phase 6: Tier Components (3 files - bottom up)
13. `components/monetization/premiumContent/tiers/TierPerksEditor.tsx`
14. `components/monetization/premiumContent/tiers/TierForm.tsx`
15. `components/monetization/premiumContent/tiers/TierCompareView.tsx`

### Phase 7: Bundle Components (1 file)
16. `components/monetization/premiumContent/bundles/BundleForm.tsx`

### Phase 8: Index Component (1 file)
17. `components/monetization/premiumContent/PremiumContentIndexes.tsx`

### Phase 9: App Router Pages (14 files)
18. `app/@[username]/creator-desktop/studio/monetization/premiumContent/layout.tsx`
19. `app/@[username]/creator-desktop/studio/monetization/premiumContent/page.tsx`
20. `app/@[username]/creator-desktop/studio/monetization/premiumContent/products/page.tsx`
21. `app/@[username]/creator-desktop/studio/monetization/premiumContent/products/create/page.tsx`
22. `app/@[username]/creator-desktop/studio/monetization/premiumContent/tiers/page.tsx`
23. `app/@[username]/creator-desktop/studio/monetization/premiumContent/tiers/create/page.tsx`
24. `app/@[username]/creator-desktop/studio/monetization/premiumContent/tiers/[tierId]/page.tsx`
25. `app/@[username]/creator-desktop/studio/monetization/premiumContent/tiers/compare/page.tsx`
26. `app/@[username]/creator-desktop/studio/monetization/premiumContent/bundles/page.tsx`
27. `app/@[username]/creator-desktop/studio/monetization/premiumContent/bundles/create/page.tsx`
28. `app/@[username]/creator-desktop/studio/monetization/premiumContent/access-settings/page.tsx`
29. `app/@[username]/creator-desktop/studio/monetization/premiumContent/billing/page.tsx`
30-33. Product detail placeholders (4 files)

---

## 7. MOCK DATA LOCATIONS (Single Source)

**File:** `/src/lib/api/mocks/premiumContentMocks.ts`
- `mockProducts: Product[]`
- `mockTiers: Tier[]`
- `mockBundles: Bundle[]`
- `generateMockProduct(type): Product`
- `generateMockTier(): Tier`
- `generateMockBundle(): Bundle`

**File:** `/src/lib/api/premiumContent.ts`
- `MOCK_MODE = true` constant
- Each hook checks `MOCK_MODE` and returns mock data with simulated delay

**When backend ready:**
1. Set `MOCK_MODE = false`
2. Verify endpoints match `/api/v1/creator/premium-content/*`
3. Remove mock imports

---

## 8. KEY ARCHITECTURAL DECISIONS

| Decision | Rationale |
|----------|-----------|
| `@/types/premiumContent` + `@/lib/api/premiumContent` | Absolute imports per project convention |
| `components/monetization/premiumContent/` | Mirrors app router, co-locates feature |
| `ProductMultiSelect` shared | Single source for product selection (tiers + bundles) |
| `content/` subfolder | Type-specific editors (course, live, generic) |
| Tab navigation in layout | Consistent with other studio sections |
| Placeholders for access-settings/billing | Per README - "formularzowe, bez wielkiej logiki" |
| Mock mode in API hooks | Unblock frontend dev, swap when backend ready |
| `@[username]` route segment | Matches existing creator-desktop pattern |

---

## 9. RISK ITEMS CONFIRMED

1. ✅ **Backend endpoints don't exist** → Using mock mode
2. ✅ **Creator ID from `useAuthStore`** → `user?.id` when `role === "CREATOR"`
3. ✅ **File upload pipeline** → `GenericContentUpload` uses `File[]` locally, mock for now
4. ✅ **Public tier compare** → Separate route `/@[username]/tiers/compare` (not under studio)
5. ✅ **UI component API match** → Verified Button, Input, Toast, Spinner all compatible

---

## 10. TOTAL FILES TO CREATE: ~35

- Types & Mocks: 3
- Components: 17
- App Router Pages: 14 (including placeholders)
- **Plan approved - ready to start Phase 1**