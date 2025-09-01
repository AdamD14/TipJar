import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SupportTierCard from '../SupportTierCard';

describe('SupportTierCard', () => {
  it('renders name, price and perks, triggers onSelect', () => {
    const onSelect = vi.fn();
    render(
      <SupportTierCard
        onSelect={onSelect}
        tier={{
          id: 't1',
          name: 'Silver',
          priceMonthly: 5,
          perks: ['Early access', 'Behind-the-scenes'],
          recommended: true,
        }}
      />
    );
    expect(screen.getByLabelText(/silver tier/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /choose silver/i }));
    expect(onSelect).toHaveBeenCalledWith('t1');
  });
});
