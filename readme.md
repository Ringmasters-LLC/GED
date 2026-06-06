# Global Entry Data

## Purpose

Global form entry is not one universal model.

- territory status
- phone numbering
- postal-code behavior
- address order
- administrative areas
- local scripts
- currency defaults
- language defaults
- commerce availability
- validation strictness

Most products treat localization as translation which is not enough.

Real localization is structural.

---

## What This Package Provides

Core datasets:

- countries
- phone country codes
- postal-code rules
- currencies
- languages
- timezone defaults
- address formats
- territory types
- form behavior rules
- entry profiles

Core outputs:

- JSON
- TSV
- CSV
- TXT
- Markdown
- SQL
- SQLite
- TypeScript helpers
- ESM package
- CJS package if supported

---

## What This Package Does Not Do

This package does not provide:

- legal address verification
- shipping-grade address validation
- tax compliance
- sanctions screening
- geocoding
- complete postal-code directories
- paid address intelligence
- official sovereignty positions
- guaranteed telecom assignment validation

Use an official provider for regulated shipping, tax, banking, legal, or government workflows.

---

## Design Doctrine

No US-default worldview.

No fake universal address form.

No globally forced postal code.

No globally forced state or province field.

No forced first-name and last-name assumption.

No one-country-one-phone-code assumption.

No hidden confidence.

No unsourced rows.

No manual edits inside generated output.

---

## Example Problem

Bad global form behavior:

```text
Country: Hong Kong
Postal code: required
State: required
```

Result:

```text
User enters fake data.
Validation passes.
Data quality gets worse.
```

Correct behavior:

```text
Country: Hong Kong
Postal code: optional or hidden
State/province: not required
Address lines: flexible
```

---

## Example Usage

Install:

```bash
pnpm add @ringmasters/global-entry-data
```

Use:

```ts
import {
  getCountry,
  getCountries,
  getCallingCode,
  getPostalRule,
  validatePostalCode,
  getAddressFields,
  getEntryRules,
} from '@ringmasters/global-entry-data';

const japan = getCountry('JP');

const callingCode = getCallingCode('JP');

const postal = validatePostalCode('JP', '100-0001');

const addressFields = getAddressFields('JP');

const bookingRules = getEntryRules('JP', {
  profile: 'booking',
});
```

Example result:

```json
{
  "valid": true,
  "country": "JP",
  "normalized": "1000001",
  "formatted": "100-0001"
}
```

---

## Public API

Initial API:

```ts
getCountries();
getCountry(iso2);
searchCountries(query);

getCallingCode(iso2);
getCountriesByCallingCode(code);

getPostalRule(iso2);
validatePostalCode(iso2, value);

getCurrency(iso2);
getLanguages(iso2);
getTimezoneDefaults(iso2);

getAddressFormat(iso2);
getAddressFields(iso2);

getEntryRules(iso2, profile);
getTerritoryType(iso2);
getFormBehavior(iso2);
getPostalCodeBehavior(iso2, profile);
```

---

## Entry Profiles

Validation depends on use case.

A checkout form should be stricter than a CRM form.

A booking form may not need a full address.

Supported profiles:

```text
booking
checkout
crm
registration
shipping
wordpress
```

Example:

```ts
getEntryRules('HK', {
  profile: 'booking',
});
```

Example behavior:

```json
{
  "country": "HK",
  "profile": "booking",
  "postalCode": {
    "behavior": "hidden",
    "required": false
  },
  "administrativeArea": {
    "required": false
  },
  "address": {
    "strictness": "loose"
  }
}
```

---

## Data Model Example

```json
{
  "iso2": "JP",
  "iso3": "JPN",
  "numeric": "392",
  "name": "Japan",
  "territoryType": "country",
  "callingCodes": ["81"],
  "currency": "JPY",
  "languages": ["ja"],
  "postalCode": {
    "used": true,
    "requiredForConsumerForms": true,
    "requiredForShipping": true,
    "format": "NNN-NNNN",
    "regex": "^\\d{3}-?\\d{4}$",
    "example": "100-0001",
    "confidence": "high"
  },
  "address": {
    "order": "large_to_small",
    "requiresAdministrativeArea": true,
    "administrativeAreaLabel": "Prefecture",
    "localityLabel": "City/Ward/Town",
    "postalCodePosition": "before_locality",
    "addressLinesRecommended": 2,
    "buildingNameCommon": true
  },
  "name": {
    "supportsSingleName": false,
    "requiresFamilyName": false,
    "latinOnlyRecommended": false
  },
  "sources": [
    "iso3166-compatible",
    "cldr-compatible",
    "libphonenumber-compatible",
    "manual-review"
  ],
  "updatedAt": "2026-06-05"
}
```

---

## Plain Web Files

This package publishes simple files that can be fetched without npm.

Examples:

```text
https://raw.githubusercontent.com/ringmasters/global-entry-data/main/dist/json/countries.json
https://raw.githubusercontent.com/ringmasters/global-entry-data/main/dist/tsv/countries.tsv
https://raw.githubusercontent.com/ringmasters/global-entry-data/main/dist/txt/countries.txt
https://raw.githubusercontent.com/ringmasters/global-entry-data/main/dist/md/countries.md
```

CDN access:

```text
https://cdn.jsdelivr.net/npm/@ringmasters/global-entry-data/dist/json/countries.json
https://cdn.jsdelivr.net/npm/@ringmasters/global-entry-data/dist/tsv/countries.tsv
https://cdn.jsdelivr.net/npm/@ringmasters/global-entry-data/dist/txt/countries.txt
https://cdn.jsdelivr.net/npm/@ringmasters/global-entry-data/dist/md/countries.md
```

---

## Output Formats

### JSON

Best for applications.

