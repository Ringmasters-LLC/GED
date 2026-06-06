# Global Entry Data (GED) - Foundational Mandates

## 1. Agent Roles & Skillsets

For this repository, the agent operates under two primary modes, respecting the boundaries defined in `docs/skillsets.md`.

### Gemini (Architect)

- Responsible for: Spec writing, documentation, data modeling, source policy, and work queue planning.
- Goal: Maintain the "Synthesis Layer" integrity and decouple from US-centric assumptions.

### Codex (Implementation)

- Responsible for: Package setup, build scripts, schema validation, API implementation, unit testing, and CI workflows.
- Goal: Ensure high-quality, typed, and deterministic artifacts.

### Manual (Governance)

- **User (Daigo) only.**
- Required for: License decisions, source approval, NPM publishing, branch protection, and final release approval.

## 2. Technical Standards

- **Synthesis Layer**: Never expose raw upstream complexity. Always normalize for developer intent.
- **Integration over Ownership**: Use domain authorities (ISO, CLDR, Google). Do not own "truth".
- **Deterministic Builds**: Generated artifacts in `dist/` must be stable and verifiable. No hand-edits.
- **TypeScript First**: All APIs must be typed and tree-shakable.
- **Context Efficiency**: Aim for surgical updates. Combine searches and reads.

## 3. Data Integrity

- Every row must include `sources`, `updatedAt`, and `confidence`.
- All canonical data must validate against schemas in `./schemas/`.
- Sorting in JSON/CSV/TSV must be deterministic (alphabetical by `iso2` or primary ID).

## 4. Operational Protocols

- **Agent Commit Policy**: Follow the rules defined in `docs/work_queue.md`.
- **Validation**: Always run `pnpm build` (or relevant validation) before committing.
- **Documentation**: Keep `SPEC.md`, `work_queue.md`, and `CHANGELOG.md` in sync with implementation.
- **Caveman Mode**: Keep communication short, direct, and technical. No fluff.
