import { describe, it, expect } from 'vitest';
import {
  getCountry,
  searchCountries,
  validatePostalCode,
  getCallingCode,
  getAddressFields,
  getMeasurementSystem,
  getPreferredUnits,
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
});
