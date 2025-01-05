'use client';

import TrendingCompanyListItem from './TrendingCompanyListItem';
import Spinner from './Spinner';
import ErrorAlert from './ErrorAlert';
import { useCompanyData } from '../hooks/useCompanyData';
import type { Company } from '../types/company';

/**
 * Component to display a list of trending companies.
 * Handles loading, errors, and empty states.
 */
export default function TrendingCompanyList() {
  const { companies, isLoading, error, retryFetch } = useCompanyData();

  const renderCompanyList = () => (
    <ul
      role="list"
      aria-label="List of trending companies"
      className="divide-y divide-gray-200"
    >
      {companies.map(
        ({
          companyId,
          description,
          companyName,
          logoDarkUrl,
          liveUrl,
        }: Company) => (
          <TrendingCompanyListItem
            key={companyId}
            companyId={companyId}
            companyName={companyName}
            description={description}
            logoDarkUrl={logoDarkUrl}
            liveUrl={liveUrl}
          />
        ),
      )}
    </ul>
  );

  // Handle loading state
  if (isLoading) return <Spinner />;

  // Handle error state
  if (error) {
    return <ErrorAlert error={error} onRetry={retryFetch} />;
  }

  // Handle empty state
  if (companies.length === 0) {
    return (
      <p
        className="py-4 text-gray-500"
        aria-live="polite"
        aria-label="No companies available message"
      >
        No companies available at the moment.
      </p>
    );
  }

  // Render the list of companies
  return renderCompanyList();
}
