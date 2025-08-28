export function fmtDate(iso: string, locale = 'en-US') {
  try {
    return new Date(iso).toLocaleString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return iso;
  }
}

