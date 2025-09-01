import React from 'react';
import { afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TipModule from '../TipModule';
afterEach(() => {
  cleanup();
});


describe('TipModule', () => {
  it('selects preset and submits', async () => {
    const onSubmit = vi.fn();
    render(<TipModule presets={[5, 10]} currency="USD" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tip $10.00' }));
    const submit = screen.getByRole('button', { name: /tip now/i });
    expect(submit).toBeEnabled();
    fireEvent.click(submit);
    expect(onSubmit).toHaveBeenCalledWith(10, 'USD');
  });

  it('validates custom amount', () => {
    render(<TipModule />);
    const input = screen.getByLabelText(/custom amount/i);
    fireEvent.change(input, { target: { value: '0' } });
    const submit = screen.getByRole('button', { name: /tip now/i });
    expect(submit).toBeDisabled();
  });
});
