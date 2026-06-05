import phoneData from '../../../data/canonical/phone-codes.json';

export interface PhoneMetadata {
  iso2: string;
  callingCodes: string[];
  recommendedLibrary: string;
  normalizationTarget: string;
  updatedAt: string;
}

export const phoneCodes: PhoneMetadata[] = phoneData as PhoneMetadata[];

export const getCallingCode = (iso2: string): string | null => {
  const data = phoneCodes.find(p => p.iso2.toUpperCase() === iso2.toUpperCase());
  return data ? data.callingCodes[0] : null;
};

export const getCountriesByCallingCode = (code: string): string[] => {
  return phoneCodes
    .filter(p => p.callingCodes.includes(code))
    .map(p => p.iso2);
};

export const getPhoneMetadata = (iso2: string): PhoneMetadata | null => {
  return phoneCodes.find(p => p.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};
