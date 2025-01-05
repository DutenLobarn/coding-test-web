import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import TrendingCompanyListItem from './TrendingCompanyListItem';

describe('TrendingCompanyListItem', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the company name and description', () => {
    const company = {
      iconUrl: 'https://example.com/icon.png',
      logoDarkUrl: 'https://example.com/logo-dark.png',
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
      liveUrl: 'https://example.com',
    };

    render(<TrendingCompanyListItem {...company} />);

    expect(screen.getByText(company.companyName)).toBeDefined();
    expect(screen.getByText(company.description)).toBeDefined();
    expect(screen.getByRole('listitem')).toBeDefined();
  });

  it('renders a fallback image when logoDarkUrl is null', () => {
    const company = {
      logoDarkUrl: null, // Ingen bild
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
      liveUrl: 'https://example.com',
    };

    render(<TrendingCompanyListItem {...company} />);

    // Kontrollera fallback-bilden
    const img = screen.getByRole('img', {
      name: `Placeholder for ${company.companyName}`,
    });
    expect(img).toBeDefined(); // Kontrollera att img finns
    expect(img.getAttribute('src')).toContain('placehold.co'); // Kontrollera fallback-URL
  });

  it('renders the SVG icon correctly', () => {
    const company = {
      iconUrl: 'https://example.com/icon.png',
      logoDarkUrl: 'https://example.com/logo-dark.png',
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
      liveUrl: 'https://example.com',
    };

    render(<TrendingCompanyListItem {...company} />);

    // Check for the SVG icon
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeDefined();
  });
});
