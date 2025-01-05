import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { useCompanyData } from './useCompanyData';
import { retryWithBackoff } from '../utils/retryWithBackoff';

vi.mock('../utils/retryWithBackoff');

const mockRetryWithBackoff = retryWithBackoff as ReturnType<typeof vi.fn>;

describe('useCompanyData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch companies successfully', async () => {
    const mockCompanies = [
      { companyId: 1, companyName: 'Tesla' },
      { companyId: 2, companyName: 'IKEA' },
    ];

    mockRetryWithBackoff.mockResolvedValueOnce({ data: mockCompanies });

    const { result } = renderHook(() => useCompanyData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.companies).toEqual(mockCompanies);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch failure gracefully', async () => {
    mockRetryWithBackoff.mockRejectedValueOnce(
      new Error('Failed to fetch companies.'),
    );

    const { result } = renderHook(() => useCompanyData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.companies).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch companies.');
  });

  it('should retry and succeed on subsequent attempts', async () => {
    const mockCompanies = [
      { companyId: 1, companyName: 'Tesla' },
      { companyId: 2, companyName: 'IKEA' },
    ];

    // Simulate failure on first attempt and success on retry
    mockRetryWithBackoff
      .mockRejectedValueOnce(new Error('Failed to fetch companies.'))
      .mockResolvedValueOnce({ data: mockCompanies });

    const { result } = renderHook(() => useCompanyData());

    await act(async () => {
      await result.current.retryFetch();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.companies).toEqual(mockCompanies);
    expect(result.current.isLoading).toBe(false);
  });
});
