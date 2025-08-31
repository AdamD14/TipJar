import { describe, expect, it } from 'vitest';
import { toUiError } from '../errors';

describe('toUiError', () => {
  it('maps http error object to message and code', () => {
    const err = { message: 'Not Found', status: 404 };
    const ui = toUiError(err);
    expect(ui).toEqual({ message: 'Not Found', code: 404, details: undefined });
  });

  it('uses nested error data', () => {
    const err = { data: { message: 'Bad', code: 400, errors: { field: 'x' } } };
    const ui = toUiError(err);
    expect(ui).toEqual({ message: 'Bad', code: 400, details: { field: 'x' } });
  });

  it('falls back when input empty', () => {
    const ui = toUiError(null, 'Fallback');
    expect(ui).toEqual({ message: 'Fallback' });
  });
});
