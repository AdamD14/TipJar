# TipJar Implementation Plan — Deposits, Tips & Withdrawals

> **Status**: DRAFT — awaiting ZIELONE ŚWIATŁO before any code changes
> **Date**: 2026-06-01
> **Scope**: Working deposits (tip button → payment modal) and withdrawals (TipJar → anywhere), all USDC landing in creator wallet, fee enforcement, gas sponsorship

---

## Executive Summary

The codebase has a solid foundation (Circle DCW/SCA wallets, Gateway, App Kit SDK, smart contracts, wagmi config) but **5 of 6 transaction types are missing the 2.5% platform fee**, several critical bugs exist, and the frontend PaymentWizard described in `tipmodal.md` (732-line spec) is not implemented — the current TipModal is a single-step form with `window.ethereum` only.

This plan is organized in 3 phases:
- **Phase 0** — Critical bugfixes (no new deps, no schema changes)
- **Phase 1** — PaymentWizard + fee enforcement (1 new dep: RainbowKit)
- **Phase 2** — Future features (Payment Intents, Payouts, multi-chain)

---

## Phase 0 — Critical Bugfixes + Diagnosis

> Zero new dependencies. Zero schema changes. Zero API contract changes.

### 0.1 Fix tokenId UUID bug

**Problem**: `circle.service.ts:50` and `circle.service.ts:813` default `USDC_TOKEN_ID` to the string `'USDC'`. Circle DCW API requires a UUID for non-Arc chains. The `tokenId.includes('-')` heuristic at lines 333/458 is a fragile workaround that will break on mainnet chains.

**Fix**:
- Add `USDC_TOKEN_IDS` map to `circle.service.ts` — chain ID → Circle token UUID
- `circle.service.ts:50` — change default from `'USDC'` to `process.env.USDC_TOKEN_ID_ARC || 'USDC'` (Arc only)
- Lines 333, 458, 813 — resolve tokenId via chain-aware lookup:
```ts
getTokenId(chainId: number): string {
  const ids: Record<number, string> = {
    5042002: process.env.USDC_TOKEN_ID_ARC || 'USDC',
    8453: process.env.USDC_TOKEN_ID_BASE, // UUID
    42161: process.env.USDC_TOKEN_ID_ARB, // UUID
    137: process.env.USDC_TOKEN_ID_POLYGON, // UUID
    56: process.env.USDC_TOKEN_ID_BNB, // UUID
  };
  return ids[chainId] || process.env.USDC_TOKEN_ID_DEFAULT || 'USDC';
}
```
- Update `.env.example` with `USDC_TOKEN_ID_BASE`, `USDC_TOKEN_ID_ARB`, etc.

**Files**: `circle.service.ts`, `.env.example`

### 0.2 Fix webhook handler — broken payload parsing

**Problem**: `circle.service.ts:637-711` (`handleWebhook`) expects Circle webhook payloads with `p.data?.walletId` structure. But Circle API v2 sends a DIFFERENT structure:

**What Circle actually sends**:
```json
{
  "subscriptionId": "80b9b08f-...",
  "notificationId": "b3f2761f-...",
  "notificationType": "transactions.inbound",
  "notification": {
    "id": "ad3f40ae-...",
    "blockchain": "MATIC-AMOY",
    "tokenId": "36b6931a-...",
    "walletId": "01899cf2-...",
    "sourceAddress": "0x7b777e...",
    "destinationAddress": "0x6e5eaf...",
    "transactionType": "OUTBOUND",
    "custodyType": "ENDUSER",
    "state": "COMPLETE",
    "amounts": ["0.01"],
    "nfts": null,
    "txHash": "0x535ff2...",
    "blockHash": "0xa4c5c7...",
    "blockHeight": 41100000,
    "networkFee": "0.070375...",
    "firstConfirmDate": "2023-10-11T21:08:28Z",
    "operation": "TRANSFER",
    "userId": "c266945c-...",
    "createDate": "2023-10-11T21:08:13Z",
    "updateDate": "2023-10-11T21:08:37Z"
  },
  "timestamp": "2023-10-11T21:08:13Z",
  "version": 2
}
```

**What our code expects** (lines 640-652):
```ts
type WebhookPayload = {
  type?: string;          // WRONG — Circle uses "notificationType"
  eventType?: string;     // WRONG — not a Circle field
  data?: {                // WRONG — Circle uses "notification"
    walletId?: string;    // walletId is inside notification, not data
    transaction?: { walletId?: string };
  };
};
const eventType = p.type || p.eventType || '';  // will be '' every time
const walletId = p.data?.walletId || p.data?.transaction?.walletId || null;  // will be null every time
```

