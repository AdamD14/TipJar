export function isEvmAddress(v: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}
