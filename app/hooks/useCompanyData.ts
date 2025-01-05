import { useState, useEffect } from 'react';
import { retryWithBackoff } from '../utils/retryWithBackoff';
import type { Company } from '../types/company';

/**
 * Represents the structure of the API response for fetching companies.
 */
interface CompaniesApiResponse {
  data: Company[];
}

/**
 * Custom hook for fetching a list of companies with retry behavior.
 *
 * @returns An object containing:
 * - `companies`: Array of fetched companies
 * - `isLoading`: Whether the data is currently being loaded
 * - `error`: Any error that occurred during the fetch
 * - `retryFetch`: Function to manually retry fetching the data
 */
export function useCompanyData() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches companies from the API and updates the state.
   * Retries on failure using backoff logic.
   */
  const fetchAndSetCompanies = async () => {
    try {
      setIsLoading(true);

      /**
       * Fetch companies with retry support
       */
      const { data: companies } = await retryWithBackoff<CompaniesApiResponse>(
        async () => {
          const response = await fetch('/api/companies');
          if (!response.ok) {
            throw new Error(
              `Failed to fetch companies. Status code: ${response.status}`,
            );
          }
          return response.json();
        },
      );

      setCompanies(companies);
      setError(null);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetCompanies();
  }, []);

  return { companies, isLoading, error, retryFetch: fetchAndSetCompanies };
}
