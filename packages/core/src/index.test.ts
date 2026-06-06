import { describe, it, expect } from 'vitest';
import { getCountry, searchCountries, validatePostalCode, getCallingCode, getAddressFields } from './index';

describe('Global Entry Data Core API', () => {
  it('should find a country by iso2', () => {
    const jp = getCountry('JP');
    expect(jp).toBeDefined();
    expect(jp?.name).toBe('Japan');
  });

  it('should search countries by name', () => {
    const results = searchCountries('United States');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(c => c.iso2 === 'US')).toBe(true);
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
});
