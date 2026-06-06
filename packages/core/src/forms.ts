import formBehaviorData from '../../../data/canonical/form-behavior.json';
import entryProfilesData from '../../../data/canonical/entry-profiles.json';
import postalData from '../../../data/canonical/postal-rules.json';
import { FormBehavior, EntryProfile, PostalBehavior, PostalRule } from './types';

export const formBehaviors: FormBehavior[] = formBehaviorData as any as FormBehavior[];
export const entryProfiles: EntryProfile[] = entryProfilesData as EntryProfile[];
const localPostalRules: PostalRule[] = postalData as PostalRule[];

export const getFormBehavior = (iso2: string): FormBehavior | null => {
  return formBehaviors.find(f => f.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};

export const getEntryRules = (iso2: string, profile: string): string[] => {
  const prof = entryProfiles.find(p => p.id === profile);
  return prof ? prof.requiredFields : [];
};

export const getPostalCodeBehavior = (iso2: string, profile: string): PostalBehavior | null => {
  const rule = localPostalRules.find(p => p.iso2.toUpperCase() === iso2.toUpperCase());
  if (!rule) return null;

  const prof = entryProfiles.find(p => p.id === profile);
  const strictness = prof ? prof.strictness : 'loose';

  let required = false;
  if (strictness === 'strict' && rule.requiredForShipping) {
    required = true;
  } else if (strictness === 'medium' && rule.requiredForConsumerForms) {
    required = true;
  }

  return {
    used: rule.used,
    required,
    regex: rule.regex
  };
};
