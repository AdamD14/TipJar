import { api } from "./api/http";

export type TipPayload = {
  creatorId: string; // ID twórcy (backend)
  amount: string; // amount jako string (np. "5.00")
  note?: string; // opcjonalnie wiadomość do twórcy
};

export type GuestExtras = {
  paymentGatewayToken?: string; // token z on-rampa (fiat)
};

export async function sendTip(payload: TipPayload, guest?: GuestExtras) {
  try {
    const { data: tip } = await api.post("/api/v1/tips", payload);
    return { tip, guest: false };
  } catch (e: any) {
    if (!/401|unauthorized/i.test(e.message)) throw e;
    const body = { ...payload, ...(guest || {}) };
    const { data: tip } = await api.post("/api/v1/tips/guest", body);
    return { tip, guest: true };
  }
}
