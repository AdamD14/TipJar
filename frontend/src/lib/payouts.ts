import { http } from "./http";
import { API } from "./api-routes";

export type PayoutDto = { amount: string };

export async function createPayout(dto: PayoutDto) {
  return http(API.CREATOR.PAYOUT, { method: "POST", json: dto });
}
