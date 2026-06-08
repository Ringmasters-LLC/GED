# Global Entry Data Spec

## 1. Purpose

GED is a **behavior metadata layer**. It normalizes global reference patterns into stable, typed, developer-facing entry models. It does not own "truth" but integrates domain authorities for checkout, CRMs, and SaaS onboarding.

## 2. Global Entry Philosophy

Core thesis: Most global software is domestic assumption with international patches. GED starts from global variance first.

- **Synthesis Layer**: Normalize complex upstream standards (CLDR, libaddressinput, libphonenumber) into human-readable behavior.
- **Integration over Ownership**: Use domain authorities where they exist; normalize for developers.
- **No US-default address model.**
- No forced postal-code requirement.
- No forced state/province requirement.
- No forced first-name/last-name assumption.
- One calling code may map to many territories.
- Territory is not always the same as sovereign country.
- Address order differs by country.
- Postal-code usefulness differs by country.
- Validation strictness depends on use case.
- Data confidence must be explicit.
- Do not present uncertainty as certainty. Use confidence levels.

## 3. Decoupling From US Defaults

Core principle: Do not start from a US address, identity, commerce, or naming model. Model global variation directly.

- **Locale is not country.**
- **Country is not market.**
- **Country is not currency.**
- **Country is not language.**
- **Country is not phone numbering region.**
- **Country is not legal jurisdiction in all cases.**
- **Address is not street/city/state/ZIP globally.**
- **Name is not first/middle/last globally.**
- **Postal code is not globally required.**
- **State/province is not globally required.**
- **English alphabetical sorting is not globally neutral.**
- **Gregorian/MM-DD-YYYY is not globally neutral.**
- **US customary units are not globally neutral.**
- **One dropdown cannot serve shipping, billing, residence, citizenship, and phone country equally.**

## 4. Non-Goals (Core)

No full global postal-code database in core. No geocoding. No address verification. No shipping-grade validation. No tax/legal compliance. No runtime network dependencies. No paid APIs.

## 5. Target Consumers

Web forms. Booking systems. WordPress plugins. Mobile apps. Admin tools. Offline-first applications.

## 6. Data Sets

- **Country Lists**: ISO 3166-1 alpha-2, names.
- **Phone Codes**: E.164 calling codes.
- **Postal Rules**: Format strings, regex validation.
- **Currencies**: ISO 4217 codes, symbols, names.
- **Languages**: ISO 639-1 codes, names.
- **Timezone Defaults**: Primary IANA zone per country.
- **Address Formats**: Field ordering, labels, requirement rules.
- **Form Behavior**: UI/UX rules for entry.
- **Territory Types**: Classification (sovereign, dependent, etc.).
- **Entry Profiles**: Context-specific rules (CRM vs Checkout).
- **Name Formats**: Cultural ordering, single name support, honorifics.
- **Locale Writing**: Script, direction (LTR/RTL), recommended scripts.
- **Country Locales**: Mapping of countries to official and default locales.
- **Administrative Levels**: Hierarchy labels (prefecture, emirate) and requirements.
- **Address Components**: Granular field ordering (large-to-small vs small-to-large).
- **Currency Behavior**: Multi-currency support, settlement vs cash, minor units.
- **Measurement Systems**: Preferred units (metric, imperial) per country.
- **Date/Time Formats**: Preferred patterns, week start, alternate calendars.
- **Market Behavior**: Selectability for shipping, billing, phone, residence.
- **Localized Country Names**: Multi-language translations for iso2 codes.
- **Country Display Order**: Sorting rules (alphabetical, popular, regional).

## 7. Package Outputs

- NPM package (@ringmasters/global-entry-data).
- JSON files (canonical source).
- TSV files (machine-friendly web grab).
- CSV files (spreadsheet import).
- TXT files (simple copy-paste list).
- MD files (documentation, GitHub browsing, agent context).
- SQLite database (database import).
- SQL scripts (database import).
- TypeScript definitions.
- ESM and CJS bundles.
- JSON Schemas.

## 8. Public API (v0.1.x)

