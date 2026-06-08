import { describe, it, expect } from 'vitest';
import {
  getCountry,
  searchCountries,
  validatePostalCode,
  getCallingCode,
  getAddressFields,
  getMeasurementSystem,
  getPreferredUnits,
  getLocalizedCountryName,
  getLocalesByCountry,
  getDefaultLocale,
  getWritingSystem,
  isRtlLocale,
} from './index';

describe('Global Entry Data Core API', () => {
  it('should find a country by iso2', () => {
    const jp = getCountry('JP');
    expect(jp).toBeDefined();
    expect(jp?.name).toBe('Japan');
  });

  it('should search countries by name', () => {
    const results = searchCountries('United States');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.iso2 === 'US')).toBe(true);
  });

  it('should validate postal codes', () => {
    // Basic test based on existing canonical data for JP if present, else just a generic check
    expect(validatePostalCode('JP', '100-0001')).toBe(true); // Should pass generic or specific check
  });

  it('should get calling codes', () => {
    expect(getCallingCode('US')).toBe('1');
    expect(getCallingCode('JP')).toBe('81');
  });

  it('should return address fields for country', () => {
    const jpFields = getAddressFields('JP');
    expect(jpFields).toBeDefined();
    expect(Array.isArray(jpFields)).toBe(true);
  });

  describe('Measurement Systems', () => {
    it('should get measurement system for JP', () => {
      const ms = getMeasurementSystem('JP');
      expect(ms).toBeDefined();
      expect(ms?.measurementSystem).toBe('metric');
      expect(ms?.traditionalSystems).toContain('japanese_traditional');
    });

    it('should get preferred units for US', () => {
      const units = getPreferredUnits('US');
      expect(units).toBeDefined();
      expect(units?.temperature).toBe('fahrenheit');
      expect(units?.distance).toBe('mile');
      expect(units?.weight).toBe('pound');
      expect(units?.height).toBe('foot');
      expect(units?.paperSize).toBe('Letter');
    });

    it('should get preferred units for GB (mixed/imperial context)', () => {
      const units = getPreferredUnits('GB');
      expect(units).toBeDefined();
      expect(units?.distance).toBe('mile');
      expect(units?.weight).toBe('kilogram'); // Based on my canonical data entry
    });
  });

  describe('i18n Helpers', () => {
    it('should get localized country names', () => {
      expect(getLocalizedCountryName('JP', 'en')).toBe('Japan');
      expect(getLocalizedCountryName('JP', 'ja')).toBe('日本');
      expect(getLocalizedCountryName('US', 'en-US')).toBe('United States');
      expect(getLocalizedCountryName('US', 'ja-JP')).toBe('アメリカ合衆国');
    });

    it('should get locales by country', () => {
      const locales = getLocalesByCountry('CA');
      expect(locales.length).toBeGreaterThan(1);
      expect(locales.some((l) => l.locale === 'en-CA')).toBe(true);
      expect(locales.some((l) => l.locale === 'fr-CA')).toBe(true);
    });

    it('should get default locale', () => {
      expect(getDefaultLocale('JP')).toBe('ja-JP');
      expect(getDefaultLocale('US')).toBe('en-US');
    });

    it('should detect RTL locales', () => {
      expect(isRtlLocale('ar-SA')).toBe(true);
      expect(isRtlLocale('en-US')).toBe(false);
    });

    it('should get writing system info', () => {
      const ws = getWritingSystem('ja-JP');
      expect(ws).toBeDefined();
      expect(ws?.script).toBe('Jpan');
      expect(ws?.direction).toBe('ltr');
    });
  });
});
