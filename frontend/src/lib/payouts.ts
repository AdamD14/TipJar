import { api } from "./api/http";
import { API } from "./api-routes";

export type PayoutDto = { amount: string };

export async function createPayout(dto: PayoutDto) {
  const { data } = await api.post(API.CREATOR.PAYOUT, dto);
  return data;
}
