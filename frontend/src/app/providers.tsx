"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http, defineChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";
import ToastHost from "@/components/ui/notifications/Toast";

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
  },
  blockExplorers: {
    default: { name: "Arc Testnet Explorer", url: "https://explorer.testnet.arc.network" },
  },
});

export const config = createConfig({
  chains: [arcTestnet, mainnet],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
    [mainnet.id]: http(),
  },
  connectors: [injected()],
});

let _qc: QueryClient | undefined;
function getQueryClient() {
  if (!_qc) _qc = new QueryClient();
  return _qc;
}

// Komponent, który będzie dostarczał kontekst wagmi i react-query do całej aplikacji.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={getQueryClient()}>
        {children}
        <ToastHost />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
