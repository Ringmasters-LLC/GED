import dateTimeData from '../../../data/canonical/date-time-formats.json';
import { DateTimeFormat, CalendarPreferences } from './types';

export const dateTimeFormats: DateTimeFormat[] = dateTimeData as any as DateTimeFormat[];

export const getDateTimeFormat = (locale: string): DateTimeFormat | null => {
  return dateTimeFormats.find(f => f.locale === locale) || null;
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
    alternateCalendars: data.alternateCalendars
  };
};
