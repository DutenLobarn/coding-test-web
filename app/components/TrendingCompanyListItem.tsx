'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Company } from '../types/company';

/**
 * Renders a single company with a logo, name, description, and a link to its live information.
 *
 * @param {Pick<Company, 'companyId' | 'logoDarkUrl' | 'companyName' | 'description' | 'liveUrl'>} props - The details of the company to render.
 * @returns {JSX.Element} The rendered company.
 */
export default function TrendingCompanyListItem({
  companyId,
  logoDarkUrl,
  companyName,
  description,
  liveUrl,
}: Pick<
  Company,
  'companyId' | 'logoDarkUrl' | 'companyName' | 'description' | 'liveUrl'
>): JSX.Element {
  return (
    <li role="listitem" className="flex items-center py-4">
      <Image
        src={
          logoDarkUrl && logoDarkUrl.trim()
            ? logoDarkUrl
            : 'https://placehold.co/50/png'
        }
        alt={logoDarkUrl ? companyName : `Placeholder for ${companyName}`}
        className="h-auto w-auto"
        width="50"
        height="50"
        loading="lazy"
      />

      <div className="ml-4 flex-1">
        <p className="text-base font-semibold text-gray-800">{companyName}</p>
        <div className="line-clamp-2 text-sm text-gray-500">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Link
        href={liveUrl || '#'}
        target={liveUrl ? '_blank' : undefined}
        rel={liveUrl ? 'noopener noreferrer' : undefined}
        aria-label={`Visit ${companyName}'s live information`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="ml-2 h-6 w-6 cursor-pointer text-gray-400"
          aria-label={`Go to ${companyName}'s live information`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </li>
  );
}
