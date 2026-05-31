// One-time script: Create a platform EOA delegate wallet for Gateway burn intent signing.
// Usage: npx tsx --env-file=.env scripts/create-delegate-wallet.ts
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET!,
});

async function main() {
  const walletSetId = process.env.CIRCLE_WALLET_SET_ID;
  if (!walletSetId) {
    console.error('CIRCLE_WALLET_SET_ID not set in .env');
    process.exit(1);
  }

  console.log('Creating EOA delegate wallet on EVM-TESTNET...');
  const response = await client.createWallets({
    idempotencyKey: crypto.randomUUID(),
    walletSetId,
    blockchains: ['EVM-TESTNET'],
    count: 1,
    accountType: 'EOA',
    metadata: [{ name: 'TipJar Gateway Delegate', refId: 'gateway-delegate' }],
  });

  const wallet = response.data?.wallets?.[0];
  if (!wallet?.id || !wallet.address) {
    console.error('Failed to create delegate wallet:', JSON.stringify(response.data));
    process.exit(1);
  }

  console.log('\n=== Delegate Wallet Created ===');
  console.log(`Wallet ID:    ${wallet.id}`);
  console.log(`Address:      ${wallet.address}`);
  console.log('\nAdd this address to your .env as:');
  console.log(`GATEWAY_DELEGATE_WALLET_ADDRESS=${wallet.address}`);
  console.log('\nThen run add-delegate.ts for each SCA wallet that needs Gateway transfers.');
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