**Result**: Every webhook is silently dropped at line 654-667 because:
1. `eventType` is always `''` → never matches `'transactions.inbound'` etc. → logged as "Unhandled" and returns
2. `walletId` is always `null` → fails the `!walletId` check → returns
3. **Balance cache is NEVER updated by webhooks** — the entire webhook flow is dead code

**This also means**: `waitForTxCompletion` (the 180s poll) is the ONLY way transactions update, and if Hookdeck is the intermediary, the poll may work but webhooks don't.

**Fix**:
- Rewrite `WebhookPayload` type to match Circle API v2 structure:
```ts
type CircleWebhookPayload = {
  notificationType: string;
  notification: {
    id: string;
    walletId: string;
    blockchain: string;
    tokenId: string;
    amounts: string[];
    state: string;
    transactionType: string;
    operation: string;
    destinationAddress?: string;
    sourceAddress?: string;
    txHash?: string;
    networkFee?: string;
    userId?: string;
  };
  subscriptionId: string;
  notificationId: string;
  timestamp: string;
  version: number;
};
```
- Extract `eventType` from `notificationType` (not `type`/`eventType`)
- Extract `walletId` from `notification.walletId` (not `data.walletId`)
- Expand handled event types to include ALL Circle states:
  - `transactions.inbound` (queued → sent → confirmed → complete)
  - `transactions.outbound` (queued → sent → confirmed → complete)
  - Missing: `transactions.complete` (different from `confirmed` — `complete` = final settlement)
  - Missing: `transactions.cancelled`
- On `transactions.inbound` + state=COMPLETE: update balance + record WalletTransaction with full details (amount, txHash, blockchain, sourceAddress)
- On `transactions.outbound` + state=COMPLETE: update balance + record WalletTransaction
- On state=FAILED: mark transaction as failed in DB

**Additional issue — controller reads wrong header**:
- `circle.controller.ts:192-193` reads `circle-signature` / `x-circle-signature`
- Circle API v2 uses `X-Circle-Signature` + `X-Circle-Key-Id` (asymmetric key, not HMAC)
- This is cosmetic for now (Hookdeck is middleman), but needs fix for production

**Files**: `circle.service.ts`, `circle.controller.ts`

### 0.3 Diagnose what actually works end-to-end

**Why**: You said deposit doesn't work, tipowanie doesn't work, gateway is mixed. Before fixing anything else, we need to know WHAT works and WHAT doesn't.

**Approach**: After 0.1 and 0.2 are fixed, run through each flow manually and document:

| Flow | Test | Expected | Actual | Status |
|------|------|----------|--------|--------|
| Wallet creation | Create SCA wallet for new user | Wallet address returned | ? | ? |
| Hosted deposit | Click "Deposit" on creator wallet page | Circle hosted deposit iframe opens | ? | ? |
| Gateway deposit | POST /api/v1/circle/gateway/deposit | USDC bridged to Arc | ? | ? |
| Tip (DCW internal) | Fan tips creator $1 | 97.5¢ to creator, 2.5¢ to fee wallet | ? | ? |
| Tip (browser wallet) | Fan tips via MetaMask | USDC to creator address | ? | ? |
| Balance display | GET /api/v1/circle/balance | Correct USDC amount | ? | ? |
| Transaction list | GET /api/v1/circle/transactions | Shows all transactions | ? | ? |
| Withdraw | Click "Withdraw" on creator page | USDC sent to external address | ? | ? |
| Gateway transfer | POST /api/v1/circle/gateway/transfer | USDC bridged out | ? | ? |
| Webhook | Send test webhook via Hookdeck | Balance updated in DB | ? | ? |

**Output**: Documented list of what works, what's broken, and what's missing. This feeds into Phase 1 prioritization.

**Files**: None (diagnostic only — manual testing + documentation)

### 0.4 Webhook signature — production concern, NOT Phase 0

**Status**: DEFERRED. Hookdeck is the middleman between Circle and our endpoint. Only Circle can POST to Hookdeck (read-only API key). Hookdeck forwards to us. No external attacker can inject payloads through this path.

**When to add**: When moving to production and/or removing Hookdeck as middleman. Circle API v2 uses **asymmetric** signatures (`X-Circle-Signature` + `X-Circle-Key-Id`), not simple HMAC. Implementation requires fetching the public key from Circle and verifying with RSA. Not trivial, but not Phase 0.

