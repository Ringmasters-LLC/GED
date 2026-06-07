# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-05

### Added

- Initial repository specification and philosophy.
- Canonical JSON datasets for countries, phone codes, postal rules, currencies, and more.
- Zod contracts for all 21 canonical datasets.
- Automatic distribution generation for JSON, TSV, CSV, TXT, MD, SQL, and SQLite.
- Core TypeScript API with helpers for country lookup, phone metadata, and address formats.
- Comprehensive schema validation and data integrity checks.
- GitHub Actions CI/CD workflows for validation, testing, and release.
- Agent Commit Policy and repository foundational mandates.
- Expanded sample data coverage for major global markets.

### Fixed

- Improved administrative area labels and field ordering for non-US markets.
- Corrected various ISO3 and numeric code entries.
- Resolved build pipeline consistency issues.
