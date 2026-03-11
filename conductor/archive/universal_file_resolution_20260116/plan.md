# Implementation Plan - Universal File Resolution Protocol

## Phase 1: Build & Distribution Setup
- [x] Task: Update Replication Script
    - [x] Modify `scripts/replicate-gemini-conductor.md` instructions to include extracting `GEMINI.md`.
    - [x] Execute the replication steps to fetch `GEMINI.md` into `gemini-conductor-codebase/GEMINI.md`.
- [x] Task: Verify Build Configuration
    - [x] Verify `tsup.config.ts` correctly copies `gemini-conductor-codebase` (including `GEMINI.md`) to `dist/templates`.
- [x] Task: Conductor - User Manual Verification 'Build & Distribution Setup' (Protocol in workflow.md)

## Phase 2: Core Logic Implementation (TDD)
- [x] Task: Update Generator Configuration Schema
    - [x] Update `AgentConfig` in `src/generators/types.ts` to include optional `protocolFilename?: string`.
- [x] Task: Configure Protocol Filenames per Agent
    - [x] Update `src/generators/gemini/config.ts` (`GEMINI.md`)
    - [x] Update `src/generators/antigravity/config.ts` (`GEMINI.md`)
    - [x] Update `src/generators/claude-code/config.ts` (`CLAUDE.md`)
    - [x] Update other agent configs (`AGENTS.md`)
- [x] Task: Implement Installation Logic in ConfigurableGenerator
    - [x] Create test file `tests/protocol-resolution.test.ts`.
    - [x] Write failing tests.
    - [x] Implement logic in `src/generators/ConfigurableGenerator.ts`.
- [x] Task: Conductor - User Manual Verification 'Core Logic Implementation' (Protocol in workflow.md)

## Phase 3: Final Verification
- [x] Task: End-to-End Manual Verification
    - [x] Run `conductor install` with different agents.
    - [x] Verify file creation and content.
    - [x] Verify overwrite prompt behavior.
- [x] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
