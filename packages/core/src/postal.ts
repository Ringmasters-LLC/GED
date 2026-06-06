import postalData from '../../../data/canonical/postal-rules.json';
import { PostalRule } from './types';

export const postalRules: PostalRule[] = postalData as PostalRule[];

export const getPostalRule = (iso2: string): PostalRule | null => {
  return postalRules.find(p => p.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};

export const validatePostalCode = (iso2: string, value: string): boolean => {
  const rule = getPostalRule(iso2);
  if (!rule) return true; // If no rule, we cannot invalidate it
  if (!rule.used) {
    // If not used, any non-empty value might be an error depending on strictness, but let's say true if empty, false if not?
    // Wait, the spec says "validatePostalCode(iso2, value): boolean".
    if (!value) return true;
  }
  if (!rule.regex) return true; // No regex to check
  const re = new RegExp(rule.regex);
  return re.test(value);
};
