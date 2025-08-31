export function formatUSDC(n: number, locale = 'pl-PL') {
  const f = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return f.format(n).replace('US$', '').trim() + ' USDC';
}

export function parseAmount(input: string) {
  return Number((input || '').replace(',', '.').trim());
}

export function isValidUsdc(n: number) {
  return Number.isFinite(n) && n >= 0.5 && n <= 10_000;
}
