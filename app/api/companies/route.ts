import { NextResponse } from 'next/server';
import mockCompanies from '../../data/companies';
import logger from '../../utils/logger';
import { Company } from '../../types/company';

/**
 * Type definition for paginated response.
 */
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Filters companies based on a search query.
 * @param search The search term to filter companies.
 * @returns The filtered list of companies.
 */
function filterCompanies(search: string | null): Company[] {
  if (!search) return mockCompanies;
  return mockCompanies.filter(({ companyName }) =>
    companyName.toLowerCase().includes(search.toLowerCase()),
  );
}

/**
 * Paginates a list of companies.
 * @param companies The full list of companies.
 * @param page The current page number.
 * @param limit The maximum number of items per page.
 * @returns The paginated companies.
 */
function paginateCompanies(
  companies: Company[],
  page: number,
  limit: number,
): Company[] {
  return companies.slice((page - 1) * limit, page * limit);
}

/**
 * Mock API endpoint to fetch companies with search and pagination.
 * @param request The incoming HTTP request.
 * @returns The response containing paginated companies or an error.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const filteredCompanies = filterCompanies(search);
    const paginatedCompanies = paginateCompanies(
      filteredCompanies,
      page,
      limit,
    );

    const response: PaginatedResponse<Company> = {
      data: paginatedCompanies,
      total: filteredCompanies.length,
      page,
      limit,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to fetch companies:', {
        message: error.message,
        stack: error.stack,
      });
    } else {
      logger.error('Unknown error occurred:', { error });
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching companies.' },
      { status: 500 },
    );
  }
}
