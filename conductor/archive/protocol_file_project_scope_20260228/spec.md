# Specification: Protocol File Project-Scoped Output

## Overview
Fix a bug where the `AGENTS.md` protocol file is incorrectly written to the user's home directory when global scope is selected for generators like Codex. The protocol file should always be written to the project root, regardless of the installation scope selected by the user.

## Problem Statement
Currently, when a user selects "global" scope for the Codex generator:
1. The `targetDir` is reassigned to `homedir()` in `codex/generator.ts`
2. `ConfigurableGenerator.ts:70` uses this modified `targetDir` for the protocol file destination
3. Result: `AGENTS.md` is written to `~/AGENTS.md` instead of the project root

This is incorrect because the protocol file (AGENTS.md) contains project-specific context and instructions that should always reside in the project directory.

## Functional Requirements

### FR1: Project-Root Output for Protocol Files
- The `AGENTS.md` file MUST always be written to the project root directory
- The project root is defined as `process.cwd()` at the time of generation
- This behavior applies regardless of the user-selected installation scope (global or project)

### FR2: Universal Application
- This fix MUST apply to all generators that have `protocolFilename` configured
- Affected generators: codex, cline, windsurf, vscode-copilot, cursor, opencode
- No per-generator configuration is required

### FR3: Preserve Overwrite Prompt Behavior
- The existing user prompt for file overwrites MUST be preserved
- If `AGENTS.md` already exists at the project root, the user should be prompted to overwrite or skip

## Non-Functional Requirements

### NFR1: Backward Compatibility
- Existing behavior for project-scoped installations must remain unchanged
- Only global-scoped installations will see a change in protocol file location

## Acceptance Criteria

1. **AC1:** When running `conductor install --agent codex` with global scope selected, `AGENTS.md` is written to `process.cwd()/AGENTS.md`
2. **AC2:** When running `conductor install --agent codex` with project scope selected, `AGENTS.md` is written to `process.cwd()/AGENTS.md` (existing behavior preserved)
3. **AC3:** All other generators with `protocolFilename` exhibit the same behavior
4. **AC4:** If `AGENTS.md` exists at project root, the overwrite prompt is displayed
5. **AC5:** All existing tests pass after the change
6. **AC6:** New unit tests cover the project-scoped protocol file behavior

## Out of Scope

- Changes to how commands/prompts are installed (those should respect the user-selected scope)
- Changes to generators without `protocolFilename` configured
- Adding configuration options for per-generator protocol file behavior
