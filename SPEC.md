# Global Entry Data Spec

## 1. Purpose
Normalize global reference data for entry forms. Provide stable, typed, local-first datasets. Support checkout, CRMs, and SaaS onboarding.

## 2. Global Entry Philosophy
Core thesis: Most global forms are domestic assumptions with international patches. This repo starts from global variance first.
- No US-default address model.
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
  - `postalCode.used`, `postalCode.requiredForConsumerForms`, `postalCode.requiredForShipping`
  - `address.order` (e.g., "L-S", "S-L"), `address.requiresAdministrativeArea`, `address.postalCodePosition`, `address.addressLinesRecommended`
  - `name.supportsSingleName`, `name.requiresFamilyName`
  - `confidence` (0.0 - 1.0), `sources` (array)

## 9. Markdown Distribution Rules
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

## 10. Source and Attribution Policy
- ISO 3166-compatible country codes.
- Google libphonenumber-compatible phone metadata.
- CLDR-compatible locale/territory data.
- GeoNames-compatible postal data.
- Manually reviewed rules for gaps.
- Use: "compatible with", "derived from", "normalized against".
- Avoid: "official", "guaranteed", "authoritative".

## 11. Licensing
- **Code**: MIT.
- **Data**: Source-dependent. Attribution required per source. No full CC0 claim.

## 12. Versioning
- **MAJOR**: Breaking schema or API changes.
- **MINOR**: New datasets or new fields.
- **PATCH**: Data corrections or monthly refreshes.

## 13. Repository Structure
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

## 14. Build Pipeline
1. Ingest raw data from sources to `data/canonical/*.json`.
2. Normalize against schemas.
3. Validate data integrity.
4. Generate outputs.
5. Build TypeScript distribution (ESM/CJS).
6. Verify deterministic output.

## 15. CI Requirements
- Lint code and schemas.
- Run unit tests for API and data validation.
- Verify every JSON file against its schema.
- Fail on non-deterministic generation.

## 16. Data Refresh Policy
- Monthly automated ingest.
- Automated validation.
- Manual review for major discrepancies.
- Patch release for every refresh.

## 17. MVP Release Scope
- Canonical JSON datasets (`countries.json`, `phone-codes.json`, etc.).
- `address-formats.json`, `form-behavior.json`, `territory-types.json`, `entry-profiles.json`.
- Generated outputs: JSON, TSV, CSV, TXT, MD, SQL, SQLite.
- `countries.md`, `phone-codes.md`, `postal-rules.md`, `currencies.md`, `languages.md`, `timezones.md`, `address-formats.md`, `form-behavior.md`, `anti-patterns.md`.
- TypeScript helpers and schemas.
- Basic tests and documentation.

## 18. Later Roadmap
- `@ringmasters/global-entry-postal-codes` (large dataset).
- `@ringmasters/global-entry-hazards` (separate package).
  - **Datasets**: `hazard-types.json`, `hazards.json`, `alert-categories.json`, `cap-fields.json`, `severity-levels.json`, `urgency-levels.json`, `certainty-levels.json`, `response-types.json`, `weather-events.json`, `tropical-cyclone-events.json`, `earthquake-events.json`, `tsunami-events.json`, `volcano-events.json`, `flood-events.json`, `wildfire-events.json`, `country-alert-systems.json`.
  - **Fields**: `id`, `label`, `hazardType`, `family`, `aliases`, `regionalTerms`, `cap.category`, `cap.defaultSeverity`, `cap.defaultUrgency`, `cap.defaultCertainty`, `responseTypes`, `countrySpecificCodes`, `sources`, `updatedAt`, `confidence`, `notes`.
  - **Standards**: UNDRR/ISC taxonomy, WMO/OASIS CAP-compatible.
  - **API**: `getHazardTypes()`, `getHazard(id)`, `searchHazards(query)`, `getHazardsByType(type)`, `getHazardsByCountry(iso2)`, `getCapCategories()`, `getCapSeverityLevels()`, `getCapUrgencyLevels()`, `getCapCertaintyLevels()`, `getCapResponseTypes()`, `mapEventToHazard(eventName, options)`, `getCountryAlertSystems(iso2)`, `getWeatherEvents()`, `getTropicalCycloneTerms(region)`.
  - **Positioning**: Open hazard and alert metadata for disaster-aware localization. Metadata only, not emergency infrastructure.
- Localized country names.
- Extended timezone metadata.
- Administrative subdivision lists (states/provinces).
- `@ringmasters/global-entry-identity` (identity document metadata).
- `@ringmasters/global-entry-commerce` (currency, tax-label, payment-method metadata).
- `@ringmasters/global-entry-locales` (localized names, scripts, date/time, units).

## 19. Risk Controls
- No runtime network calls.
- Small core package size.
- Hardcoded provenance in data.
- Version-locked data sources.

- Developer can list scheduled-service airports.
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

## 21. Non-Goals (Detailed)
- No live disaster alerts or emergency dispatch.
- No official warning authority or replacement for national services.
- No legal safety guarantee or compliance claim.
- No tax calculation or payment processing.
- No identity or official address verification.
- No sovereignty adjudication.
- No universal global form.

hould not force postal code.
- Developer can detect that Japan uses large-to-small address order.
- Developer can detect that +1 maps to multiple territories.
- Developer can build a booking form without assuming US address fields.
- Developer can build a checkout form with stricter rules than a CRM form.
- User can open Markdown docs and understand why global forms fail.
ead `postal-rules.md` as context.
- Scripts prefer TSV or JSON, not MD.
- Developer can detect that Hong Kong should not force postal code.
- Developer can detect that Japan uses large-to-small address order.
- Developer can detect that +1 maps to multiple territories.
- Developer can build a booking form without assuming US address fields.
- Developer can build a checkout form with stricter rules than a CRM form.
- User can open Markdown docs and understand why global forms fail.