```ts
getCountries(): Country[]
getCountry(iso2: string): Country | null
getCountryByIso3(iso3: string): Country | null
searchCountries(query: string): Country[]

getCallingCode(iso2: string): string | null
getCountriesByCallingCode(code: string): Country[]

getPostalRule(iso2: string): PostalRule | null
validatePostalCode(iso2: string, value: string): boolean

getCurrency(iso2: string): Currency | null
getLanguages(iso2: string): Language[]
getTimezoneDefaults(iso2: string): string[]

getAddressFormat(iso2: string): AddressFormat | null
getAddressFields(iso2: string): AddressField[]
getEntryRules(iso2: string, profile: string): EntryRules
getTerritoryType(iso2: string): string
getFormBehavior(iso2: string): FormBehavior
getPostalCodeBehavior(iso2: string, profile: string): PostalBehavior
```

## 9. Public API (v0.2.x i18n Planned)

```ts
getWritingSystem(locale: string): WritingSystem | null
isRtlLocale(locale: string): boolean
getLocalesByCountry(iso2: string): LocaleMetadata[]
getDefaultLocale(iso2: string): string | null
getAdministrativeLevels(iso2: string): AdministrativeLevel[]
getAddressComponents(iso2: string): AddressComponent[]
getCurrencyBehavior(iso2: string): CurrencyBehavior | null
getMeasurementSystem(iso2: string): MeasurementSystem | null
getDateTimeFormat(locale: string): DateTimeFormat | null
getMarketBehavior(iso2: string): MarketBehavior | null
getLocalizedCountryName(iso2: string, locale: string): string | null
getLocalizedLanguageName(languageCode: string, locale: string): string | null
sortCountries(countries: Country[], options: SortOptions): Country[]
```

## 10. Schema Rules

- Every country requires `iso2`.
- `iso2` must be unique.
- Calling codes must map to at least one country.
- All postal regex must compile.
- Postal examples must pass their regex.
- All JSON must validate against local schemas.
- Generated files must have deterministic row ordering.
- Every record requires source metadata and `updatedAt`.
- **Fields**:
  - `iso2`, `iso3`, `numeric`, `territoryType`, `parentTerritory`, `commerceSelectable`
  - `phone.callingCodes` (array), `phone.recommendedLibrary`, `phone.normalizationTarget`
  - `postalCode.used`, `postalCode.requiredForConsumerForms`, `postalCode.requiredForShipping`, `postalCode.label`, `postalCode.regex`, `postalCode.examples` (array)
  - `address.requiredFields` (array), `address.fieldOrder` (array)
  - `address.order` (L-S vs S-L), `address.administrativeAreaLabel`, `address.postalCodePosition`
  - `name.supportsSingleName`, `name.requiresFamilyName`, `name.nameOrder`
  - `confidence` (0.0 - 1.0), `sources` (array)

## 11. Markdown Distribution Rules

- MD files are generated artifacts.
- Never hand-edit MD data tables.
- Generate strictly from canonical JSON.
- **Required MD Outputs**: `countries.md`, `phone-codes.md`, `postal-rules.md`, `currencies.md`, `languages.md`, `timezones.md`, `address-formats.md`, `form-behavior.md`, `anti-patterns.md`.

## 12. Source and Attribution Policy

- Use: "compatible with", "derived from", "normalized against".
- Avoid: "official", "guaranteed", "authoritative".
- Sources: ISO 3166, libphonenumber, libaddressinput, CLDR, GeoNames.

## 13. Build & CI

- Lint code and schemas.
- Run unit tests for API and data validation.
- Fail on non-deterministic generation.
- Monthly automated ingest via `data-refresh.yml`.

## 14. Internationalization (i18n) Architecture (v0.2.0)

i18n is core architecture, not a cosmetic layer.

### 14.1 Core Principles

- **Separate country, locale, language, script, timezone, currency, market, and display behavior.**
- **Must Not Do**:
  - Do not treat country as locale.
  - Do not treat language as country.
  - Do not hardcode English country names.
  - Do not assume Latin script or LTR layout.
  - Do not assume Gregorian-only display.
  - Do not assume one country has one language.
  - Do not assume one locale has one country.

