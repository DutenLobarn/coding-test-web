/**
 * Represents an ISIN (International Securities Identification Number),
 * a standardized 12-character alphanumeric identifier for securities.
 *
 * Example: 'US0378331005' (Apple Inc.)
 *
 * The format includes:
 * - 2 letters: Country code (ISO 3166-1 alpha-2)
 * - 9 alphanumeric characters: Security identifier
 * - 1 digit: Checksum
 *
 * Reference: https://www.iso.org/standard/44866.html
 */

export type ISIN = string;

/**
 * Validates whether a given string is a valid ISIN (ISO 6166 format).
 *
 * @param isin - The ISIN string to validate.
 * @returns True if the ISIN code is valid, or false otherwise.
 */
export function validateISINCode(isin: string): boolean {
  const regex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
  return regex.test(isin);
}

/**
 * Extracts the country code from an ISIN.
 *
 * @param isin - The ISIN string to extract the country code from.
 * @returns The 2-character country code, or null if the ISIN is invalid.
 */
export function getCountryCodeFromISIN(isin: string): string | null {
  if (validateISINCode(isin)) {
    return isin.substring(0, 2);
  }
  return null;
}
