"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";
import ToastHost from "@/components/ui/Toast";

// Konfiguracja wagmi, która mówi, z jakimi sieciami blockchain ma się łączyć.
export const config = createConfig({
  chains: [mainnet], // Na razie tylko sieć główna Ethereum
  transports: {
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
