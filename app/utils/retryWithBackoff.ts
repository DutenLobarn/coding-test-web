/**
 * Retries an asynchronous operation with exponential backoff.
 *
 * Example:
 * ```typescript
 * const fetchData = async () => {
 *   const response = await fetch('/api/data');
 *   if (!response.ok) throw new Error('Failed to fetch data');
 *   return response.json();
 * };
 *
 * const data = await retryWithBackoff(fetchData);
 * ```
 *
 * @param operation - The asynchronous function to retry.
 * @param retries - Maximum number of retry attempts. Default is 3.
 * @param delay - Initial delay in milliseconds. Default is 1000 ms.
 * @param onRetry - Optional callback executed on each retry attempt.
 *
 * @returns The resolved value of the operation if successful.
 * @throws The last error encountered if all retries fail.
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  onRetry?: (attempt: number, error: unknown) => void,
): Promise<T> {
  try {
    return await operation();
  } catch (err) {
    if (retries === 0) throw err;
    if (onRetry) onRetry(retries, err);
    await new Promise((res) => setTimeout(res, delay));
    return retryWithBackoff(operation, retries - 1, delay * 2, onRetry);
  }
}
