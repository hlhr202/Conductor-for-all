# Implementation Plan: Protocol File Project-Scoped Output

## Phase 1: Test Infrastructure

- [x] Task: Write failing tests for project-scoped protocol file output
    - [x] Create/update test in `tests/generators/ConfigurableGenerator.test.ts` for protocol file destination with global scope
    - [x] Test case: When scope is 'global', protocol file should be written to `process.cwd()` not `homedir()`
    - [x] Test case: When scope is 'project', protocol file should be written to `process.cwd()` (existing behavior)
    - [x] Test case: Overwrite prompt should still appear when protocol file exists at project root
    - [x] Run tests to confirm they fail (Red phase)

- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Implementation

- [x] Task: Modify ConfigurableGenerator to use process.cwd() for protocol files (d6f4f90)
    - [x] Identify the exact location in `ConfigurableGenerator.ts` where protocol file destination is determined (line ~70)
    - [x] Change `const protocolDest = join(targetDir, protocolFilename)` to use `process.cwd()` instead of `targetDir`
    - [x] Run tests to confirm they pass (Green phase)

- [x] Task: Verify all affected generators work correctly
    - [x] Run full test suite: `pnpm test`
    - [x] Verify coverage meets >80% threshold

- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Final Verification

- [ ] Task: Manual end-to-end testing
    - [ ] Build the project: `pnpm build`
    - [ ] Test with Codex generator + global scope: verify AGENTS.md appears in project root
    - [ ] Test with Codex generator + project scope: verify AGENTS.md appears in project root
    - [ ] Test overwrite prompt behavior

- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
