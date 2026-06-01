import { api } from "./api/http";
import { API } from "./api-routes";

export type GatewayDepositDto = {
  amount: string;
};

export type GatewayTransferDto = {
  amount: string;
  destinationDomain: number;
  recipientAddress: string;
};

export type GatewayDepositResult = {
  approveTxId: string;
  depositTxId: string;
};

export type GatewayTransferResult = {
  burnSignTxId: string;
  mintTxId: string;
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
export async function gatewayDeposit(dto: GatewayDepositDto) {
  const { data } = await api.post<GatewayDepositResult>(
    API.CIRCLE.GATEWAY_DEPOSIT,
    dto,
  );
  return data;
}
export async function gatewayTransfer(dto: GatewayTransferDto) {
  const { data } = await api.post<GatewayTransferResult>(
    API.CIRCLE.GATEWAY_TRANSFER,
    dto,
  );
  return data;
}

