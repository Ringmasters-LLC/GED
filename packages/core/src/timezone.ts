import timezoneData from '../../../data/canonical/timezone-defaults.json';
import { TimezoneMetadata } from './types';

export const timezones: TimezoneMetadata[] = timezoneData as any as TimezoneMetadata[];

export const getTimezones = (iso2: string): string[] => {
  const data = timezones.find(t => t.iso2.toUpperCase() === iso2.toUpperCase());
  return data?.zones || (data?.primaryZone ? [data.primaryZone] : []);
};

export const getDefaultTimezone = (iso2: string): string | null => {
  const data = timezones.find(t => t.iso2.toUpperCase() === iso2.toUpperCase());
  return data?.primaryZone || null;
};

export const hasMultipleTimezones = (iso2: string): boolean => {
  const zones = getTimezones(iso2);
  return zones.length > 1;
};

export const getTimezoneOffset = (timezone: string, date: Date = new Date()): number => {
  // Simple wrapper around Intl.DateTimeFormat
  const parts = Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  }).formatToParts(date);
  
  const offsetPart = parts.find(p => p.type === 'timeZoneName');
  if (!offsetPart) return 0;
  
  const offsetStr = offsetPart.value; // e.g. "GMT-07:00"
  if (offsetStr === 'GMT') return 0;
  
  const match = offsetStr.match(/GMT([+-])(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);
  
  return sign * (hours * 60 + minutes);
};
