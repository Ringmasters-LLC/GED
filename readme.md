# Global Entry Data (GED)

Core form-entry metadata for global products. Build localized checkout, CRM, and onboarding without US-centric assumptions.

## What is GED?

GED is a synthesis layer that normalizes global reference patterns into stable, typed, developer-facing entry models. It helps build global forms that respect local variation in addresses, names, phones, and postal rules.

## Core Philosophy

- **Locale is not country.**
- **Country is not market.**
- **Country is not currency.**
- **Country is not language.**
- **Country is not phone numbering region.**
- **Address is not street/city/state/ZIP globally.**
- **Name is not first/middle/last globally.**
- **Postal code is not globally required.**
- **State/province is not globally required.**

## Install

```bash
npm install @ringmasters/global-entry-data
# or
pnpm add @ringmasters/global-entry-data
```

## Quick Usage

```ts
import {
  getCountry,
  getCountries,
  getPostalRule,
  getAddressFormat,
  getTimezones,
} from '@ringmasters/global-entry-data';

// Get metadata for a country
const japan = getCountry('JP');

// Get postal-code behavior (regex, requirements)
const postalRule = getPostalRule('HK'); // Hong Kong: postal code hidden/optional

// Get address field ordering and labels
const addressFormat = getAddressFormat('JP'); // Large-to-small order

// Get IANA timezone IDs for a country
const zones = getTimezones('US');
```

## Included Data

- **Countries**: ISO2, ISO3, numeric codes, territory types.
- **Phone**: E.164 calling codes.
- **Postal**: Rules, regex, required-for-shipping vs consumer flags.
- **Address**: Field ordering, requirement rules, labels.
- **Timezone**: Default IANA zones and country-wide lists.
- **Form Behavior**: UI/UX rules (name support, address lines).
- **Metadata**: Every row includes `sources`, `updatedAt`, and `confidence`.

## Output Formats

Available in `dist/` for various environments:

- **JSON**: Primary application format.
- **TSV / CSV**: Spreadsheet and script imports.
- **TXT**: Line-based reference lists.
- **MD**: Human/Agent readable context.
- **SQL / SQLite**: Database seeding and offline query.
- **TypeScript**: Full type definitions.

## Public Raw Files

Fetch data directly via GitHub or jsDelivr:

- **GitHub**: `https://raw.githubusercontent.com/Ringmasters-LLC/GED/main/dist/json/countries.json`
- **jsDelivr**: `https://cdn.jsdelivr.net/npm/@ringmasters/global-entry-data/dist/json/countries.json`

JSON and TSV are preferred for automated scripts. Markdown files are intended for human or AI-agent context.

## Internationalization (i18n)

i18n is core architecture in GED. We maintain strict separation between country, locale, language, and script.

- **Localized Names**: Fetch country and language names in the user's preferred locale.
- **Script & Direction**: Detect RTL (Right-to-Left) layouts and script requirements (e.g., Arabic, Hanzi, Devanagari).
- **Date & Time**: Access localized patterns, time cycles (12h/24h), and week-start metadata.
- **Display Order**: Sort country pickers based on locale-specific sorting rules.

## Package Boundaries

- **@ringmasters/global-entry-data**: Core form-entry & i18n metadata (Current).
- **@ringmasters/global-entry-commerce**: Static commerce & tax metadata (Planned).
- **@ringmasters/global-entry-fx**: Forex normalization adapters (Planned).
- **@ringmasters/global-entry-assets**: Crypto, tokens, and stock metadata (Planned).
- **@ringmasters/global-entry-media**: TV and radio station metadata (Planned).
- **@ringmasters/global-entry-airports**: Airport metadata (Planned).
- **@ringmasters/global-entry-hazards**: Natural hazard metadata (Planned).
- **@ringmasters/global-entry-identity**: Identity document metadata (Planned).
- **@ringmasters/global-entry-lifestyle**: Laundry care and clothing sizes (Planned).

## Data Refresh Status

...

- **Status**: MVP certified.
- **Validation**: Strict schema and deterministic build validation are implemented.
- **Refresh**: Monthly refresh workflow (`data-refresh.yml`) is currently a placeholder. Live automated ingestion is planned but not production-ready.

## Source Policy

- **Provenance**: Every record tracks its origin in a `sources` array.
- **Normalization**: Data is compatible with and derived from ISO 3166, CLDR, libphonenumber, and GeoNames.
- **Authority**: GED does not claim official authority. It is a synthesis of public-compatible sources.
- **License**: Code is MIT. Data license is source-dependent (see `ATTRIBUTION.md`).

## Non-Goals

- No address verification or shipping-grade validation.
- No full postal-code directory (stored in separate package).
- No geocoding or coordinate lookup.
- No tax, legal, or sanctions compliance.
- No identity verification or official document validation.
- No official IATA airport data.
- No live emergency hazard alerts.
- No clothing fit guarantees or laundry-care liability.
