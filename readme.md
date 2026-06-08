# Global Entry Data (GED)

Core form-entry metadata for global products. Build localized checkout, CRM, and onboarding without US-centric assumptions.

## What is GED?

GED is a behavior metadata layer that normalizes global reference patterns into stable, typed, developer-facing entry models. It helps build global forms that respect local variation in addresses, names, phones, and postal rules.

## What Makes GED Different?

GED starts from global variance first, decoupling from domestic assumptions.

- **Locale is not country.**
- **Country is not market.**
- **Country is not currency.**
- **Country is not language.**
- **Country is not phone numbering region.**
- **Address is not street/city/state/ZIP globally.**
- **Name is not first/middle/last globally.**
- **Postal code is not globally required.**
- **Validation strictness depends on use case.**
- **Confidence and provenance are first-class fields.**

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
  getPostalRule,
  getAddressFormat,
  getTimezones,
} from '@ringmasters/global-entry-data';

// Get metadata for a country
const japan = getCountry('JP');

// Get postal-code behavior
const postalRule = getPostalRule('HK'); // Hong Kong: hidden/optional

// Get address field ordering
const addressFormat = getAddressFormat('JP'); // Large-to-small

// Get IANA timezone IDs
const zones = getTimezones('US');
```

## Internationalization (i18n)

i18n is core architecture in GED. We maintain strict separation between country, locale, language, and script.

- **Localized Names**: Fetch country and language names in the user's preferred locale.
- **Script & Direction**: Detect RTL (Right-to-Left) layouts and script requirements.
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

## Source Policy

- **Provenance**: Every record tracks its origin in a `sources` array.
- **Normalization**: Compatible with ISO 3166, CLDR, libphonenumber, and GeoNames.
- **Authority**: GED does not claim official authority. It is a synthesis of public-compatible sources.

## Non-Goals

- No address verification or shipping-grade validation.
- No geocoding or coordinate lookup.
- No live emergency hazard alerts or broadcast schedules.
- No investment advice or guaranteed live FX rates.
