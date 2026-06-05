# Repository Skillsets

## Overview
This document defines the skillsets required to maintain and expand the Global Entry Data (GED) repository.

## Defined Skillsets

### Data Modeling (P0)
- **Purpose**: Design canonical schemas for global entry metadata.
- **Knowledge**: ISO2, ISO3, numeric codes, territory types, source metadata, confidence levels, non-US address assumptions.

### Localization & i18n (P0)
- **Purpose**: Prevent US-default form logic.
- **Knowledge**: Locale vs country, language vs country, script direction, localized country names, date/time formats, measurement systems, address order.

### Address Metadata (P0)
- **Purpose**: Model address behavior by country and use case.
- **Knowledge**: Postal code optionality, admin-area labels, large-to-small address order, street-address optionality, field requiredness, checkout vs CRM vs booking strictness.

### Phone Metadata (P1)
- **Purpose**: Expose safe phone country-code metadata without replacing libphonenumber.
- **Knowledge**: Calling codes, shared calling codes, E.164, region metadata, example numbers, validation boundary.

### Source Policy (P0)
- **Purpose**: Avoid illegal or misleading data reuse.
- **Knowledge**: Source attribution, redistribution rights, license compatibility, commercial-source boundaries, official vs compatible wording, provenance per row.

### Schema Validation (P0)
- **Purpose**: Guarantee stable machine-readable data.
- **Knowledge**: JSON Schema, field constraints, required fields, enum design, regex validation, deterministic sorting, invalid-row rejection.

### Build Pipeline (P1)
- **Purpose**: Generate all public files from canonical data.
- **Knowledge**: Canonical JSON, dist generation, JSON/TSV/CSV/TXT/MD/SQL/SQLite outputs, no hand edits in dist.

### TypeScript Package Design (P1)
- **Purpose**: Ship GED as a dependency.
- **Knowledge**: ESM, CJS boundary, tree-shakable exports, typed helpers, package exports, raw data imports, bundle size.

### API Design (P1)
- **Purpose**: Expose simple lookup functions.
- **Knowledge**: getCountry, getCountries, getCallingCode, getPostalRule, getAddressFields, getEntryRules, searchCountries, stable return shapes.

### Testing (P1)
- **Purpose**: Prove data and APIs are reliable.
- **Knowledge**: Unit tests, schema tests, snapshot tests, output existence tests, postal regex tests, line-ending tests, deterministic build tests.

### Supply Chain Security (P0)
- **Purpose**: Protect GED as a public dependency.
- **Knowledge**: GitHub Actions security, npm publishing risk, dependency pinning, secret protection, generated artifact trust, agent commit policy, release gates.

### Documentation (P1)
- **Purpose**: Make GED understandable and usable.
- **Knowledge**: README, SPEC, DATA_SOURCES, ATTRIBUTION, work queue, raw URL docs, API examples, non-goals, limitations.

### Open Source Maintenance (P2)
- **Purpose**: Prepare for public usage and contributions.
- **Knowledge**: Semantic versioning, changelog, issue templates, contribution policy, release process, review policy, data refresh PRs.

### Domain Package Boundary (P2)
- **Purpose**: Keep GED core small.
- **Knowledge**: Core vs airports/hazards/identity/commerce, large dataset separation, licensing boundary, package-family design.

## Agent Roles

### Gemini (Architect)
- Spec writing
- Documentation
- Data modeling
- Source policy
- Work queue planning

### Codex (Implementation)
- Package setup
- Build scripts
- Schema validation
- API implementation
- Tests
- CI workflows

### Manual (Governance)
- License decisions
- Source approval
- NPM publishing
- Branch protection
- Release approval
