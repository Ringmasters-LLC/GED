import dateTimeData from '../../../data/canonical/date-time-formats.json';
import countryLocaleData from '../../../data/canonical/country-locales.json';
import localizedNameData from '../../../data/canonical/localized-country-names.json';
import localizedLanguageNameData from '../../../data/canonical/language-names.json';
import writingSystemData from '../../../data/canonical/locale-writing.json';
import {
  DateTimeFormat,
  CalendarPreferences,
  LocaleMetadata,
  CountryLocales,
  WritingSystem,
  LocalizedCountryNames,
  LocalizedLanguageNames,
} from './types';

export const dateTimeFormats: DateTimeFormat[] = dateTimeData as any as DateTimeFormat[];
export const countryLocales: CountryLocales[] = countryLocaleData as any as CountryLocales[];
export const localizedCountryNames: LocalizedCountryNames[] =
  localizedNameData as any as LocalizedCountryNames[];
export const localizedLanguageNames: LocalizedLanguageNames[] =
  localizedLanguageNameData as any as LocalizedLanguageNames[];
export const writingSystems: WritingSystem[] =
  writingSystemData as any as WritingSystem[];

export const getDateTimeFormat = (locale: string): DateTimeFormat | null => {
  return dateTimeFormats.find((f) => f.locale === locale) || null;
};

export const getWeekStart = (locale: string): string | null => {
  const data = getDateTimeFormat(locale);
  return data?.weekStart || null;
};

export const getCalendarPreferences = (locale: string): CalendarPreferences | null => {
  const data = getDateTimeFormat(locale);
  if (!data || !data.calendar) return null;
  return {
    calendar: data.calendar,
    alternateCalendars: data.alternateCalendars,
  };
};

export const getLocalizedCountryName = (
  iso2: string,
  locale: string,
): string | null => {
  const data = localizedCountryNames.find(
    (c) => c.iso2.toUpperCase() === iso2.toUpperCase(),
  );
  if (!data) return null;

  // Try full locale first (e.g. en-US)
  if (data.names[locale]) return data.names[locale];

  // Try language code (e.g. en)
  const lang = locale.split('-')[0];
  return data.names[lang] || null;
};

export const getLocalizedLanguageName = (
  code: string,
  locale: string,
): string | null => {
  const data = localizedLanguageNames.find(
    (l) => l.code.toLowerCase() === code.toLowerCase(),
  );
  if (!data) return null;

  // Try full locale first (e.g. ja-JP)
  if (data.names[locale]) return data.names[locale];

  // Try language code (e.g. ja)
  const lang = locale.split('-')[0];
  return data.names[lang] || null;
};

export const getLocalesByCountry = (iso2: string): LocaleMetadata[] => {
  const data = countryLocales.find((c) => c.iso2.toUpperCase() === iso2.toUpperCase());
  return data?.locales || [];
};

export const getDefaultLocale = (iso2: string): string | null => {
  const locales = getLocalesByCountry(iso2);
  const def = locales.find((l) => l.default);
  return def?.locale || locales[0]?.locale || null;
};

export const getWritingSystem = (locale: string): WritingSystem | null => {
  // Try exact match
  let data = writingSystems.find((s) => s.locale === locale);
  if (data) return data;

  // Try language match
  const lang = locale.split('-')[0];
  data = writingSystems.find((s) => s.locale === lang);
  return data || null;
};

export const isRtlLocale = (locale: string): boolean => {
  const system = getWritingSystem(locale);
  return system?.direction === 'rtl';
};
