# Global Entry Data Spec

## 1. Purpose
Normalize global reference data for entry forms. Provide stable, typed, local-first datasets. Support checkout, CRMs, and SaaS onboarding.

## 2. Non-Goals
No full global postal-code database in core. No geocoding. No address verification. No shipping-grade validation. No tax/legal compliance. No runtime network dependencies. No paid APIs.

## 3. Target Consumers
Web forms. Booking systems. WordPress plugins. Mobile apps. Admin tools. Offline-first applications.

## 4. Data Sets
- **Country Lists**: ISO 3166-1 alpha-2, names.
- **Phone Codes**: E.164 calling codes.
- **Postal Rules**: Format strings, regex validation.
- **Currencies**: ISO 4217 codes, symbols, names.
- **Languages**: ISO 639-1 codes, names.
- **Timezone Defaults**: Primary IANA zone per country.
- **Address Formats**: Field ordering, labels, requirement rules.

## 5. Package Outputs
- NPM package (@ringmasters/global-entry-data).
- JSON files.
- CSV exports.
- SQLite database.
- SQL scripts (PostgreSQL/MySQL compatible).
- TypeScript definitions.
- JSON Schemas.

## 6. Public API
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
```

## 7. Schema Rules
- Every country requires `iso2`.
- `iso2` must be unique.
- Calling codes must map to at least one country.
- All postal regex must compile.
- Postal examples must pass their regex.
- All JSON must validate against local schemas.
- Generated files must have deterministic row ordering.
- Every record requires source metadata and `updatedAt`.

## 8. Source and Attribution Policy
- ISO 3166-compatible country codes.
- Google libphonenumber-compatible phone metadata.
- CLDR-compatible locale/territory data.
- GeoNames-compatible postal data.
- Manually reviewed rules for gaps.
- Use: "compatible with", "derived from", "normalized against".
- Avoid: "official", "guaranteed", "authoritative".

## 9. Licensing
- **Code**: MIT.
- **Data**: Source-dependent. Attribution required per source. No full CC0 claim.

## 10. Versioning
- **MAJOR**: Breaking schema or API changes.
- **MINOR**: New datasets or new fields.
- **PATCH**: Data corrections or monthly refreshes.

## 11. Repository Structure
```text
global-entry-data/
  packages/
    core/
    postal-codes/
  schemas/
  scripts/
  tests/
  .github/workflows/
```

## 12. Build Pipeline
1. Ingest raw data from sources.
2. Normalize against schemas.
3. Validate data integrity.
4. Generate JSON/CSV/SQL/SQLite outputs.
5. Build TypeScript distribution.
6. Verify deterministic output.

## 13. CI Requirements
- Lint code and schemas.
- Run unit tests for API and data validation.
- Verify every JSON file against its schema.
- Fail on non-deterministic generation.

## 14. Data Refresh Policy
- Monthly automated ingest.
- Automated validation.
- Manual review for major discrepancies.
- Patch release for every refresh.

## 15. MVP Release Scope
- `countries.json`
- `phone-codes.json`
- `postal-rules.json`
- `currencies.json`
- `languages.json`
- `timezone-defaults.json`
- `address-formats.json`
- TypeScript helpers and schemas.
- Basic tests and documentation.

## 16. Later Roadmap
- `@ringmasters/global-entry-postal-codes` (large dataset).
- Localized country names.
- Extended timezone metadata.
- Administrative subdivision lists (states/provinces).

## 17. Risk Controls
- No runtime network calls.
- Small core package size.
- Hardcoded provenance in data.
- Version-locked data sources.

## 18. Acceptance Criteria
- 100% schema validation.
- 0 runtime dependencies.
- Full type safety for TS users.
- Deterministic builds.
- Clear attribution in `ATTRIBUTION.md`.
