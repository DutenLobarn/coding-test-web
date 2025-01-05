import type { IsoCountryCode } from '../types/iso/country';
import type { CompanyCurrency } from '../types/iso/currency';
import type { ISIN } from './isin';

/**
 * Represents a single event related to a company, such as a quarterly report or Q&A session.
 */
interface Event {
  audioUrl?: string | null;
  reportUrl: string | null;
  pdfUrl: string | null;
  eventId: number;
  eventTitle: string;
  /** ISO date string in UTC, e.g., '2022-10-26T08:00:00.000Z' */
  eventDate: string;
  qnaTimestamp: number | null;
  /** Fiscal period, e.g., 'Q2' */
  fiscalPeriod: string;
  /** Fiscal period, e.g., '2025' */
  fiscalYear: string;
}

/**
 * Represents the color configuration for a company, such as the primary brand color.
 */
interface ColorSettings {
  /** Hexadecimal color code */
  brandColor: string;
}

/**
 * Represents a company and its associated attributes.
 */
export interface Company {
  companyId: number;
  companyName: string;
  companyCountry: IsoCountryCode;
  displayName: string;
  /** Ticker symbol, e.g., 'TSLA' (Tesla) */
  companyTicker: string;
  infoUrl: string;
  liveUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string | null;
  iconUrl?: string | null;
  description: string;
  reportingCurrency: CompanyCurrency;
  colorSettings: ColorSettings;
  events: Event[];
  /** Array of ISO 6166 ISIN codes (Optional) */
  isins?: ISIN[]; //
}
