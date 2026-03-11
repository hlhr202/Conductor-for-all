# Implementation Plan

## Phase 1: Add install mode branching [checkpoint: cfbd500]
- [x] Task: Introduce install mode selection in the install command flow [403ac09]
    - [ ] Write failing test: verify install prompts for `slash custom prompt` or `skills`
    - [ ] Write failing test: verify selecting `slash custom prompt` preserves the current agent-selection flow
    - [ ] Write failing test: verify selecting `skills` skips the full agent list and branches into skills target selection
    - [ ] Implement: add install mode prompt and branch the `install` command into prompt mode vs skills mode
    - [ ] Refactor: keep the command flow readable and avoid duplicating validation/generation orchestration
- [x] Task: Add skills target selection UX [403ac09]
    - [ ] Write failing test: verify skills mode prompts only for `General Coding Agent` or `Claude Code`
    - [ ] Write failing test: verify the selected skills target is passed into the skills generation flow
    - [ ] Implement: add prompt helpers and install-command wiring for the two-option skills target selection
    - [ ] Refactor: align prompt naming and types with the existing CLI prompt patterns
- [x] Task: Conductor - User Manual Verification 'Phase 1: Add install mode branching' (Protocol in workflow.md)

## Phase 2: Build skill generation architecture
- [ ] Task: Add a dedicated skills generator module
    - [ ] Write failing test: verify the factory resolves a skills generator strategy for `General Coding Agent`
    - [ ] Write failing test: verify the factory resolves a skills generator strategy for `Claude Code`
    - [ ] Implement: create `src/skills-generators/` with shared generation logic and two path strategies
    - [ ] Refactor: extract shared skill packaging behavior so only the output-path strategy differs
- [ ] Task: Generate the six Conductor skills from existing command templates
    - [ ] Write failing test: verify `conductor-implement`, `conductor-newTrack`, `conductor-revert`, `conductor-review`, `conductor-setup`, and `conductor-status` are generated
    - [ ] Write failing test: verify generated skill names map to the correct command template sources
    - [ ] Implement: derive skill content from the existing TOML command templates instead of adding a second source of truth
    - [ ] Refactor: centralize skill definitions and command-template mapping
- [ ] Task: Add agentskills-compliant `SKILL.md` generation
    - [ ] Write failing test: verify each generated `SKILL.md` contains `name` and `description` frontmatter
    - [ ] Write failing test: verify `description` values are copied from the source TOML command descriptions
    - [ ] Write failing test: verify any required supporting skill files are emitted for a minimal valid skill package
    - [ ] Implement: generate `SKILL.md` and required support files per the agentskills.io specification
    - [ ] Refactor: keep frontmatter generation consistent across both skills strategies
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Build skill generation architecture' (Protocol in workflow.md)

## Phase 3: Add agent-specific skill outputs and setup assets
- [ ] Task: Write skills to the correct project-level directories
    - [ ] Write failing test: verify `General Coding Agent` outputs to `.agents/skills/<skill-name>/`
    - [ ] Write failing test: verify `Claude Code` outputs to `.claude/skills/<skill-name>/`
    - [ ] Implement: wire the two strategies to generate the correct project-level folder structure
    - [ ] Refactor: isolate path-building logic from content-generation logic
- [ ] Task: Package setup templates inside `conductor-setup`
    - [ ] Write failing test: verify `conductor-setup/templates/workflow.md` is generated
    - [ ] Write failing test: verify `conductor-setup/templates/code_styleguides/` is generated with the expected template files
    - [ ] Implement: copy the required setup template assets into `conductor-setup/templates/`
    - [ ] Refactor: reuse existing template-loading utilities where possible
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Add agent-specific skill outputs and setup assets' (Protocol in workflow.md)

## Phase 4: Verify compatibility and quality gates
- [ ] Task: Preserve existing slash prompt behavior
    - [ ] Write failing test: verify prompt-mode installs still use the existing generators unchanged
    - [ ] Implement: fix any regressions introduced by install mode branching
    - [ ] Refactor: remove compatibility shims if the final flow no longer needs them
- [ ] Task: Add integration coverage for the full install flow
    - [ ] Write failing test: verify end-to-end prompt-mode installation still succeeds
    - [ ] Write failing test: verify end-to-end skills-mode installation succeeds for `General Coding Agent`
    - [ ] Write failing test: verify end-to-end skills-mode installation succeeds for `Claude Code`
    - [ ] Implement: add or update integration-style tests around install orchestration and generated outputs
- [ ] Task: Run project quality gates for the new flow
    - [ ] Verify coverage for the new code meets the project target
    - [ ] Run configured test checks for the changed modules
    - [ ] Review generated outputs for documentation and type-safety consistency
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verify compatibility and quality gates' (Protocol in workflow.md)
