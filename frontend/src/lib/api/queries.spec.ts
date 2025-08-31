import { describe, expect, it, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';

describe('QueryClient utilities', () => {
  it('caches results for same key', async () => {
    const client = new QueryClient();
    const fn = vi.fn().mockResolvedValue('data');
    const key = ['cache'];
    await client.fetchQuery({ queryKey: key, queryFn: fn, staleTime: Infinity });
    await client.fetchQuery({ queryKey: key, queryFn: fn, staleTime: Infinity });
    expect(fn).toHaveBeenCalledTimes(1);
    client.clear();
  });

  it('retries once on failure', async () => {
    const client = new QueryClient();
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('ok');
    const res = await client.fetchQuery({
      queryKey: ['retry'],
      queryFn: fn,
      retry: 1,
    });
    expect(fn).toHaveBeenCalledTimes(2);
    expect(res).toBe('ok');
    client.clear();
  });
});
