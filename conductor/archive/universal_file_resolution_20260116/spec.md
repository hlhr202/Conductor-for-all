# Specification: Universal File Resolution Protocol

## Overview
Implement the "Universal File Resolution Protocol" by distributing a standardized `GEMINI.md` context file and installing it into the user's project root with an agent-specific filename during `conductor install`. This ensures that various AI agents (Gemini, Claude, etc.) can automatically detect and load Conductor context.

## Functional Requirements

### 1. Source Asset Management
- The source of truth for the protocol file shall be `gemini-conductor-codebase/GEMINI.md`.
- The build process (`tsup.config.ts`) must ensure this file is copied to `dist/templates/GEMINI.md`.

### 2. File Resolution & Naming Logic
During installation (`conductor install`), the generator must determine the target filename based on the selected agent:
- **Gemini-cli** & **Antigravity** -> `GEMINI.md`
- **Claude Code** -> `CLAUDE.md`
- **All other agents** -> `AGENTS.md`

### 3. Installation Behavior
- The installer must check if the target file (e.g., `CLAUDE.md`) already exists in the project root.
- **If it exists:** Prompt the user: "File <filename> already exists. Overwrite? (y/N)".
    - If "y": Overwrite.
    - If "n": Skip.
- **If it does not exist:** Create the file by copying the content from `dist/templates/GEMINI.md`.

## Non-Functional Requirements
- **Extensibility:** The mapping logic should be easily extendable for future agents.
- **Reliability:** File operations must be safe and handle errors gracefully.

## Out of Scope
- Modifying the content of `GEMINI.md` itself (beyond the initial replication/templating).
