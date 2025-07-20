"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// Konfiguracja wagmi, która mówi, z jakimi sieciami blockchain ma się łączyć.
export const config = createConfig({
  chains: [mainnet], // Na razie tylko sieć główna Ethereum
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// Komponent, który będzie dostarczał kontekst wagmi i react-query do całej aplikacji.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
