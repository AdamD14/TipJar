import { http } from "./http";

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
    const tip = await http("/api/v1/tips", { method: "POST", json: payload });
    return { tip, guest: false };
  } catch (e: any) {
    if (!/401|unauthorized/i.test(e.message)) throw e;
    const body = { ...payload, ...(guest || {}) };
    const tip = await http("/api/v1/tips/guest", {
      method: "POST",
      json: body,
    });
    return { tip, guest: true };
  }
}

export async function getCreatorTips(alias: string) {
  const path = `/api/v1/creators/${encodeURIComponent(alias)}/tips`;
  return http(path, { method: "GET" });
}
