import { api } from "./api/http";
import { sendTipUSDC, computeFee } from "./appKitClient";

export type TipPayload = {
  creatorId: string;
  amount: string;
  note?: string;
  walletAddress?: string;
};

export type GuestExtras = {
  paymentGatewayToken?: string;
};

export type TipResult = {
  txHash?: string;
  tip?: any;
  fee: string;
  guest: boolean;
};

export async function sendTip(
  payload: TipPayload,
  guest?: GuestExtras
): Promise<TipResult> {
  const fee = computeFee(payload.amount);

  try {
    if (payload.walletAddress) {
      const result = await sendTipUSDC(payload.walletAddress, payload.amount);
      const { data: tip } = await api.post("/api/v1/tips", {
        ...payload,
        txHash: result.txHash || result.hash,
        fee,
      });
      return { tip, fee, txHash: result.txHash || result.hash, guest: false };
    }

    const { data: tip } = await api.post("/api/v1/tips", payload);
    return { tip, fee, guest: false };
  } catch (e: any) {
    if (!/401|unauthorized/i.test(e.message)) throw e;
    const body = { ...payload, ...(guest || {}), fee };
    const { data: tip } = await api.post("/api/v1/tips/guest", body);
    return { tip, fee, guest: true };
  }
}
