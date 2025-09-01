import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

// Mock next/navigation for push assertions
vi.mock('next/navigation', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('SearchBar', () => {
  it('submits text and shows clear button', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox', { name: /search creators/i });
    fireEvent.change(input, { target: { value: 'london' } });
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });
});

