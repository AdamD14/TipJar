import { AppKit, Blockchain } from "@circle-fin/app-kit";
import {
  createAdapterFromProvider,
  type ViemAdapter,
} from "@circle-fin/adapter-viem-v2";

const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_WALLET_ADDRESS as `0x${string}`;
const FEE_BPS = 250;

let _kit: AppKit | undefined;

export function getAppKit(): AppKit {
  if (!_kit) {
    _kit = new AppKit({
    developerFee: {
      getFee: async (_to: string, _token: string, amount: bigint) => {
        return (amount * BigInt(FEE_BPS)) / 10_000n;
      },
      getFeeRecipient: () => FEE_WALLET,
    },
      disableErrorReporting: true,
    });
  }
  return _kit;
}

export async function createBrowserAdapter(): Promise<ViemAdapter> {
  if (!window.ethereum) throw new Error("No wallet provider found");
  const adapter = await createAdapterFromProvider({
    provider: window.ethereum,
  });
  return adapter;
}

export async function sendTipUSDC(
  recipientAddress: string,
  amount: string
) {
  const kit = getAppKit();
  const adapter = await createBrowserAdapter();

  const result = await kit.send({
    from: { adapter, chain: Blockchain.Arc_Testnet },
    to: recipientAddress,
    amount,
    token: "USDC",
  });

  return result;
}

export function computeFee(amount: string): string {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return "0";
  const fee = (parsed * FEE_BPS) / 10000;
  return fee.toFixed(6);
}
