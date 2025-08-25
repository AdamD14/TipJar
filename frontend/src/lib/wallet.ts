import { http } from "./http";
import { API } from "./api-routes";

export async function createWallet() {
  return http(API.CIRCLE.WALLET_CREATE, { method: "POST" });
}
export async function getWallet() {
  return http(API.CIRCLE.WALLET, { method: "GET" });
}
export async function getBalance() {
  return http(API.CIRCLE.BALANCE, { method: "GET" });
}
export async function getTransactions() {
  return http(API.CIRCLE.TXS, { method: "GET" });
}
export async function depositHosted(amount: string) {
  return http(API.CIRCLE.DEPOSIT_HOSTED, { method: "POST", json: { amount } });
}
export async function withdraw(amount: string) {
  return http(API.CIRCLE.WITHDRAW, { method: "POST", json: { amount } });
}
export type CctpDto = {
  destinationChain: string;
  destinationAddress: string;
  amount: string;
};
export async function cctpTransfer(dto: CctpDto) {
  return http(API.CIRCLE.CCTP_TRANSFER, { method: "POST", json: dto });
}
