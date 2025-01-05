import { GET } from '../../api/companies/route';
import { describe, it, expect } from 'vitest';
import mockCompanies from '../../data/companies';

describe('GET /api/companies', () => {
  it('returns all companies when no query is provided', async () => {
    const req = new Request('http://localhost/api/companies');
    const res = await GET(req);

    const json = await res.json();
    expect(json.data).toEqual(mockCompanies);
  });

  it('filters companies by search query', async () => {
    const req = new Request('http://localhost/api/companies?search=OKEA');
    const res = await GET(req);

    const json = await res.json();
    expect(json.data).toEqual([mockCompanies[0]]); // OKEA matches the query
  });

  it('returns an empty array if no companies match the search query', async () => {
    const req = new Request(
      'http://localhost/api/companies?search=Nonexistent',
    );
    const res = await GET(req);

    const json = await res.json();
    expect(json.data).toEqual([]);
  });

  it('handles pagination correctly', async () => {
    const req = new Request('http://localhost/api/companies?page=1&limit=1');
    const res = await GET(req);

    const json = await res.json();
    expect(json.data).toHaveLength(1); // Only one company per page
    expect(json.data[0]).toEqual(mockCompanies[0]); // First company on page 1
  });
});
