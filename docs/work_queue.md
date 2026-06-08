# Work Queue

## Status Legend

- **TODO**: Task defined, not started.
- **IN_PROGRESS**: Task active.
- **BLOCKED**: Task requires external resolution.
- **DONE**: Task complete, verified.
- **DEFERRED**: Task moved to later phase.
- **PARTIAL**: Implementation exists but incomplete or placeholder.

## Priority Model

P0 blocks all work.
P1 defines canonical truth.
P2 generates public files.
P3 exposes developer APIs.
P4 proves data correctness.
P5 explains usage and limits.
P6 ships safely.
P7 is deferred roadmap.

## Execution Queue

| ID                  | Phase | Priority | Difficulty |  Risk  |  Status  | Owner  | Task                                   | Acceptance                     |
| :------------------ | :---: | :------: | :--------: | :----: | :------: | :----: | :------------------------------------- | :----------------------------- |
| GED-P0-001          |  P0   |    P0    |     S      |  LOW   |   DONE   | Gemini | create repo skeleton                   | folders exist                  |
| GED-P1-001          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical countries.json               | unique iso2/iso3/numeric       |
| GED-P1-002          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical phone-codes.json             | E.164 mapping                  |
| GED-P1-003          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical postal-rules.json            | regex and req flags            |
| GED-P1-004          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical currencies.json              | ISO 4217                       |
| GED-P1-005          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical languages.json               | ISO 639-1                      |
| GED-P1-006          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical timezone-defaults.json       | IANA zones                     |
| GED-P1-007          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical address-formats.json         | field order/labels             |
| GED-P1-010          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical form-behavior.json           | name support, lines            |
| GED-P1-011          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical territory-types.json         | sovereign/dependent            |
| GED-P1-012          |  P1   |    P1    |     M      | MEDIUM |   DONE   | Gemini | canonical entry-profiles.json          | crm/checkout rules             |
| GED-P6-001          |  P6   |    P6    |     M      | MEDIUM |   DONE   | Codex  | GitHub Actions CI                      | workflows exist                |
| GED-P6-007          |  P6   |    P6    |     L      |  HIGH  | PARTIAL  | Codex  | data-refresh workflow                  | automated ingestion            |
| GED-P1-I18N-001     |  P1   |    P1    |     M      | MEDIUM |   TODO   | Gemini | canonical localized-country-names.json | JP as 日本 for ja              |
| GED-P1-I18N-002     |  P1   |    P1    |     M      | MEDIUM |   TODO   | Gemini | canonical country-locales.json         | multiple locales for CH/CA     |
| GED-P1-I18N-003     |  P1   |    P1    |     M      | MEDIUM |   TODO   | Gemini | canonical locale-writing.json          | RTL for ar, script reqs        |
| GED-P1-I18N-004     |  P1   |    P1    |     M      | MEDIUM |   TODO   | Gemini | canonical date-time-formats.json       | cycles, week start             |
| GED-P2-I18N-001     |  P2   |    P2    |     M      | MEDIUM |   TODO   | Gemini | canonical country-display-order.json   | picker sorting                 |
| GED-P2-I18N-002     |  P2   |    P2    |     M      | MEDIUM |   TODO   | Gemini | canonical language-names.json          | localized lang names           |
| GED-P4-I18N-001     |  P4   |    P4    |     M      | MEDIUM |   TODO   | Gemini | i18n Zod contracts                     | validation for new sets        |
| GED-P3-I18N-001     |  P3   |    P3    |     M      | MEDIUM |   TODO   | Codex  | implement i18n API helpers             | getLocalizedCountryName etc    |
| GED-P4-I18N-002     |  P4   |    P4    |     M      | MEDIUM |   TODO   | Codex  | i18n tests for JP/US/CA/CH/BE/AE/IL/HK | verify RTL/locales/names       |
| GED-P7-COMM-001     |  P7   |    P7    |     L      | MEDIUM | DEFERRED | Gemini | @ringmasters/global-entry-commerce     | cash-rounding, tax-labels      |
| GED-P7-FX-001       |  P7   |    P7    |     L      |  HIGH  | DEFERRED | Gemini | @ringmasters/global-entry-fx           | conversion-rules, fresh-policy |
| GED-P7-ASSETS-001   |  P7   |    P7    |     L      |  HIGH  | DEFERRED | Gemini | @ringmasters/global-entry-assets       | crypto-assets, ticker-rules    |
| GED-P7-FIN-I18N-001 |  P7   |    P7    |     L      | MEDIUM | DEFERRED | Gemini | @ringmasters/global-entry-finance-i18n | jargon, market-terms           |
| GED-P7-MEDIA-001    |  P7   |    P7    |     XL     |  HIGH  | DEFERRED | Gemini | @ringmasters/global-entry-media        | stations, markets, networks    |
| GED-P7-MEDIA-002    |  P7   |    P7    |     L      |  HIGH  | DEFERRED | Gemini | media datasets (tv/radio/bands)        | all 10 datasets defined        |
| GED-P7-MEDIA-003    |  P7   |    P7    |     M      |  HIGH  | DEFERRED | Gemini | station fields & apis                  | call signs, market lookup      |
| GED-P7-MEDIA-004    |  P7   |    P7    |     XL     |  HIGH  | DEFERRED | Gemini | station source adapters                | source-attributed records      |
| GED-P5-001          |  P5   |    P5    |     S      |  LOW   |   DONE   | Gemini | README update                          | i18n & roadmap sections        |

## Agent Commit Policy

Agents may commit their own completed task work. Keep one task per commit.
