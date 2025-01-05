import TrendingCompanyList from './components/TrendingCompanyList';

/**
 * Represents the main homepage where trending companies are displayed.
 * Uses the TrendingCompanyList component to list the companies.
 */
export default function CompanyOverviewPage() {
  return (
    <main className="bg-light mx-auto max-w-2xl p-6 shadow-md">
      <header>
        <h2
          className="text-lg text-gray-400"
          aria-label="Trending Companies Section"
        >
          Trending companies
        </h2>
      </header>
      <section>
        <TrendingCompanyList />
      </section>
    </main>
  );
}
