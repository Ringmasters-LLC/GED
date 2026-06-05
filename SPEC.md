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

## 3. Non-Goals
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
  - `territoryType`, `parentTerritory`, `commerceSelectable`
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
- Localized country names.
- Extended timezone metadata.
- Administrative subdivision lists (states/provinces).

## 19. Risk Controls
- No runtime network calls.
- Small core package size.
- Hardcoded provenance in data.
- Version-locked data sources.

## 20. Acceptance Criteria
- 100% schema validation.
- 0 runtime dependencies.
- Full type safety for TS users.
- Deterministic builds.
- Clear attribution in `ATTRIBUTION.md`.
- User can open `countries.md` on GitHub and inspect the table.
- User can copy a raw GitHub URL and fetch `countries.md`.
- AI agent can read `postal-rules.md` as context.
- Scripts prefer TSV or JSON, not MD.
- Developer can detect that Hong Kong should not force postal code.
- Developer can detect that Japan uses large-to-small address order.
- Developer can detect that +1 maps to multiple territories.
- Developer can build a booking form without assuming US address fields.
- Developer can build a checkout form with stricter rules than a CRM form.
- User can open Markdown docs and understand why global forms fail.
