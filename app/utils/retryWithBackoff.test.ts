import { describe, it, vi, expect } from 'vitest';
import { retryWithBackoff } from './retryWithBackoff';

describe('retryWithBackoff', () => {
  it('resolves successfully on the first attempt', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce('Success');
    const result = await retryWithBackoff(mockFetch);

    expect(result).toBe('Success');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('retries the specified number of times on failure', async () => {
    const mockFetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Fail 1'))
      .mockRejectedValueOnce(new Error('Fail 2'))
      .mockResolvedValueOnce('Success after retries');

    const result = await retryWithBackoff(mockFetch, 3, 100);

    expect(result).toBe('Success after retries');
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('throws an error after exceeding maximum retries', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Always fails'));

    await expect(retryWithBackoff(mockFetch, 2, 100)).rejects.toThrow(
      'Always fails',
    );

    expect(mockFetch).toHaveBeenCalledTimes(3); // Initial try + 2 retries
  });

  it('respects the delay between retries', async () => {
    const mockFetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Fail'))
      .mockResolvedValueOnce('Success');

    const delaySpy = vi.spyOn(global, 'setTimeout');

    const result = await retryWithBackoff(mockFetch, 1, 200);

    expect(result).toBe('Success');
    expect(delaySpy).toHaveBeenCalledWith(expect.any(Function), 200);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    delaySpy.mockRestore();
  });
});
