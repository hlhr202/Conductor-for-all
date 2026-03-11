# Overview

Add a second installation mode to the Conductor install flow so users can install Conductor workflows either as slash custom prompts or as project-level skills. The CLI must first ask which installation mode to use and then continue only through the selected flow.

For skills installation, the user should not choose from the full list of supported agents. Instead, the CLI should ask whether the target is `General Coding Agent` or `Claude Code`, then generate skills using the corresponding project-level output path. The skills packaging should comply with the agentskills.io specification and reuse the existing command template descriptions.

To keep the implementation simpler and more maintainable, the skills generation logic may be separated from the current prompt generators into a dedicated `src/skills-generators/` module with two strategies.

# Functional Requirements

## FR1. Install Mode Selection
- The install command must first ask the user to choose exactly one installation mode:
  - slash custom prompt
  - skills
- After the user selects a mode, the CLI must execute only that mode's flow.

## FR2. Slash Prompt Flow Compatibility
- If the user selects `slash custom prompt`, the install process must continue through the existing prompt-generation flow.
- Existing slash prompt behavior, supported agents, output paths, and file formats must remain unchanged.

## FR3. Skills Flow Target Selection
- If the user selects `skills`, the CLI must ask the user to choose exactly one target type:
  - `General Coding Agent`
  - `Claude Code`
- The skills flow must not ask the user to choose from the full agent list.

## FR4. Supported Skills
- When the user selects `skills`, the generator must create exactly these skills:
  - `conductor-implement`
  - `conductor-newTrack`
  - `conductor-revert`
  - `conductor-review`
  - `conductor-setup`
  - `conductor-status`

## FR5. Skill Specification Compliance
- Generated skills must follow the agentskills.io specification.
- Each generated skill directory must contain `SKILL.md`.
- Each `SKILL.md` must include frontmatter with:
  - `name`
  - `description`
- The `name` value must match the generated skill name.
- The `description` value must reuse the existing description from the corresponding TOML command template.
- Any additional files or directories required by the agentskills.io specification must also be generated.

## FR6. Skill Output Paths
- If the user selects `General Coding Agent`, generated skills must be written under:
  - `.agents/skills/<skill-name>/`
- If the user selects `Claude Code`, generated skills must be written under:
  - `.claude/skills/<skill-name>/`

## FR7. Setup Skill Template Assets
- The `conductor-setup` skill must include setup-related template assets under:
  - `<skill-root>/templates/`
- These generated assets must include:
  - `templates/code_styleguides/`
  - `templates/workflow.md`
- The generated assets must be sufficient for the setup skill to operate according to the intended skill packaging flow.

## FR8. Skill Generator Architecture
- Skills generation logic may be implemented separately from the existing prompt generators.
- A dedicated `src/skills-generators/` module is acceptable and preferred if it reduces complexity.
- The skills generator architecture only needs to support two strategies:
  - general coding agent skill output
  - Claude Code skill output

## FR9. Content Reuse and Consistency
- Skill content must remain aligned with the existing Conductor command templates.
- Skill descriptions must match the existing TOML descriptions used by the current prompt flow.
- The new skills flow must not introduce a second conflicting source of truth for command descriptions.

# Non-Functional Requirements
- Preserve backward compatibility for existing slash custom prompt installation.
- Keep generation deterministic for a given mode and target selection.
- Minimize duplication by reusing existing template sources where practical.
- Keep the skills flow simpler than the slash prompt flow by reducing target choices to two strategies.

# Acceptance Criteria
- The install command first prompts for `slash custom prompt` or `skills`.
- If `slash custom prompt` is selected, the existing prompt flow runs unchanged.
- If `skills` is selected, the CLI prompts only for `General Coding Agent` or `Claude Code`.
- Selecting `General Coding Agent` generates the six skills under `.agents/skills/`.
- Selecting `Claude Code` generates the six skills under `.claude/skills/`.
- Every generated `SKILL.md` contains `name` and `description` frontmatter.
- `description` values match the current source TOML descriptions.
- Generated skill packages comply with the agentskills.io specification.
- `conductor-setup` includes the required `templates/` assets, including `code_styleguides/` and `workflow.md`.
- A dedicated `src/skills-generators/` implementation can be introduced without changing the existing prompt generator behavior.

# Out of Scope
- Changing the existing slash prompt generation behavior beyond branching into the new mode-selection entry point.
- Asking users to choose a full agent list during skills installation.
- Supporting mixed installation of prompts and skills in a single run.
- Adding new Conductor skills beyond the six specified names.
- Introducing global skills installation.
