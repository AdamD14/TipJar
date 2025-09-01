import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

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
    expect(screen.getByRole('heading', { name: /Jane Doe/ })).toBeInTheDocument();
    expect(screen.getByText('@janedoe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "View Jane Doe's profile" })).toHaveAttribute(
      'href',
      '/creators/janedoe'
    );
    expect(screen.getByText('128 patrons')).toBeInTheDocument();
  });
});
