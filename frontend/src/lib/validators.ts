// Minimalne walidatory bez zod (stub kompatybilny z .parse)
// Docelowo podmień na zod i dokładne komunikaty błędów.

function ensure(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

export const Username = {
  parse(v: unknown) {
    ensure(typeof v === 'string', 'Invalid username');
    const s = v as string;
    ensure(s.length >= 3 && s.length <= 24, 'Invalid username length');
    ensure(/^[a-z0-9._-]+$/i.test(s), 'Invalid username format');
    return s;
  },
};

export const DisplayName = {
  parse(v: unknown) {
    ensure(typeof v === 'string', 'Invalid display name');
    const s = v as string;
    ensure(s.length >= 1 && s.length <= 50, 'Invalid display name length');
    return s;
  },
};

export const Bio = {
  parse(v: unknown) {
    ensure(typeof v === 'string', 'Invalid bio');
    const s = v as string;
    ensure(s.length <= 160, 'Bio too long');
    return s;
  },
};

export const Url = {
  parse(v: unknown) {
    ensure(typeof v === 'string', 'Invalid URL');
    try {
      new URL(v as string);
      return v as string;
    } catch {
      throw new Error('Invalid URL');
    }
  },
};

export const GoalSchema = {
  parse(v: any) {
    ensure(v && typeof v === 'object', 'Invalid goal');
    ensure(typeof v.title === 'string' && v.title.length >= 3 && v.title.length <= 60, 'Invalid title');
    ensure(typeof v.targetAmount === 'number' && v.targetAmount >= 100, 'Invalid target');
    if (v.description != null) ensure(typeof v.description === 'string' && v.description.length <= 200, 'Invalid description');
    return v;
  },
};

export const TierSchema = {
  parse(v: any) {
    ensure(v && typeof v === 'object', 'Invalid tier');
    ensure(typeof v.name === 'string' && v.name.length >= 2 && v.name.length <= 30, 'Invalid name');
    ensure(typeof v.price === 'number' && v.price >= 100, 'Invalid price');
    ensure(Array.isArray(v.perks) && v.perks.every((p: any) => typeof p === 'string' && p.length >= 2) && v.perks.length <= 5, 'Invalid perks');
    return v;
  },
};

export const WithdrawFiatSchema = {
  parse(v: any) {
    ensure(v && typeof v === 'object', 'Invalid payload');
    ensure(typeof v.amount === 'number' && v.amount >= 100, 'Invalid amount');
    ensure(['iban', 'card', 'revolut'].includes(v.method), 'Invalid method');
    ensure(v.details && typeof v.details === 'object', 'Invalid details');
    return v;
  },
};

export const WithdrawCryptoSchema = {
  parse(v: any) {
    ensure(v && typeof v === 'object', 'Invalid payload');
    ensure(typeof v.amount === 'number' && v.amount >= 100, 'Invalid amount');
    ensure(typeof v.toAddress === 'string' && /^0x[a-fA-F0-9]{40}$/.test(v.toAddress), 'Invalid address');
    ensure(['base', 'polygon', 'eth'].includes(v.chain), 'Invalid chain');
    return v;
  },
};

