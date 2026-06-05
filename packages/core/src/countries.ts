import { Country } from './types';
import countriesData from '../../../data/canonical/countries.json';

export const countries: Country[] = countriesData as Country[];

export const getCountries = (): Country[] => countries;

export const getCountry = (iso2: string): Country | null => {
  return countries.find(c => c.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};

export const searchCountries = (query: string): Country[] => {
  const q = query.toLowerCase();
  return countries.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.iso2.toLowerCase() === q
  );
};

export const getTerritoryType = (iso2: string): string | null => {
  const country = getCountry(iso2);
  return country ? country.territoryType : null;
};

