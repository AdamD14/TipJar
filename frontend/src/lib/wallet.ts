import { api } from "./api/http";
import { API } from "./api-routes";

export type CctpDto = {
  destinationChain: string;
  destinationAddress: string;
  amount: string;
};
export async function createWallet() {
  const { data } = await api.post(API.CIRCLE.WALLET_CREATE);
  return data;
}
export async function getWallet() {
  const { data } = await api.get(API.CIRCLE.WALLET);
  return data;
}
export async function getBalance() {
  const { data } = await api.get(API.CIRCLE.BALANCE);
  return data;
}
export async function getTransactions() {
  const { data } = await api.get(API.CIRCLE.TXS);
  return data;
}
export async function depositHosted(amount: string) {
  const { data } = await api.post(API.CIRCLE.DEPOSIT_HOSTED, { amount });
  return data;
}
export async function withdraw(amount: string) {
  const { data } = await api.post(API.CIRCLE.WITHDRAW, { amount });
  return data;
}
export async function cctpTransfer(dto: CctpDto) {
  const { data } = await api.post(API.CIRCLE.CCTP_TRANSFER, dto);
  return data;
}