**Files**: (deferred)

---

## Phase 1 — PaymentWizard + Fee Enforcement

> 1 new dependency: `@rainbow-me/rainbowkit` (4 packages: rainbowkit, wagmi, viem, @tanstack/react-query — wagmi + react-query already installed)
> No schema changes unless noted.

### 1.1 Add RainbowKit for wallet connection

**Why**: `providers.tsx` already has wagmi + `injected()` connector. RainbowKit adds 300+ wallet support (MetaMask, WalletConnect, Coinbase, Rainbow, Trust, etc.) with a ready-made modal UI. Without it, mobile users and non-extension wallets cannot connect.

**Implementation**:
- Install: `npm install @rainbow-me/rainbowkit` (in `frontend/`)
- `providers.tsx` — replace `injected()` with RainbowKit connectors:
  ```ts
  import { getDefaultConfig } from '@rainbow-me/rainbowkit';
  
  const config = getDefaultConfig({
    appName: 'TipJar',
    chains: [arcTestnet, base, arbitrum, polygon, bnbSmartChain],
    transports: {
      [arcTestnet.id]: http('https://rpc.testnet.arc.network'),
      [base.id]: http(),
      [arbitrum.id]: http(),
      [polygon.id]: http(),
      [bnbSmartChain.id]: http(),
    },
  });
  ```
- Add `<RainbowKitProvider>` inside `<WagmiProvider>`
- Add `@rainbow-me/rainbowkit/styles.css` to global styles
- Replace any "Connect Wallet" buttons with RainbowKit's `<ConnectButton>`

**Files**: `providers.tsx`, `layout.tsx` (CSS import), `globals.css`

### 1.2 Implement PaymentWizard (5-step flow per tipmodal.md)

**Current state**: Simple single-step TipModal. Design spec (`tipmodal.md`) describes a 5-step wizard with 3 payment methods.

**5 Steps** (per design spec):
1. **Choose Amount** — preset amounts ($1/$3/$5/$10) + custom input
2. **Choose Method** — 3 cards: Card/Fiat, Crypto Wallet, TipJar Balance
3. **Confirm & Pay** — FeeBreakdown, Proof of Support checkbox, pay button
4. **Transaction Status** — podpis → mempool → potwierdzenie (3 states)
5. **Success / Thank You** — confetti, share, receipt

**3 Payment Methods**:

| Method | How it works | Fee | Gas |
|--------|-------------|-----|-----|
| **Card/Fiat** | Circle Hosted Deposit (existing `depositHosted` endpoint) → USDC to creator DCW | 2.5% on deposit amount | Platform-sponsored (Gas Station) |
| **Crypto Wallet** | Browser wallet (RainbowKit) → direct USDC transfer to creator DCW address | 2.5% on tip amount | Fan pays gas (or Gas Station on Arc) |
| **TipJar Balance** | DCW internal transfer (existing `transferWalletToWallet`) | 2.5% on tip amount | Platform-sponsored (Gas Station) |

**Components to build** (atoms already exist in `tip/` folder):
- `PaymentWizard.tsx` — orchestrator with step state machine
- `StepAmount.tsx` — extends `AmountSelector.tsx` + `QuickActions.tsx`
- `StepMethod.tsx` — extends `MethodCard.tsx` (3 cards: Card/Crypto/Balance)
- `StepConfirm.tsx` — extends `FeeBreakdown.tsx` + `ProofOfSupportCheckbox.tsx` + `PaymentSummary.tsx`
- `StepStatus.tsx` — NEW: signing → mempool → confirmed animation states
- `StepSuccess.tsx` — NEW: confetti, share link, receipt

**Key behaviors**:
- Mobile: bottom sheet variant (per `modal.md`)
- Desktop: glassmorphism modal (per `modal.md`)
- WCAG 2.1 AA (per `tipmodal.md`)
- Keyboard navigation, focus trap in modal
- Error states per method (wallet rejected, insufficient balance, card declined)

**Files**: New components in `frontend/src/components/payments/wizard/`, refactor `TipModal.tsx` to use `PaymentWizard`

### 1.3 Enforce 2.5% fee on all 6 transaction types

**Current state**: Only fan→creator tip (DCW internal transfer) charges 2.5%. Other 5 types have NO fee.

