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

  const ctaVariants = ['cta-gold-01', 'cta-gold-02', 'cta-gold-03', 'cta-gold-04'] as const;

  ctaVariants.forEach((v) => {
    it(`renders ${v} with cta-gold base class`, () => {
      const { container } = render(<Button variant={v}>Tip Creator</Button>);
      const btn = container.querySelector('button');
      expect(btn?.className).toContain('cta-gold');
      expect(btn?.className).toContain(v);
    });

    it(`renders ${v} as link when href provided`, () => {
      render(<Button variant={v} href="/tip">Tip Creator</Button>);
      const link = screen.getByRole('link', { name: 'Tip Creator' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/tip');
    });
  });
});