```text
dist/json/countries.json
dist/json/phone-codes.json
dist/json/postal-rules.json
dist/json/address-formats.json
dist/json/form-behavior.json
```

### TSV

Best for scripts, agents, no-code tools, and simple imports.

```text
dist/tsv/countries.tsv
dist/tsv/phone-codes.tsv
dist/tsv/postal-rules.tsv
dist/tsv/address-formats.tsv
```

### TXT

Best for human-readable line-based references.

```text
dist/txt/countries.txt
dist/txt/phone-codes.txt
dist/txt/postal-rules.txt
```

### Markdown

Best for GitHub browsing and AI-agent context.

```text
dist/md/countries.md
dist/md/phone-codes.md
dist/md/postal-rules.md
dist/md/address-formats.md
dist/md/form-behavior.md
```

### SQL and SQLite

Best for offline databases and backend imports.

```text
dist/sql/countries.sql
dist/sqlite/global-entry-data.sqlite
```

---

## Canonical Source Rule

Canonical source files live in:

```text
data/canonical/
```

Generated files live in:

```text
dist/
```

Never edit generated output by hand.

```text
data/canonical/*.json
  ↓
dist/json/*.json
dist/tsv/*.tsv
dist/csv/*.csv
dist/txt/*.txt
dist/md/*.md
dist/sql/*.sql
dist/sqlite/*.sqlite
```

---

## Repository Structure

```text
global-entry-data/
  README.md
  SPEC.md
  LICENSE
  ATTRIBUTION.md
  DATA_SOURCES.md
  CHANGELOG.md
  package.json
  pnpm-lock.yaml

  docs/
    philosophy.md
    anti_patterns.md
    form_failures.md
    work_queue.md

  data/
    canonical/
      countries.json
      phone-codes.json
      postal-rules.json
      currencies.json
      languages.json
      timezone-defaults.json
      address-formats.json
      territory-types.json
      form-behavior.json
      entry-profiles.json

  packages/
    core/
      src/
      data/
      dist/
      package.json

    postal-codes/
      src/
      data/
      dist/
      package.json

  schemas/
    country.schema.json
    phone.schema.json
    postal-rule.schema.json
    currency.schema.json
    language.schema.json
    timezone.schema.json
    address-format.schema.json
    form-behavior.schema.json
    entry-profile.schema.json

  scripts/
    build.ts
    validate.ts
    generate.ts
    export-csv.ts
    export-tsv.ts
    export-txt.ts
    export-md.ts
    export-sql.ts
    export-sqlite.ts

  tests/
    countries.test.ts
    phone.test.ts
    postal.test.ts
    schema.test.ts
    outputs.test.ts

  .github/
    workflows/
      ci.yml
      release.yml
      data-refresh.yml
```

---

## Data Source Policy

This project uses public-compatible reference data.

Source categories:

- ISO 3166-compatible country code data
- libphonenumber-compatible phone metadata
- CLDR-compatible locale, territory, language, and currency data
- public-compatible postal-code rule references
- manually reviewed rules where no clean source exists
- optional GeoNames-compatible postal directory data in later packages

Do not overclaim authority.

Use wording like:

```text
compatible with
derived from public-compatible sources
normalized against
validated against
```

Avoid wording like:

```text
official complete database
guaranteed global validation
legally authoritative
shipping-grade verification
```

---

## Attribution

Every dataset must track source metadata.

Every row must include provenance.

Every source with attribution requirements must be listed in:

```text
ATTRIBUTION.md
DATA_SOURCES.md
```

Example:

```json
{
  "sources": ["iso3166-compatible", "cldr-compatible", "libphonenumber-compatible"],
  "updatedAt": "2026-06-05",
  "confidence": "high"
}
```

---

## Licensing

Code license:

```text
MIT
```

Data license:

```text
source-dependent
```

Some source data may require attribution.

Do not claim the entire dataset is CC0 if derived data requires attribution.

---

## Versioning

Semantic versioning:

```text
MAJOR = breaking schema or API change
MINOR = new dataset or new field
PATCH = data correction or data refresh
```

Examples:

```text
1.2.4 = schema stable, data refreshed
1.3.0 = added address-format table
2.0.0 = renamed schema fields
```

---

## Validation Rules

Required checks:

- every country has `iso2`
- every `iso2` is unique
- every calling code maps to at least one country or territory
- every postal regex compiles
- every postal example passes its regex
- every JSON file validates against schema
- every row has source metadata
- every row has confidence metadata where applicable
- generated files are deterministic
- generated files use UTF-8
- generated files use LF line endings
- no manual edits inside `dist/`

---

## CI

Required commands:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm build
pnpm validate
```

CI must verify:

- package builds
- tests pass
- schemas compile
- generated outputs exist
- generated outputs are deterministic
- raw file paths are documented
- package exports work
- npm publish dry run works

---

## Data Refresh

Refresh cadence:

```text
monthly
```

Refresh behavior:

```text
open pull request
do not auto-publish to main
show source changes
show generated diff
run validation
require review before merge
```

---

## Later Roadmap

Deferred:

- full postal-code directory package
- `@ringmasters/global-entry-postal-codes`
- compressed postal-code release assets
- localized country names
- subdivisions
- browser size budget
- WordPress example
- no-code import examples
- public demo page

---

## Acceptance Criteria

A developer can:

- install the npm package
- import typed helpers
- fetch raw JSON from GitHub
- fetch TSV without npm
- open Markdown tables on GitHub
- detect that Hong Kong should not force postal code
- detect that Japan uses large-to-small address order
- detect that `+1` maps to multiple territories
- build a booking form without assuming US address fields
- build a checkout form with stricter rules than a CRM form
- understand source limitations
- inspect attribution
- validate all data locally