| # | Transaction Type | Current Fee | Required Fee | Where to Fix |
|---|-----------------|-------------|-------------|-------------|
| 1 | Fan→Creator tip (DCW internal) | ✅ 2.5% (250 BPS) | 2.5% | Already done |
| 2 | Hosted deposit (fiat on-ramp) | ❌ 0% | 2.5% | `circle.service.ts` — deduct fee from deposit amount before crediting creator wallet |
| 3 | Gateway deposit (cross-chain) | ❌ 0% | 2.5% | `circle.service.ts` — after gateway deposit completes, transfer 2.5% to FEE_WALLET |
| 4 | Browser wallet tip (external→DCW) | ❌ 0% | 2.5% | `tips.service.ts` — new flow: external tip → track fee → sweep to FEE_WALLET |
| 5 | Same-chain withdrawal (DCW→external) | ❌ 0% | 2.5% | `payouts.service.ts` — deduct 2.5% from withdrawal amount |
| 6 | Gateway withdrawal (DCW→cross-chain) | ❌ 0% | 2.5% | `circle.service.ts` — deduct 2.5% from gateway transfer amount |
| 7 | Creator deposit (self-fund) | ❌ 0% | 2.5% | Same as #2 (hosted deposit) |

**Implementation approach** — all fee deduction happens **server-side** in NestJS:

**#2 Hosted Deposit** (`circle.service.ts` — `initiateHostedDeposit`):
- After hosted deposit completes (webhook `transactions.confirmed`), transfer 2.5% from creator wallet to FEE_WALLET
- Add webhook handler for deposit confirmation → fee sweep

**#3 Gateway Deposit** (`circle.service.ts` — `initiateGatewayDeposit`):
- After gateway deposit is confirmed, transfer 2.5% from creator wallet to FEE_WALLET
- Same webhook-driven approach as #2

**#4 Browser Wallet Tip** (`tips.service.ts`):
- Fan sends USDC directly from their browser wallet to creator's DCW address
- Backend tracks the tip via new endpoint: `POST /api/v1/tips/external`
- Fee is NOT deducted at send time (fan sends full amount to creator)
- Instead, platform sweeps 2.5% from creator wallet to FEE_WALLET after confirmation
- This avoids the fan needing to know about fees at the smart contract level

**#5 Same-chain Withdrawal** (`payouts.service.ts`):
- Change `initiateWithdrawal` to deduct 2.5% from the requested amount
- Creator requests $100 withdrawal → receives $97.50 → $2.50 to FEE_WALLET
- Show fee in `WithdrawFundsModal` and withdraw page

**#6 Gateway Withdrawal** (`circle.service.ts`):
- Same as #5 but for cross-chain gateway transfers
- Deduct 2.5% before initiating the gateway burn/mint

**Files**: `circle.service.ts`, `tips.service.ts`, `payouts.service.ts`, `webhook-events.service.ts`

### 1.4 Add fee display to deposit and withdraw flows

**Current state**: `FeeBreakdown.tsx` exists but only used in tip context.

**Fix**:
- Reuse `FeeBreakdown.tsx` in deposit flow (hosted deposit modal)
- Reuse `FeeBreakdown.tsx` in withdraw flow (withdraw page + WithdrawFundsModal)
- Add context prop to `FeeBreakdown`: `'tip' | 'deposit' | 'withdrawal'`
- Adjust labels per context:
  - Tip: "Tip amount" / "2.5% platform fee" / "Creator receives"
  - Deposit: "Deposit amount" / "2.5% platform fee" / "You receive"
  - Withdrawal: "Withdrawal amount" / "2.5% platform fee" / "You receive"

**Files**: `FeeBreakdown.tsx`, `WithdrawFundsModal.tsx`, deposit-related components

### 1.5 Fix Gateway hardcoded domain

**Problem**: `circle.service.ts:984-993` hardcodes domain 6 (Base Sepolia only).

**Fix**:
- Add `GATEWAY_DOMAINS` map: chain ID → Circle Gateway domain ID
- Resolve domain dynamically based on target chain
- Support: Base, Arbitrum, Polygon, BNB, Solana (mainnet domains)
- Arc testnet domain for testing

**Files**: `circle.service.ts`, `.env.example`

### 1.6 Replace polling with webhook-driven transaction updates

**Problem**: `circle.service.ts:1119-1151` polls `waitForTxCompletion` for up to 180s, blocking the request.

**Fix**:
- Return transaction ID immediately (202 Accepted)
- Frontend subscribes to transaction status via existing webhook → backend → DB flow
- Add SSE or polling endpoint: `GET /api/v1/circle/transactions/:id/status`
- Frontend `StepStatus.tsx` component polls this endpoint
- Remove `waitForTxCompletion` long-poll method

