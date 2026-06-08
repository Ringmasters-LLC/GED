# Global Entry Data Spec

## 1. Purpose

GED is a **behavior metadata layer**. It normalizes global reference patterns into stable, typed, developer-facing entry models. It does not own "truth" but integrates domain authorities for checkout, CRMs, and SaaS onboarding.

## 2. Global Entry Philosophy

Core thesis: Most global forms are domestic assumptions with international patches. This repo starts from global variance first.

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

## 4. Non-Goals

No full global postal-code database in core. No geocoding. No address verification. No shipping-grade validation. No tax/legal compliance. No runtime network dependencies. No paid APIs.

## 4. Target Consumers

Web forms. Booking systems. WordPress plugins. Mobile apps. Admin tools. Offline-first applications.

## 5. Data Sets

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

## 6. Package Outputs

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

## 7. Public API

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
getNameFormat(iso2: string): NameFormat | null
getNameFields(iso2: string, profile: string): NameField[]
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
sortCountries(countries: Country[], options: SortOptions): Country[]
```

## 8. Schema Rules

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
  - `address.requiredFields` (e.g. `["addressLine", "locality", "administrativeArea"]`), `address.fieldOrder` (array of strings)
  - `address.order` (e.g., "L-S", "S-L"), `address.administrativeAreaLabel` (e.g. "State", "Province"), `address.postalCodePosition`, `address.addressLinesRecommended`
  - `name.supportsSingleName`, `name.requiresFamilyName`, `name.nameOrder` (e.g. `given_family`)
  - `confidence` (0.0 - 1.0), `sources` (array)

## 9. Postal Source Matrix (Large Dataset)

For `@ringmasters/global-entry-postal-codes`, we maintain a source matrix to track data provenance and licensing.

### 9.1 Source Confidence Policy

- **1.0**: Official government/postal authority API or verified download.
- **0.8**: Official lookup tool (manually verified or scraped with permission).
- **0.7**: High-quality open dataset (e.g., GeoNames).
- **0.5**: Supplemental geospatial data (e.g., OpenStreetMap).
- **0.3**: Community-maintained or unverified sources.
- **0.0**: Placeholder or known unreliable data.

### 9.2 Adapter Naming Convention

Adapters must follow the pattern `<source_id>_<iso2>`.

- Examples: `jppost_jp`, `geonames_global`, `osm_fr`.

### 9.3 Coverage Status

- `official_api_available`: Direct machine access to authority.
- `official_download_available`: Authority provides bulk data.
- `official_lookup_only`: Authority only provides web search.
- `open_dataset_available`: Third-party open data exists.
- `partial_open_dataset`: Incomplete or community-only data.
- `commercial_only`: Data requires paid license.
- `not_used`: Country does not use postal codes.
- `unknown`: Status not yet determined.

## 10. Markdown Distribution Rules

- MD files are generated artifacts.
- MD files are not canonical data.
- MD files are not the primary machine format.
- Never hand-edit MD data tables.
- Generate strictly from canonical JSON.
- Must use stable column order and deterministic sorting.
- Must include a short header.
- Use Markdown tables.
- Stay small enough for GitHub browsing.
- No MD files for full postal-code directories.
- **Required MD Outputs**:
  - `dist/md/countries.md`
  - `dist/md/phone-codes.md`
  - `dist/md/postal-rules.md`
  - `dist/md/currencies.md`
  - `dist/md/languages.md`
  - `dist/md/timezones.md`
  - `dist/md/address-formats.md`
  - `dist/md/form-behavior.md`
  - `dist/md/anti-patterns.md`

## 11. Source and Attribution Policy

- **ISO 3166-compatible** country codes and names.
- **Google libphonenumber-compatible** phone metadata and discipline.
- **Google libaddressinput-compatible** address templates and required fields.
- **CLDR-compatible** locale, territory, language, and currency data.
- **GeoNames-compatible** broad geographic baseline and attribution.
- **OurAirports-compatible** open airport data discipline.
- **WMO/ISC-compatible** hazard alert metadata models.
- **Schema.org-compatible** semantic naming conventions.
- Manually reviewed rules for gaps.
- Use: "compatible with", "derived from", "normalized against".
- Avoid: "official", "guaranteed", "authoritative".

## 12. Licensing

- **Code**: MIT.
- **Data**: Source-dependent. Attribution required per source. No full CC0 claim.

## 13. Versioning

- **MAJOR**: Breaking schema or API changes.
- **MINOR**: New datasets or new fields.
- **PATCH**: Data corrections or monthly refreshes.

## 14. Repository Structure

```text
global-entry-data/
  data/
    canonical/
  dist/
    json/
    tsv/
    csv/
    txt/
    md/
    sql/
    sqlite/
  docs/
    philosophy.md
    anti_patterns.md
    form_failures.md
  packages/
    core/
    postal-codes/
  schemas/
  scripts/
  tests/
  .github/workflows/
