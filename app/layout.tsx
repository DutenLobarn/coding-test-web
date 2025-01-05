import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

/**
 * Import the Inter font with Latin subset for consistent typography
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata for the application, used for SEO and browser titles.
 */
export const metadata = {
  title: 'Quartr',
  description: 'A platform for financial insights and investor relations.',
};

/**
 * Root layout component for the application.
 * Wraps all pages and provides shared metadata and styles.
 *
 * @param {ReactNode} children - The children components to render inside the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function AppLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
