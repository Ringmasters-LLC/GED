import { z } from 'zod';

export const CountrySchema = z.object({
  iso2: z.string().length(2),
  iso3: z.string().length(3),
  numeric: z.string().length(3),
  name: z.string(),
  territoryType: z.enum(['sovereign', 'dependent', 'disputed', 'administrative']),
  parentTerritory: z.string().length(2).optional(),
  commerceSelectable: z.boolean(),
  confidence: z.number().min(0).max(1),
  sources: z.array(z.string()),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const PhoneCodeSchema = z.object({
  iso2: z.string().length(2),
  callingCodes: z.array(z.string()),
  recommendedLibrary: z.string(),
  normalizationTarget: z.string(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const PostalRuleSchema = z.object({
  iso2: z.string().length(2),
  used: z.boolean(),
  requiredForConsumerForms: z.boolean(),
  requiredForShipping: z.boolean(),
  format: z.string().optional(),
  regex: z.string().optional(),
  examples: z.array(z.string()).optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const CurrencySchema = z.object({
  code: z.string().length(3),
  name: z.string(),
  symbol: z.string(),
  minorUnit: z.number().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const LanguageSchema = z.object({
  code: z.string().min(2).max(3),
  name: z.string(),
  nativeName: z.string().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const TimezoneSchema = z.object({
  iso2: z.string().length(2),
  primaryZone: z.string(),
  zones: z.array(z.string()).optional(),
  observesDst: z.boolean().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const AddressFormatSchema = z.object({
  iso2: z.string().length(2),
  requiredFields: z.array(z.string()),
  fieldOrder: z.array(z.string()),
  administrativeAreaLabel: z.string().optional(),
  postalCodeLabel: z.string().optional(),
  postalCodePosition: z
    .enum(['before_city', 'after_city', 'after_admin_area', 'top', 'bottom'])
    .optional(),
  addressLinesRecommended: z.number().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const NameFormatSchema = z.object({
  iso2: z.string().length(2),
  nameOrder: z.enum(['given_family', 'family_given']),
  supportsSingleName: z.boolean(),
  requiresFamilyName: z.boolean(),
  patronymicCommon: z.boolean().optional(),
  middleNameCommon: z.boolean().optional(),
  honorificCommon: z.boolean().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const CountryLocaleSchema = z.object({
  iso2: z.string().length(2),
  locales: z.array(
    z.object({
      locale: z.string(),
      official: z.boolean(),
      default: z.boolean().optional(),
    }),
  ),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const AdministrativeLevelSchema = z.object({
  iso2: z.string().length(2),
  levels: z.array(
    z.object({
      level: z.number(),
      key: z.string(),
      label: z.string(),
      requiredForAddress: z.boolean().optional(),
    }),
  ),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const CurrencyBehaviorSchema = z.object({
  iso2: z.string().length(2),
  primaryCurrency: z.string().length(3),
  commonCurrencies: z.array(z.string().length(3)).optional(),
  cashCurrencyDiffersFromSettlement: z.boolean().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const MeasurementSystemSchema = z.object({
  iso2: z.string().length(2),
  measurementSystem: z.enum(['metric', 'imperial', 'us_customary']),
  temperature: z.enum(['celsius', 'fahrenheit']).optional(),
  distance: z.enum(['kilometer', 'mile']).optional(),
  weight: z.enum(['kilogram', 'pound']).optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const DateTimeFormatSchema = z.object({
  locale: z.string(),
  dateFormat: z.string(),
  timeCycle: z.enum(['h11', 'h12', 'h23', 'h24']).optional(),
  weekStart: z.enum(['monday', 'sunday', 'saturday']).optional(),
  calendar: z.string().optional(),
  alternateCalendars: z.array(z.string()).optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const MarketBehaviorSchema = z.object({
  iso2: z.string().length(2),
  selectableAsCountry: z.boolean().optional(),
  selectableAsBillingCountry: z.boolean().optional(),
  selectableAsShippingCountry: z.boolean().optional(),
  selectableAsPhoneCountry: z.boolean().optional(),
  selectableAsResidence: z.boolean().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const LocalizedCountryNameSchema = z.object({
  iso2: z.string().length(2),
  names: z.record(z.string()),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const CountryDisplayOrderSchema = z.object({
  iso2: z.string().length(2),
  priority: z.number().optional(),
  popular: z.boolean().optional(),
  region: z.string().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const AddressComponentSchema = z.object({
  iso2: z.string().length(2),
  components: z.array(z.string()),
  order: z.enum(['small_to_large', 'large_to_small']),
  streetAddressCentral: z.boolean(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const LocaleWritingSchema = z.object({
  locale: z.string(),
  script: z.string(),
  direction: z.enum(['ltr', 'rtl']),
  latinFallbackCommon: z.boolean().optional(),
  nativeScriptRecommended: z.boolean().optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const TerritoryTypeSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  sources: z.array(z.string()),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const EntryProfileSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  strictness: z.enum(['loose', 'medium', 'strict']),
  requiredFields: z.array(z.string()),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const FormBehaviorSchema = z.object({
  iso2: z.string().length(2),
  name: z
    .object({
      supportsSingleName: z.boolean().optional(),
      requiresFamilyName: z.boolean().optional(),
      nameOrder: z.enum(['given_family', 'family_given']).optional(),
    })
    .optional(),
  address: z
    .object({
      addressLinesRecommended: z.number().optional(),
      streetAddressCentral: z.boolean().optional(),
    })
    .optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const ContractMap: Record<string, z.ZodTypeAny> = {
  'countries.json': z.array(CountrySchema),
  'phone-codes.json': z.array(PhoneCodeSchema),
  'postal-rules.json': z.array(PostalRuleSchema),
  'currencies.json': z.array(CurrencySchema),
  'languages.json': z.array(LanguageSchema),
  'timezone-defaults.json': z.array(TimezoneSchema),
  'address-formats.json': z.array(AddressFormatSchema),
  'name-formats.json': z.array(NameFormatSchema),
  'locale-writing.json': z.array(LocaleWritingSchema),
  'country-locales.json': z.array(CountryLocaleSchema),
  'administrative-levels.json': z.array(AdministrativeLevelSchema),
  'address-components.json': z.array(AddressComponentSchema),
  'currency-behavior.json': z.array(CurrencyBehaviorSchema),
  'measurement-systems.json': z.array(MeasurementSystemSchema),
  'date-time-formats.json': z.array(DateTimeFormatSchema),
  'market-behavior.json': z.array(MarketBehaviorSchema),
  'localized-country-names.json': z.array(LocalizedCountryNameSchema),
  'country-display-order.json': z.array(CountryDisplayOrderSchema),
  'territory-types.json': z.array(TerritoryTypeSchema),
  'entry-profiles.json': z.array(EntryProfileSchema),
  'form-behavior.json': z.array(FormBehaviorSchema),
};
