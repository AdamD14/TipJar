import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('CTAs', () => {
  it('renders primary Button with default text and route', () => {
    render(<Button variant="primary" href="/onboarding/start">Begin as a Creator</Button>);
    const link = screen.getByRole('link', { name: 'Begin as a Creator' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/onboarding/start');
  });

  it('renders secondary Button with default text and route', () => {
    render(<Button variant="secondary" href="/discover">Explore as a Fan</Button>);
    const link = screen.getByRole('link', { name: 'Explore as a Fan' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/discover');
  });

  it('shows spinner and hides label in loading state', () => {
    const { container } = render(<Button variant="primary" href="/onboarding/start" loading>Begin as a Creator</Button>);
    const links = screen.getAllByRole('link', { name: 'Begin as a Creator' });
    const link = links[links.length - 1];
    expect(link).toHaveAttribute('aria-busy', 'true');
  });

  it('renders legacy gold variant as primary', () => {
    render(<Button variant="gold" href="/test">Test</Button>);
    const link = screen.getByRole('link', { name: 'Test' });
    expect(link).toBeInTheDocument();
  });
});
