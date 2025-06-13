import { initiateDeveloperControlledWalletsClient, CircleDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

let sdk: CircleDeveloperControlledWalletsClient | undefined;

export function getCircleSDK(): CircleDeveloperControlledWalletsClient {
  if (!sdk) {
    const apiKey = process.env.CIRCLE_API_KEY;
    const entitySecret = process.env.CIRCLE_ENTITY_SECRET;
    if (!apiKey || !entitySecret) {
      throw new Error('Missing Circle API credentials');
    }
    sdk = initiateDeveloperControlledWalletsClient({
      apiKey,
      entitySecret,
    });
  }
  return sdk;
}
