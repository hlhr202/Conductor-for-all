# Specification: Install Command Path and Agent Compatibility Improvements

## Overview

Improve the `install` command to fix path handling and extend compatibility to support the antigravity coding agent, while correcting agent descriptions.

## Current Issues

1. **Absolute Path Usage**: The install command uses absolute paths for `__$$CODE_AGENT_INSTALL_PATH$$__` placeholder replacement, which should be relative paths instead.
2. **Limited Agent Support**: Only supports opencode and claude-code agents. The antigravity agent is not supported.
3. **Incorrect Agent Description**: opencode agent is described as "Gemini-based coding assistant", which is misleading.

## Functional Requirements

### FR1: Path Handling Fix

**FR1.1**: The `installPath` variable used for template substitution must be a relative path from the project root directory, not an absolute path.

**FR1.2**: The relative path format should be:
- opencode: `.opencode/conductor`
- claude-code: `.claude/conductor`
- antigravity: `.agent/conductor`

**FR1.3**: When `__$$CODE_AGENT_INSTALL_PATH$$__` placeholder is replaced in template files, it must use the relative path format.

### FR2: Antigravity Agent Support

**FR2.1**: Add support for the `antigravity` agent type.

**FR2.2**: Antigravity agent directory structure:
- **Commands directory**: `.agent/workflows/`
- **Templates directory**: `.agent/conductor/`

**FR2.3**: Antigravity commands use Markdown files (same structure as commands in dist/).
**FR2.4**: For antigravity agent, perform string substitution on Markdown files:
- Replace `__$$CODE_AGENT_INSTALL_PATH$$__` with relative install path (e.g., `.agent/conductor`)
**FR2.5**: Antigravity command file naming format: `conductor-{cmd}.md` (e.g., `conductor-setup.md`, `conductor-newTrack.md`)

### FR3: Agent Description Correction

**FR3.1**: Update opencode agent description in the agent selection prompt.
- Remove "Gemini-based coding assistant" description
- Change to a simple, accurate description (e.g., "OpenCode" or "OpenCode coding assistant")

## Non-Functional Requirements

**NFR1**: Maintain backward compatibility with existing opencode and claude-code agents.

**NFR2**: Code coverage for new and modified code must meet the >80% target.

**NFR3**: All changes must follow the existing code style and patterns in the codebase.

## Acceptance Criteria

**AC1**: When running `conductor install` with opencode agent:
- `__$$CODE_AGENT_INSTALL_PATH$$__` in templates is replaced with `.opencode/conductor` (relative path)
- Commands are created in `.opencode/commands/` as `.md` files
- Templates are copied to `.opencode/conductor/templates/`

**AC2**: When running `conductor install` with claude-code agent:
- `__$$CODE_AGENT_INSTALL_PATH$$__` in templates is replaced with `.claude/conductor` (relative path)
- Commands are created in `.claude/commands/` as `.md` files
- Templates are copied to `.claude/conductor/templates/`

**AC3**: When running `conductor install` with antigravity agent:
- User can select "Antigravity" from agent selection menu
- `__$$CODE_AGENT_INSTALL_PATH$$__` in templates is replaced with `.agent/conductor` (relative path)
- Commands are created in `.agent/workflows/` as `.md` files with naming format `conductor-{cmd}.md`
- Templates are copied to `.agent/conductor/templates/`
- String substitutions are applied to Markdown file content

**AC4**: Agent selection prompt displays:
- "OpenCode" with corrected description (not "Gemini-based")
- "Claude Code" with existing description
- "Antigravity" with appropriate description

**AC5**: All unit tests pass with >80% coverage for modified files.

## Out of Scope

- Modifying the template file content or structure
- Changing the TOML file format for antigravity commands
- Adding additional agents beyond opencode, claude-code, and antigravity
- Modifying any commands other than `install`