### 14.2 i18n Core Modules

- **localized-country-names.json**: Country names by locale.
- **country-locales.json**: Official/default/common locales by country.
- **locale-writing.json**: Script, direction, native-script behavior.
- **date-time-formats.json**: Date pattern, time cycle, week start, calendar preference.
- **country-display-order.json**: Sorting rules by locale/market.
- **language-names.json**: Localized language names.

### 14.3 Implementation Requirements

- **i18n Zod contracts** for every module.
- **i18n API helpers** (as defined in Section 9).
- **Test cases** for: JP, US, CA, CH, BE, AE, IL, HK.

## 15. Finance & Commerce Roadmap (Satellite Packages)

### 15.1 @ringmasters/global-entry-commerce (P7)

Static commerce reference metadata.

- **Datasets**: `currencies.json`, `currency-behavior.json`, `cash-rounding.json`, `payment-method-preferences.json`, `tax-labels.json`, `market-behavior.json`.

### 15.2 @ringmasters/global-entry-fx (P7)

Forex metadata and conversion adapters.

- **Datasets**: `currency-pairs.json`, `fx-provider-metadata.json`, `conversion-rules.json`, `rate-freshness-policy.json`, `historical-rate-policy.json`.
- **Model**: Adapter-based. GED normalizes shape; app chooses provider. No live rate claims.

### 15.3 @ringmasters/global-entry-assets (P7)

Metadata for coins, tokens, stocks, and ETFs.

- **Datasets**: `asset-types.json`, `crypto-assets.json`, `fiat-currencies.json`, `commodity-units.json`, `exchange-codes.json`, `ticker-symbol-rules.json`.
- **Constraint**: Do not treat crypto symbols like ISO currency codes. Chains and contract addresses required.

### 15.4 @ringmasters/global-entry-finance-i18n (P7)

Market-specific semantic translations for financial jargon.

- **Datasets**: `finance-terms.json`, `stock-market-jargon.json`, `order-types.json`, `asset-class-labels.json`, `risk-term-labels.json`, `localized-market-terms.json`.

## 16. Media Metadata Roadmap (Satellite Packages)

### 16.1 @ringmasters/global-entry-media (P7)

TV and radio station reference metadata.

- **Datasets**: `tv-stations.json`, `radio-stations.json`, `broadcast-networks.json`, `station-affiliations.json`, `media-markets.json`, `broadcast-bands.json`, `call-sign-rules.json`, `country-broadcast-systems.json`, `public-broadcasters.json`, `emergency-broadcast-systems.json`.
- **Station Fields**: `id`, `name`, `legalName`, `callSign`, `type`, `medium`, `network`, `affiliations`, `iso2`, `region`, `market`, `city`, `timezone`, `languages`, `frequency`, `channel`, `band`, `website`, `status`, `sources`, `updatedAt`, `confidence`.
- **Non-Goals**:
  - No live program schedules.
  - No EPG scraping.
  - No broadcast authority claims.
  - No redistribution of proprietary station databases without license.
  - No live programming schedules in static package.
  - No assumption of station name permanence.

## 17. Risk Controls (Consolidated)

- **Source Policy**: CLDR-compatible. Track source per row.
- **No Official Authority**: Never claim to be official authority for CLDR, finance, or media.
- **Separation of Concerns**: Live/time-sensitive data (rates, schedules) must be adapters, not static JSON truth.
- **No fit guarantees** for lifestyle; **no investment advice** for finance; **no emergency infrastructure** for hazards/media.

## 18. Developer User Stories (v0.2+)

- Developer can render Japan as 日本 for ja locale.
- Developer can detect that ar locales are RTL.
- Developer can distinguish CA has en-CA and fr-CA.
- Developer can detect that CH has multiple official locales.
- Developer can sort country picker by user locale.
- Developer can detect Hong Kong is not forced into one language or postal-code assumption.
