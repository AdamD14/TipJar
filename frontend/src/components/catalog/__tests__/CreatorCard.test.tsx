import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreatorCard from '../CreatorCard';
import type { Creator } from '../types';

const creator: Creator = {
  id: '1',
  handle: 'janedoe',
  name: 'Jane Doe',
  tagline: 'Illustrator & storyteller',
  avatarUrl: null,
  verified: true,
  metricLabel: 'patrons',
  metricValue: 128,
  location: 'London, UK',
  tags: ['Illustration', 'Comics', 'Characters'],
};

describe('CreatorCard', () => {
  it('renders core fields and CTA', () => {
    render(<CreatorCard creator={creator} href="/creators/janedoe" />);
    expect(screen.getByRole('heading', { name: 'Jane Doe' })).toBeInTheDocument();
    expect(screen.getByText('@janedoe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "View Jane Doe's profile" })).toHaveAttribute(
      'href',
      '/creators/janedoe'
    );
    expect(screen.getByText('128 patrons')).toBeInTheDocument();
  });
});

