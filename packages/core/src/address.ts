import addressFormatData from '../../../data/canonical/address-formats.json';
import { AddressFormat } from './types';

export const addressFormats: AddressFormat[] = addressFormatData as AddressFormat[];

export const getAddressFormat = (iso2: string): AddressFormat | null => {
  return addressFormats.find((a) => a.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};

export const getAddressFields = (iso2: string): string[] => {
  const format = getAddressFormat(iso2);
  return format ? format.fieldOrder : [];
};
