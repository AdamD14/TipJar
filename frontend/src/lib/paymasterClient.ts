import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
  WalletClient,
  PublicClient,
} from 'viem';
import { toSimple7702SmartAccount } from 'viem/accounts';

export interface PaymasterConfig {
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  usdc: `0x${string}`;
  bundlerRpc: string;
}

export async function getPaymasterConfig(): Promise<PaymasterConfig> {
  const res = await fetch('/api/paymaster/config');
  if (!res.ok) throw new Error('Missing paymaster config');
  return res.json();
}

export async function getNonce(): Promise<string> {
  const res = await fetch('/api/paymaster/nonce');
  if (!res.ok) throw new Error('Nonce fetch failed');
  const data = await res.json();
  return data.nonce as string;
}

export async function connectWallet() {
  const walletClient: WalletClient = createWalletClient({
    chain: undefined,
    transport: custom(window.ethereum!),
  });
  const [address] = await walletClient.requestAddresses();
  return { walletClient, address };
}

export async function createSmartAccount(walletClient: WalletClient) {
  const publicClient: PublicClient = createPublicClient({
    transport: http(),
  });
  return toSimple7702SmartAccount({
    publicClient,
    signer: walletClient,
    owner: walletClient.account,
  });
}

// Placeholder for building and sending user operation
export async function sendTipWithPaymaster(amountUSDC: bigint) {
  const { walletClient } = await connectWallet();
  const smart = await createSmartAccount(walletClient);
  const address = await smart.getAddress();
  console.log(`Smart account ${address} tipping ${amountUSDC} USDC`);
  // Further implementation would build UserOperation with permit and send via bundler
}
