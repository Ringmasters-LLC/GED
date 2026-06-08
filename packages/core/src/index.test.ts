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
  getLocalizedLanguageName,
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
      expect(getLocalizedCountryName('CH', 'de')).toBe('Schweiz');
      expect(getLocalizedCountryName('BE', 'fr')).toBe('Belgique');
    });

    it('should get localized language names', () => {
      expect(getLocalizedLanguageName('ja', 'en')).toBe('Japanese');
      expect(getLocalizedLanguageName('ja', 'ja')).toBe('日本語');
      expect(getLocalizedLanguageName('de', 'ja')).toBe('ドイツ語');
    });

    it('should get locales by country', () => {
      const localesCA = getLocalesByCountry('CA');
      expect(localesCA.length).toBeGreaterThan(1);
      expect(localesCA.some((l) => l.locale === 'en-CA')).toBe(true);
      expect(localesCA.some((l) => l.locale === 'fr-CA')).toBe(true);

      const localesCH = getLocalesByCountry('CH');
      expect(localesCH.length).toBe(4);
      expect(localesCH.some((l) => l.locale === 'rm-CH')).toBe(true);
    });

    it('should get default locale', () => {
      expect(getDefaultLocale('JP')).toBe('ja-JP');
      expect(getDefaultLocale('US')).toBe('en-US');
      expect(getDefaultLocale('HK')).toBe('zh-HK');
      expect(getDefaultLocale('AE')).toBe('ar-AE');
    });

    it('should detect RTL locales', () => {
      expect(isRtlLocale('ar-SA')).toBe(true);
      expect(isRtlLocale('ar-AE')).toBe(true);
      expect(isRtlLocale('he-IL')).toBe(true);
      expect(isRtlLocale('en-US')).toBe(false);
    });

    it('should get writing system info', () => {
      const wsJP = getWritingSystem('ja-JP');
      expect(wsJP?.script).toBe('Jpan');
      expect(wsJP?.direction).toBe('ltr');

      const wsIL = getWritingSystem('he-IL');
      expect(wsIL?.script).toBe('Hebr');
      expect(wsIL?.direction).toBe('rtl');
    });
  });
});
