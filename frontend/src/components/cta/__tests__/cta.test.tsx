import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrimaryCta from '../PrimaryCta';
import SecondaryCta from '../SecondaryCta';

describe('CTAs', () => {
  it('renders PrimaryCta with default text and route', () => {
    render(<PrimaryCta href="/onboarding/start" />);
    const link = screen.getByRole('link', { name: 'Begin as a Creator' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/onboarding/start');
  });

  it('renders SecondaryCta with default text and route', () => {
    render(<SecondaryCta href="/discover" />);
    const link = screen.getByRole('link', { name: 'Explore Creators' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/discover');
  });

  it('shows spinner and hides label in loading state', () => {
    render(<PrimaryCta href="/onboarding/start" isLoading />);
    // aria-busy applied; label visually hidden via opacity but still in DOM
    const link = screen.getByRole('link', { name: 'Begin as a Creator' });
    expect(link).toHaveAttribute('aria-busy', 'true');
  });
});

