import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { useCompanyData } from '../hooks/useCompanyData';
import TrendingCompanyList from './TrendingCompanyList';
import userEvent from '@testing-library/user-event';

vi.mock('../hooks/useCompanyData', () => ({
  useCompanyData: vi.fn(),
}));

const mockUseCompanyData = useCompanyData as ReturnType<typeof vi.fn>;

describe('TrendingCompanyList', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the loading state', async () => {
    mockUseCompanyData.mockReturnValue({
      companies: [],
      isLoading: true,
      error: null,
      retry: vi.fn(),
    });

    render(<TrendingCompanyList />);

    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders a message when no companies are available', async () => {
    mockUseCompanyData.mockReturnValue({
      companies: [],
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(<TrendingCompanyList />);

    expect(screen.queryByRole('list')).toBeNull();
    expect(
      screen.getByText(/no companies available at the moment/i),
    ).toBeDefined();
  });

  it('renders the list of companies', async () => {
    mockUseCompanyData.mockReturnValue({
      companies: [
        {
          companyName: 'Tesla',
          companyId: 1,
        },
        {
          companyName: 'IKEA',
          companyId: 2,
        },
      ],
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(<TrendingCompanyList />);

    const listItems = screen.getAllByRole('listitem');

    expect(screen.getByRole('list')).toBeDefined();
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Tesla')).toBeDefined();
    expect(screen.getByText('IKEA')).toBeDefined();
  });

  it('handles fetch failure gracefully', async () => {
    mockUseCompanyData.mockReturnValue({
      companies: [],
      isLoading: false,
      error: 'Failed to fetch companies.',
      retry: vi.fn(),
    });

    render(<TrendingCompanyList />);

    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.queryByText(/no companies available/i)).toBeNull();
    expect(screen.getByText(/failed to fetch companies/i)).toBeDefined();
  });

  it('calls retryFetch function on click', async () => {
    const retryFetchMock = vi.fn();

    mockUseCompanyData.mockReturnValue({
      companies: [],
      isLoading: false,
      error: 'Failed to fetch companies.',
      retryFetch: retryFetchMock,
    });

    render(<TrendingCompanyList />);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeDefined();

    await userEvent.click(retryButton);

    expect(retryFetchMock).toHaveBeenCalledTimes(1);
  });
});
