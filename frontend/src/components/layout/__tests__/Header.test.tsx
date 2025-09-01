import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a>,
}));

describe('Header', () => {
  it('renders desktop nav labels', () => {
    // Basic render to ensure labels exist in DOM
    render(<Header />);
    // Collect all expected labels exist in some form
    const labels = [
      'Why tipjar+?',
      'How it works?',
      'Start building / AI Studio',
      'Explore creators',
      'Learn about WEB3',
    ];
    labels.forEach((txt) => {
      expect(screen.getAllByText(txt).length).toBeGreaterThan(0);
    });
  });

  it('toggles mobile menu', () => {
    render(<Header />);
    const btn = screen.getByRole('button', { name: /open navigation/i });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});

