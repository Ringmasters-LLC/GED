export type TerritoryType = 'sovereign' | 'dependent' | 'disputed' | 'administrative';

export interface SourceMetadata {
  name: string;
  url?: string;
  version?: string;
}

export interface Country {
  iso2: string;
  iso3: string;
  numeric: string;
  name: string;
  territoryType: TerritoryType;
  parentTerritory?: string;
  commerceSelectable: boolean;
  confidence: number;
  sources: string[];
  updatedAt: string;
}
export interface PostalRule {
  iso2: string;
  used: boolean;
  requiredForConsumerForms: boolean;
  requiredForShipping: boolean;
  format?: string;
  regex?: string;
  examples?: string[];
  updatedAt: string;
}

export interface AddressFormat {
  iso2: string;
  requiredFields: string[];
  fieldOrder: string[];
  administrativeAreaLabel?: string;
  postalCodeLabel?: string;
  postalCodePosition?: 'before_city' | 'after_city' | 'after_admin_area' | 'top' | 'bottom';
  addressLinesRecommended?: number;
  updatedAt: string;
}

export interface EntryProfile {
  id: string;
  label: string;
  description: string;
  strictness: 'loose' | 'medium' | 'strict';
  requiredFields: string[];
  updatedAt: string;
}

export interface FormBehavior {
  iso2: string;
  name: {
    supportsSingleName: boolean;
    requiresFamilyName: boolean;
    nameOrder: 'given_family' | 'family_given';
  };
  address: {
    addressLinesRecommended?: number;
    streetAddressCentral?: boolean;
  };
  updatedAt: string;
}

export interface PostalBehavior {
  used: boolean;
  required: boolean;
  regex?: string;
}

export interface TimezoneMetadata {
  iso2: string;
  primaryZone: string;
  zones?: string[];
  observesDst?: boolean;
  updatedAt: string;
}

export interface DateTimeFormat {
  locale: string;
  dateFormat: string;
  timeCycle?: 'h11' | 'h12' | 'h23' | 'h24';
  weekStart?: 'monday' | 'sunday' | 'saturday';
  calendar?: string;
  alternateCalendars?: string[];
  updatedAt: string;
}

export interface CalendarPreferences {
  calendar: string;
  alternateCalendars?: string[];
}
