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
P7 is deferred.

Difficulty estimates measure implementation complexity.
Risk estimates measure maintenance, licensing, and supply-chain exposure.

## Dependency Rules

- Do not build outputs before canonical data exists.
- Do not build APIs before schemas exist.
- Do not publish before validation passes.
- Do not import large datasets into core.
- Do not claim official authority without licensed sources.
- Do not merge generated files without deterministic build proof.

## Audit Notes (2026-06-05)
- **Data Refresh (GED-P6-007)**: Implementation is currently a placeholder (echo logic). Requires real ingestion logic.
- **CI Risk**: `better-sqlite3` is a native dependency. CI environment must support build tools or use prebuilts.

## Execution Queue

| ID | Phase | Priority | Difficulty | Risk | Status | Owner | Task | Acceptance |
|---|---:|---|---|---|---|---|---|---|
| GED-P0-001 | P0 | P0 | S | LOW | DONE | Gemini | create repo skeleton | folders exist, matches spec |
| GED-P0-002 | P0 | P0 | S | MEDIUM | DONE | Gemini | create package.json | file exists, valid JSON |
| GED-P0-003 | P0 | P0 | S | MEDIUM | DONE | Gemini | add pnpm workspace | file exists, pnpm install passes |
| GED-P0-004 | P0 | P0 | S | HIGH | DONE | Manual | create MIT LICENSE | file exists, license confirmed |
| GED-P0-005 | P0 | P0 | S | HIGH | DONE | Gemini | create ATTRIBUTION.md | file exists, formatted |
| GED-P0-006 | P0 | P0 | S | HIGH | DONE | Manual | create DATA_SOURCES.md | file exists, sources confirmed |
| GED-P0-007 | P0 | P0 | S | LOW | DONE | Gemini | create SPEC.md | file exists, reflects goals |
| GED-P0-009 | P0 | P0 | XS | LOW | DONE | Gemini | create docs/work_queue.md | file exists, matches spec |
| GED-P0-008 | P0 | P0 | XS | LOW | DONE | Gemini | create CHANGELOG.md | file exists, init entry |
| GED-P0-010 | P0 | P0 | S | LOW | DONE | Gemini | create docs/philosophy.md | file exists, caveman mode |
| GED-P0-011 | P0 | P0 | S | LOW | DONE | Gemini | create docs/anti_patterns.md | file exists, caveman mode |
| GED-P0-012 | P0 | P0 | S | LOW | DONE | Gemini | create docs/form_failures.md | file exists, caveman mode |
| GED-P0-013 | P0 | P0 | XS | LOW | DONE | Gemini | create docs/skillsets.md | file exists, defines agent roles |
| GED-P0-014 | P0 | P0 | XS | LOW | DONE | Gemini | create GEMINI.md | foundational mandates established |
| GED-P1-001 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical countries.json | includes territoryType, parentTerritory |
| GED-P1-013 | P1 | P1 | XS | MEDIUM | DONE | Gemini | verify every country record has iso2 | unique alpha-2 code |
| GED-P1-014 | P1 | P1 | XS | MEDIUM | DONE | Gemini | verify every country record has iso3 | unique alpha-3 code |
| GED-P1-015 | P1 | P1 | XS | MEDIUM | DONE | Gemini | verify every country record has numeric code | unique numeric string |
| GED-P1-002 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical phone-codes.json | mapping for all territories |
| GED-P1-011 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical territory-types.json | sovereign vs dependent vs admin |
| GED-P1-012 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical entry-profiles.json | CRM vs Checkout rules |
| GED-P1-003 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical postal-rules.json | includes requiredForShipping, requiredForConsumer |
| GED-P1-004 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical currencies.json | file exists, rows sorted |
| GED-P1-005 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical languages.json | file exists, rows sorted |
| GED-P1-006 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical timezone-defaults.json | file exists, rows sorted |
| GED-P1-007 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical address-formats.json | includes order, postalCodePosition |
| GED-P1-010 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical form-behavior.json | name support, address lines |
| GED-P1-016 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical name-formats.json | cultural ordering, single name |
| GED-P1-017 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical locale-writing.json | script, direction (LTR/RTL) |
| GED-P1-018 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical country-locales.json | official and default locales |
| GED-P1-019 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical administrative-levels.json | hierarchy labels and requirements |
| GED-P1-020 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical address-components.json | granular field ordering |
| GED-P1-021 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical currency-behavior.json | multi-currency, minor units |
| GED-P1-022 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical measurement-systems.json | metric, imperial per country |
| GED-P1-023 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical date-time-formats.json | patterns, week start |
| GED-P1-024 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical market-behavior.json | shipping, billing, phone flags |
| GED-P1-025 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical localized-country-names.json | multi-language translations |
| GED-P1-026 | P1 | P1 | M | MEDIUM | DONE | Gemini | create canonical country-display-order.json | sorting rules |
| GED-P1-008 | P1 | P1 | M | MEDIUM | DONE | Gemini | add source metadata to every row | every row has sources array |
| GED-P1-009 | P1 | P1 | M | MEDIUM | DONE | Gemini | add updatedAt and confidence | every row has meta |
| GED-P1-027 | P1 | P1 | M | MEDIUM | TODO | Gemini | Expand form-behavior sample coverage | covers more than US JP CA ID |
| GED-P1-028 | P1 | P1 | M | MEDIUM | TODO | Gemini | Expand administrative-levels sample coverage | covers more than US JP CA ID |
| GED-P4-001 | P4 | P4 | M | MEDIUM | DONE | Gemini | create country schema | valid JSON schema |
| GED-P4-014 | P4 | P4 | M | MEDIUM | DONE | Gemini | create territory-type schema | valid JSON schema |
| GED-P4-015 | P4 | P4 | M | MEDIUM | DONE | Gemini | create form-behavior schema | valid JSON schema |
| GED-P4-002 | P4 | P4 | M | MEDIUM | DONE | Gemini | create phone schema | valid JSON schema |
| GED-P4-003 | P4 | P4 | M | MEDIUM | DONE | Gemini | create postal-rule schema | valid JSON schema |
| GED-P4-004 | P4 | P4 | M | MEDIUM | DONE | Gemini | create currency schema | valid JSON schema |
| GED-P4-005 | P4 | P4 | M | MEDIUM | DONE | Gemini | create language schema | valid JSON schema |
| GED-P4-006 | P4 | P4 | M | MEDIUM | DONE | Gemini | create timezone schema | valid JSON schema |
| GED-P4-007 | P4 | P4 | M | MEDIUM | DONE | Gemini | create address-format schema | valid JSON schema |
| GED-P4-008 | P4 | P4 | M | MEDIUM | DONE | Codex | add schema validation script | fails on schema mismatch |
| GED-P4-009 | P4 | P4 | M | MEDIUM | DONE | Codex | add uniqueness validation | fails on duplicate iso2 |
| GED-P4-010 | P4 | P4 | L | MEDIUM | DONE | Codex | add postal regex validation | regex compile and pass |
| GED-P4-011 | P4 | P4 | L | MEDIUM | DONE | Codex | add provenance validation | every row has source |
| GED-P4-012 | P4 | P4 | M | MEDIUM | DONE | Codex | add deterministic build validation | binary diff stable |
| GED-P4-013 | P4 | P4 | M | MEDIUM | DONE | Codex | add line-ending validation | LF and UTF-8 only |
| GED-P4-016 | P4 | P4 | M | MEDIUM | DONE | Gemini | introduce Zod contracts for build scripts | prevent weird mistakes |
| GED-P2-001 | P2 | P2 | M | MEDIUM | DONE | Gemini | generate dist/json outputs | outputs from canonical JSON |
| GED-P2-002 | P2 | P2 | M | MEDIUM | DONE | Gemini | generate dist/tsv outputs | outputs from canonical JSON |
| GED-P2-003 | P2 | P2 | M | MEDIUM | DONE | Gemini | generate dist/csv outputs | outputs from canonical JSON |
| GED-P2-004 | P2 | P2 | M | MEDIUM | DONE | Gemini | generate dist/txt outputs | outputs from canonical JSON |
| GED-P2-005 | P2 | P2 | M | MEDIUM | DONE | Gemini | generate dist/md outputs | includes form-behavior, anti-patterns |
| GED-P2-006 | P2 | P2 | L | MEDIUM | DONE | Gemini | generate dist/sql outputs | valid SQL scripts |
| GED-P2-007 | P2 | P2 | L | MEDIUM | DONE | Gemini | generate dist/sqlite output | valid SQLite file |
| GED-P2-008 | P2 | P2 | M | MEDIUM | DONE | Codex | create build script | runs build, stable sort |
| GED-P2-009 | P2 | P2 | M | MEDIUM | DONE | Gemini | enforce generated artifact rule | no hand edits in dist |
| GED-P3-001 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getCountries | typed API returns Country[] |
| GED-P3-002 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getCountry | typed API returns Country |
| GED-P3-003 | P3 | P3 | M | MEDIUM | DONE | Codex | implement searchCountries | filters by name/iso2 |
| GED-P3-016 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getTerritoryType | returns type string |
| GED-P3-004 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getCallingCode | returns E.164 code |
| GED-P3-005 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getCountriesByCallingCode | returns Country[] |
| GED-P3-006 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getPostalRule | returns PostalRule |
| GED-P3-007 | P3 | P3 | M | MEDIUM | DONE | Codex | implement validatePostalCode | boolean validation |
| GED-P3-014 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getAddressFields | returns ordered fields |
| GED-P3-015 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getEntryRules | returns profile-specific rules |
| GED-P3-017 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getFormBehavior | returns UI rules |
| GED-P3-018 | P3 | P3 | M | MEDIUM | DONE | Codex | implement getPostalCodeBehavior | returns behavior per profile |
| GED-P3-012 | P3 | P3 | M | MEDIUM | DONE | Codex | configure package exports | ESM/CJS work |
| GED-P3-013 | P3 | P3 | M | MEDIUM | DONE | Codex | verify tree-shakable imports | imports work per field |
| GED-P5-001 | P5 | P5 | S | LOW | DONE | Gemini | write README.md | file exists, intro clear |
| GED-P5-002 | P5 | P5 | S | LOW | DONE | Gemini | document install | pnpm/npm instructions |
| GED-P5-003 | P5 | P5 | S | LOW | DONE | Gemini | document API | methods explained |
| GED-P5-004 | P5 | P5 | S | LOW | DONE | Gemini | document raw GitHub URLs | usage instructions |
| GED-P5-005 | P5 | P5 | S | LOW | DONE | Gemini | document CDN URLs | jsDelivr links |
| GED-P5-006 | P5 | P5 | S | HIGH | DONE | Manual | document source policy | source policy confirmed |
| GED-P5-007 | P5 | P5 | S | HIGH | DONE | Manual | document license policy | license policy confirmed |
| GED-P5-008 | P5 | P5 | S | LOW | DONE | Gemini | document non-goals | clarifies project scope |
| GED-P5-009 | P5 | P5 | S | LOW | DONE | Gemini | document output formats | JSON/TSV/MD etc |
| GED-P5-010 | P5 | P5 | S | LOW | DONE | Gemini | document AI-agent usage | explains MD context |
| GED-P6-001 | P6 | P6 | M | MEDIUM | DONE | Codex | create GitHub Actions CI | workflow exists |
| GED-P6-002 | P6 | P6 | M | MEDIUM | DONE | Codex | add pnpm install check | verify deps install |
| GED-P6-003 | P6 | P6 | M | MEDIUM | DONE | Codex | add lint check | verify code style |
| GED-P6-004 | P6 | P6 | M | MEDIUM | DONE | Codex | add test check | verify unit tests |
| GED-P6-005 | P6 | P6 | M | MEDIUM | DONE | Codex | add build check | verify artifacts generate |
| GED-P6-006 | P6 | P6 | M | MEDIUM | DONE | Codex | add validation check | verify data integrity |
| GED-P6-007 | P6 | P6 | L | HIGH | PARTIAL | Codex | add data-refresh workflow | placeholder echo logic only |
| GED-P6-008 | P6 | P6 | L | HIGH | DONE | Manual | add release workflow | publishes to npm |
| GED-P6-009 | P6 | P6 | L | HIGH | DONE | Codex | add npm publish dry run | verity package assets |
| GED-P6-010 | P6 | P6 | S | HIGH | DONE | Manual | add changelog gate | verify release notes |
| GED-P6-011 | P6 | P6 | M | MEDIUM | TODO | Codex | Add root pnpm lint script | pnpm lint exists and passes in CI |
| GED-P6-012 | P6 | P6 | L | HIGH | TODO | Codex | Replace placeholder data-refresh workflow with real ingestion plan | workflow opens PR with results |
| GED-P6-013 | P6 | P6 | M | MEDIUM | TODO | Codex | Verify better-sqlite3 CI portability | CI proves build on GH runner |
| GED-P7-001 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-postal-codes package | separate large package |
| GED-P7-002 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | import GeoNames-compatible postal directory | data ingestion |
| GED-P7-003 | P7 | P7 | L | MEDIUM | DEFERRED | Gemini | compress large postal data | reduced bundle size |
| GED-P7-004 | P7 | P7 | S | MEDIUM | DEFERRED | Gemini | publish release assets | artifacts on GH release |
| GED-P7-005 | P7 | P7 | L | MEDIUM | DEFERRED | Gemini | add localized country names | multiple translations |
| GED-P7-006 | P7 | P7 | L | MEDIUM | DEFERRED | Gemini | add subdivisions | state/province lists |
| GED-P7-007 | P7 | P7 | L | MEDIUM | DEFERRED | Gemini | add browser size budget | bundle size monitoring |
| GED-P7-008 | P7 | P7 | S | LOW | DEFERRED | Gemini | add WordPress usage example | implementation guide |
| GED-P7-009 | P7 | P7 | S | LOW | DEFERRED | Gemini | add no-code import examples | Airtable/Excel usage |
| GED-P7-010 | P7 | P7 | S | LOW | DEFERRED | Gemini | add public demo page | interactive explorer |
| GED-P7-011 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-airports package | separate package |
| GED-P7-012 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | import open-compatible airport dataset | data ingestion |
| GED-P7-013 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add IATA code lookup | getAirportByIata |
| GED-P7-014 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add ICAO code lookup | getAirportByIcao |
| GED-P7-015 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add airport country lookup by ISO2 | getAirportsByCountry |
| GED-P7-016 | P7 | P7 | S | MEDIUM | DEFERRED | Gemini | add scheduled-service airport filter | boolean filter |
| GED-P7-017 | P7 | P7 | S | MEDIUM | DEFERRED | Gemini | add airport source and confidence metadata | metadata per row |
| GED-P7-018 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | generate airport JSON TSV CSV SQL SQLite outputs | build distribution |
| GED-P7-019 | P7 | P7 | S | HIGH | DEFERRED | Gemini | document IATA licensing boundary | legal clarification |
| GED-P7-020 | P7 | P7 | S | LOW | DEFERRED | Gemini | document airport data non-goals | scope clarification |
| GED-P7-021 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-hazards package | separate package |
| GED-P7-022 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add hazard type taxonomy | UNDRR/ISC compatible |
| GED-P7-023 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add CAP-compatible field metadata | WMO/OASIS standard |
| GED-P7-024 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add tropical cyclone and typhoon records | meteorological hazards |
| GED-P7-025 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add earthquake tsunami volcano flood wildfire records | geological/hydro hazards |
| GED-P7-026 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | add country alert-system metadata | local authority mapping |
| GED-P7-027 | P7 | P7 | S | MEDIUM | DEFERRED | Gemini | add hazard source and confidence metadata | metadata per row |
| GED-P7-028 | P7 | P7 | M | MEDIUM | DEFERRED | Gemini | generate hazard JSON TSV CSV TXT MD SQL SQLite outputs | build distribution |
| GED-P7-029 | P7 | P7 | S | LOW | DEFERRED | Gemini | document disaster metadata non-goals | life-safety disclaimer |
| GED-P7-030 | P7 | P7 | S | HIGH | DEFERRED | Gemini | document emergency warning liability boundary | legal clarification |
| GED-P7-031 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-identity package | identity documents |
| GED-P7-032 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-commerce package | commerce metadata |
| GED-P7-033 | P7 | P7 | XL | HIGH | DEFERRED | Gemini | create @ringmasters/global-entry-locales package | localized data |

## Agent Commit Policy

Agents may commit their own completed task work.

Rules:

- Inspect `git status` before edits.
- Keep one task per commit.
- Use small commits.
- Use clear commit messages.
- Do not batch unrelated work.
- Run available validation before commit.
- Do not commit broken builds unless the task is explicitly a failing test fixture.
- Do not commit secrets.
- Do not commit local environment files.
- Do not commit generated files unless the task requires generated outputs.
- Push after commit when remote permissions allow.
- Report commit SHA after push.

Commit message format:

```text
<type>: <short task summary>
```

Allowed types:

```text
docs
data
build
test
feat
fix
chore
ci
```

Examples:

```text
docs: add source attribution policy
data: add canonical country records
build: generate TSV and TXT outputs
feat: add postal rule validator
test: add postal regex validation tests
ci: add data refresh workflow
```
