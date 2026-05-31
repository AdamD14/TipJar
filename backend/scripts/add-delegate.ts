// One-time script: Add delegate to Gateway Wallet contract for an SCA wallet.
// Must be run ONCE per SCA wallet after creation (or after creating the delegate EOA).
// Usage: npx tsx --env-file=.env scripts/add-delegate.ts
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const GATEWAY_WALLET = '0x0077777d7EBA4688BDeF3E311b846F25870A19B9';
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000';
const BLOCKCHAIN = 'ARC-TESTNET';

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET!,
});

async function waitForTx(txId: string) {
  while (true) {
    const { data } = await client.getTransaction({ id: txId });
    const state = data?.transaction?.state;
    if (['COMPLETE', 'CONFIRMED'].includes(state!)) return;
    if (['FAILED', 'DENIED', 'CANCELLED'].includes(state!))
      throw new Error(`Transaction failed: ${state}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

async function main() {
  const depositorAddress = process.env.DEPOSITOR_ADDRESS;
  const delegateAddress = process.env.DELEGATE_WALLET_ADDRESS || process.env.GATEWAY_DELEGATE_WALLET_ADDRESS;

  if (!depositorAddress) {
    console.error('DEPOSITOR_ADDRESS not set in .env (SCA wallet address)');
    process.exit(1);
  }
  if (!delegateAddress) {
    console.error('DELEGATE_WALLET_ADDRESS or GATEWAY_DELEGATE_WALLET_ADDRESS not set in .env');
    process.exit(1);
  }

  console.log(`\n=== Adding delegate on ${BLOCKCHAIN} ===`);
  console.log(`SCA Depositor: ${depositorAddress}`);
  console.log(`Delegate EOA:  ${delegateAddress}`);

  const tx = await client.createContractExecutionTransaction({
    walletAddress: depositorAddress,
    blockchain: BLOCKCHAIN,
    contractAddress: GATEWAY_WALLET,
    abiFunctionSignature: 'addDelegate(address,address)',
    abiParameters: [USDC_ADDRESS, delegateAddress],
    fee: { type: 'level', config: { feeLevel: 'MEDIUM' } },
  });

  const txId = tx.data?.id;
  if (!txId) {
    console.error('Failed to create addDelegate transaction:', JSON.stringify(tx.data));
    process.exit(1);
  }

  console.log(`Transaction submitted: ${txId}`);
  await waitForTx(txId);
  console.log(`Done! Delegate ${delegateAddress} is now authorized for SCA ${depositorAddress} on ${BLOCKCHAIN}`);
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