**Files**: `circle.service.ts`, `circle.controller.ts`, new frontend hook `useTransactionStatus`

---

## Phase 2 — Future Features

> These require new Circle API integrations and/or business account setup. Deferred until Phase 0+1 is stable.

### 2.1 Circle Payment Intents (direct fiat → creator)

**What**: Fan enters card details → Circle charges card → USDC lands in creator wallet. One step, no hosted deposit iframe.

**Why**: Better UX than hosted deposit (no redirect, native UI). But requires:
- Circle Business Account with Payments API enabled
- PCI compliance considerations (Circle Elements iframe handles SCD)
- KYB verification for the business

**Approach**: Option B from our analysis — direct to creator, 1 step.

**Estimated effort**: 2-3 weeks (API integration + compliance + testing)

### 2.2 Circle Payouts API (creator fiat off-ramp)

**What**: Creator withdraws USDC → ACH/wire → bank account in USD.

**Why**: Many creators want fiat, not crypto. Current withdrawal only supports external crypto addresses.

**Blocker**: Requires Circle business account with Payouts enabled + bank verification.

**Estimated effort**: 1-2 weeks (API integration only, pending account approval)

### 2.3 Multi-chain Gateway (production chains)

**What**: Expand Gateway from testnet-only to Base, Arbitrum, Polygon, BNB, Solana.

**Why**: Current Gateway transfer hardcodes domain 6 (Base Sepolia). Production needs 5+ chains.

**Steps**:
- Register production Gateway domains with Circle
- Configure chain-specific token IDs (UUIDs)
- Test CCTP V2 burn/mint on each chain
- Add chain selection UI in deposit/withdraw flows

**Estimated effort**: 1-2 weeks per chain

### 2.4 Smart Contract deployment (TipProxy, WithdrawProxy, FiatOnrampProxy)

**What**: Deploy existing Solidity contracts to production chains for on-chain fee enforcement.

**Why**: Currently fees are enforced server-side only. On-chain enforcement via smart contracts is more trustless and censorship-resistant.

**Notes**:
- `TipProxy.sol` has 350 BPS (3.5%) — needs update to 250 BPS (2.5%) to match business model
- `WithdrawProxy.sol` same issue — 350 BPS → 250 BPS
- `FiatOnrampProxy.sol` already has 250 BPS ✅
- Deploy to: Base, Arbitrum, Polygon, BNB, Arc

**Decision needed**: Should we deploy these contracts, or keep server-side fee enforcement? On-chain is more gas-expensive but more transparent.

**Estimated effort**: 1 week (deploy + verify + integrate)

### 2.5 Solana support

**What**: Full Solana chain support for deposits, tips, and withdrawals.

**Why**: Solana is a target production chain with massive creator/user base.

**Changes**:
- Add Solana adapter to App Kit (already available: `@circle-fin/app-kit/adapter-solana`)
- Add Solana USDC token address to config
- Handle Solana transaction format (different from EVM)
- Gateway domain registration for Solana

**Estimated effort**: 1-2 weeks

---

## Fee Model — Complete Reference

### Rule: 2.5% on EVERY transaction

| Transaction | Fan Pays | Creator Receives | Platform Gets | Example ($100) |
|-------------|----------|-----------------|---------------|----------------|
| Tip (DCW internal) | $100 | $97.50 | $2.50 | ✅ Implemented |
| Tip (browser wallet) | $100 | $97.50 | $2.50 | ❌ Not tracked |
| Deposit (hosted/fiat) | $100 | $97.50 | $2.50 | ❌ No fee |
| Deposit (gateway/cross-chain) | $100 | $97.50 | $2.50 | ❌ No fee |
| Withdrawal (same-chain) | — | $97.50 | $2.50 | ❌ No fee |
| Withdrawal (gateway/cross-chain) | — | $97.50 | $2.50 | ❌ No fee |

### Gas Costs (separate from fees)

| Method | Who Pays Gas | Chain | Cost |
|--------|-------------|-------|------|
| DCW internal transfer | Platform (Gas Station) | Arc | ~$0.01 (USDC) |
| Browser wallet tip | Fan | Any | Varies by chain |
| Browser wallet tip (Arc) | Platform (Gas Station) | Arc | ~$0.01 (USDC) |
| Hosted deposit | Platform (Gas Station) | Arc | ~$0.01 (USDC) |
| Gateway deposit | Platform | Source chain | Varies |
| Withdrawal | Platform (Gas Station) | Arc | ~$0.01 (USDC) |
| Gateway withdrawal | Platform | Source chain | Varies |

