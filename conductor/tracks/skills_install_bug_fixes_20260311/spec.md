# Specification: Skills Installation Flow Bug Fixes

## Overview
This track addresses two specific bugs within the skills installation flow. First, it ensures that protocol files (`AGENTS.md`, `GEMINI.md`, `CLAUDE.md`) are correctly installed for skills generators, aligning their behavior with the custom command generators. Second, it corrects the template lookup path (`__$$CODE_AGENT_INSTALL_PATH$$__`) for the setup skill to correctly point to the `skills/conductor-setup/templates/` directory rather than the root `templates/` directory.

## Functional Requirements

### 1. Protocol Files Installation for Skills Generators
- The skills generator must install the correct protocol file based on the selected agent.
- The logic should differentiate agents into the following categories to determine the appropriate protocol file:
  - **Antigravity** -> `GEMINI.md`
  - **Gemini CLI** -> `GEMINI.md`
  - **Claude Code** -> `CLAUDE.md`
  - **General Coding Agents** (All others) -> `AGENTS.md`
- The installation logic must verify the agent type and copy the corresponding protocol file to the target directory.

### 2. Correct Setup Template Path
- The placeholder `__$$CODE_AGENT_INSTALL_PATH$$__` used in the setup skills must be correctly replaced during generation.
- The replacement value must point to the specific skill's templates directory: `(.agents|.claude)/skills/conductor-setup/templates/`.
- This ensures the setup skill can successfully locate and copy `code_styleguides/` and `workflow.md` templates.

## Non-Functional Requirements
- Maintain backward compatibility with existing command generators.
- Ensure tests cover both the protocol file selection logic and the template path replacement logic.

## Acceptance Criteria
- Running the skills installation flow for any supported agent results in the correct protocol file (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`) being copied to the expected location.
- Running the generated setup skill successfully locates and copies the template files without path resolution errors.
- All unit and integration tests pass.