```

## 15. Build Pipeline

1. Ingest raw data from sources to `data/canonical/*.json`.
2. Normalize against schemas.
3. Validate data integrity.
4. Generate outputs.
5. Build TypeScript distribution (ESM/CJS).
6. Verify deterministic output.

## 16. CI Requirements

- Lint code and schemas.
- Run unit tests for API and data validation.
- Verify every JSON file against its schema.
- Fail on non-deterministic generation.

## 17. Data Refresh Policy

- Monthly automated ingest.
- Automated validation.
- Manual review for major discrepancies.
- Patch release for every refresh.

## 18. MVP Release Scope (v0.1.0)

- Canonical JSON datasets (`countries.json`, `phone-codes.json`, etc.).
- `address-formats.json`, `form-behavior.json`, `territory-types.json`, `entry-profiles.json`.
- Generated outputs: JSON, TSV, CSV, TXT, MD, SQL, SQLite.
- `countries.md`, `phone-codes.md`, `postal-rules.md`, `currencies.md`, `languages.md`, `timezones.md`, `address-formats.md`, `form-behavior.md`, `anti-patterns.md`.
- TypeScript helpers and schemas.
- Basic tests and documentation.

## 19. Internationalization (i18n) Architecture (v0.2.0)

i18n is core architecture in GED, not a cosmetic layer. It ensures global entry behavior respects local language, script, and cultural norms.

### 19.1 Core Principles

- **Separate country, locale, language, script, timezone, currency, market, and display behavior.**
- Do not treat country as locale.
- Do not hardcode English country names.
- Do not assume Latin script or LTR layout.
- Do not assume Gregorian-only display.
- Support multiple official locales per country.

### 19.2 i18n Core Modules

- **localized-country-names.json**: Country names indexed by locale.
- **country-locales.json**: Mapping of countries to official, default, and common locales.
- **locale-writing.json**: Script identifiers, direction (LTR/RTL), and native-script requirements.
- **date-time-formats.json**: Localized date patterns, time cycles (12h/24h), week start days, and calendar preferences.
- **country-display-order.json**: Sorting logic for country pickers based on user locale and market context.
- **language-names.json**: Localized names for languages.

### 19.3 Boundaries

- **Belongs in Core**: Locale mapping, localized country/language names, script direction, date/time display metadata, week start, country picker display behavior.
- **Separate Later Package (@ringmasters/global-entry-locales)**: Full translation bundles, full CLDR mirror, ICU message formatting, application copy translations.

## 20. Package Family Roadmap

GED is a multi-package ecosystem. The core package remains a lean behavior layer.

### 20.1 Core & v0.2 Expansion

- **Internationalization (i18n)**: Detailed in Section 19.
- **Timezone Expansion**: Detailed country-wide zone lists and defaults.
- **Basic Measurement Preferences**: Country-level preference for system (Metric/Imperial).

### 20.2 Finance & Commerce Satellite Packages

- **@ringmasters/global-entry-commerce**: Static commerce metadata (currencies, tax labels, cash rounding).
- **@ringmasters/global-entry-fx**: Forex normalization adapters (no live rates).
- **@ringmasters/global-entry-assets**: Metadata for coins, tokens, stocks, and ETFs.
- **@ringmasters/global-entry-finance-i18n**: Market-specific semantic translations for financial jargon.

### 19.3 Other Domain Satellite Packages

- **@ringmasters/global-entry-postal-codes**: Full global postal-code directory.
- **@ringmasters/global-entry-airports**: Airport metadata (IATA, ICAO, scheduled services).
- **@ringmasters/global-entry-hazards**: Natural hazard metadata (WMO/CAP compatible).
- **@ringmasters/global-entry-media**: Media station metadata (TV/Radio stations, markets).
- **@ringmasters/global-entry-identity**: Identity document metadata (Passports, IDs, VISAs).
- **@ringmasters/ged-lifestyle**: Laundry care symbols and clothing size conversions.

## 21. Risk Controls & Non-Goals (Detailed)

- **Source Policy**: Use CLDR-compatible public locale data. Track source per row.
- **No Official Authority**: Never claim to be the official CLDR mirror or an official broadcast/financial authority.
- **Separation of Concerns**: Keep live/time-sensitive data (FX rates, program schedules) out of static JSON packages.
- **No Legal/Financial Advice**: Not for tax, legal, or investment compliance.
- **No Emergency Infrastructure**: Not a replacement for official warning systems.
- **No Fit Guarantees**: Clothing/shoe conversions are approximate.

## 22. Developer User Stories

- Developer can get country names by locale.
- Developer can detect RTL locale.
- Developer can detect official/default locales by country.
- Developer can distinguish locale from country.
- Developer can sort country picker by locale.
- Developer can filter scheduled-service airports.
- Developer can look up phone calling codes and recommended parsers.
- Developer can retrieve human-readable address templates for any country.
- A developer can build a form without `firstName`/`lastName` assumption.
- A developer can build a form without `state`/`province` assumption.
- A developer can hide postal code where not used.
- A developer can render Japan address order correctly.
- A developer can support RTL locales.
- A developer can distinguish country from market.
- A developer can distinguish locale from country.
- A developer can sort country names by user locale.
- A developer can choose strict checkout rules and loose CRM rules.
- A developer can inspect confidence and sources for each rule.
- A developer can look up typhoon as a tropical cyclone hazard.
- A developer can map typhoon to CAP category Met.
- A developer can distinguish severity, urgency, and certainty.
- A developer can list disaster alert systems by country.
- A developer can build disaster-aware UI without live alert authority.
- A developer understands this is metadata, not emergency infrastructure.
- 100% schema validation.
- 0 runtime dependencies.
- Full type safety for TS users.
- Deterministic builds.
- Clear attribution in `ATTRIBUTION.md`.