**Gas Station cost to platform**: ~5% of gas cost charged by Circle (credit card on file). For Arc, this is negligible (~$0.0005 per tx).

---

## Dependency Changes Summary

### Phase 0
- **None** — zero new dependencies

### Phase 1
- **New**: `@rainbow-me/rainbowkit` (RainbowKit already bundles wagmi/viem compatibility)
- **Already installed**: `wagmi`, `viem`, `@tanstack/react-query`

### Phase 2
- Potential: `@circle-fin/app-kit/adapter-solana` (Solana support)
- Potential: `@circle-fin/circle-sdk` (Payment Intents, Payouts — if not using REST directly)

---

## Schema Changes

### Phase 0
- **None**

### Phase 1
- **Possible**: Add `feeAmount` and `feeWalletTransactionId` fields to `WalletTransaction` model (to track fee sweeps separately from the main transaction)
- **Possible**: Add `paymentMethod` enum to `Tip` model (`dcw_internal`, `browser_wallet`, `hosted_deposit`, `gateway_deposit`)
- **Decision needed**: Are these schema changes acceptable? They enable proper fee tracking but require migration.

### Phase 2
- Add `PayoutMethod` enum (`crypto`, `ach`, `wire`) to `Payout` model
- Add `chainId` to `WalletTransaction` for multi-chain tracking

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Webhook signature bypass | 🔴 Critical | Phase 0.2 |
| tokenId UUID bug on mainnet | 🔴 Critical | Phase 0.1 |
| Missing fees = lost revenue | 🟠 High | Phase 1.3 |
| Withdraw page is non-functional | 🟠 High | Phase 0.3 |
| No mobile wallet support | 🟡 Medium | Phase 1.1 |
| Gateway single-chain only | 🟡 Medium | Phase 1.5 |
| 180s blocking poll | 🟡 Medium | Phase 1.6 |
| No Circle business account (blocks Phase 2.1/2.2) | 🟡 Medium | Apply early |
| Smart contract BPS mismatch (350 vs 250) | 🟡 Medium | Phase 2.4 decision |

---

## Implementation Order

```
Phase 0 (bugfixes — no deps, no schema):
  0.1 tokenId UUID fix           → 1-2h
  0.2 Webhook signature verify   → 1-2h
  0.3 Withdraw page stub fix     → 2-3h
  0.4 appKitClient wallet fix    → 1-2h
                                    Total: ~6h

Phase 1 (PaymentWizard + fees):
  1.1 RainbowKit integration     → 2-3h
  1.2 PaymentWizard (5 steps)    → 16-24h  ← biggest item
  1.3 Fee enforcement (6 types)  → 8-12h
  1.4 FeeBreakdown in all flows  → 2-3h
  1.5 Gateway domain fix         → 1-2h
  1.6 Webhook-driven tx updates  → 4-6h
                                    Total: ~35-50h

Phase 2 (future — each can be done independently):
  2.1 Payment Intents            → 2-3 weeks
  2.2 Payouts API                → 1-2 weeks
  2.3 Multi-chain Gateway        → 1-2 weeks/chain
  2.4 Smart contract deploy      → 1 week
  2.5 Solana support             → 1-2 weeks
```

---

## Open Questions (need your decision)

1. **Schema changes in Phase 1?** — Add `feeAmount`/`feeWalletTransactionId` to `WalletTransaction` and `paymentMethod` to `Tip`? Required for proper fee tracking.

2. **Browser wallet tip fee approach?** — Fan sends full amount to creator, then platform sweeps 2.5% from creator wallet (simpler, but creator sees a deduction). OR: Fan sends 97.5% to creator + 2.5% to fee wallet in one tx (more complex, requires smart contract or 2 transfers).

3. **Smart contract deployment?** — Deploy TipProxy/WithdrawProxy/FiatOnrampProxy with 250 BPS for on-chain fee enforcement, or keep server-side only?

4. **RainbowKit vs custom wallet UI?** — RainbowKit is faster (1 dep, ready UI). Custom UI gives more control but takes 2-3x longer.

5. **Phase 1.6 — SSE vs polling for tx status?** — SSE is more real-time but adds complexity. Simple polling endpoint is easier.

---

Awaiting **ZIELONE ŚWIATŁO** and answers to open questions before proceeding.
