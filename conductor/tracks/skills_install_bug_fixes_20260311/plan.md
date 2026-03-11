# Implementation Plan - Skills Installation Flow Bug Fixes

## Phase 1: Fix Protocol Files Installation
- [ ] Task: Pass Agent Context to Skills Generators
    - [ ] Update the factory or instantiation logic to pass the selected agent's configuration (which includes `protocolFilename`) into the `BaseSkillGenerator`.
- [ ] Task: Implement Protocol File Copy Logic
    - [ ] Modify `BaseSkillGenerator.ts` to utilize the agent's configuration to copy the correct protocol file (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`).
    - [ ] Add the logic to prompt for overwrite if the protocol file already exists, matching the command generator's behavior.
    - [ ] Write/update unit tests to verify protocol file selection and copying logic for different agent types.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Correct Setup Template Path
- [ ] Task: Update Template Path Replacement Logic
    - [ ] Modify `BaseSkillGenerator.ts` to replace `__$$CODE_AGENT_INSTALL_PATH$$__` with the correct path, ensuring it points specifically to the `skills/conductor-setup/templates/` directory within the respective agent's base path (e.g., `.agents` or `.claude`).
    - [ ] Write/update unit tests to verify the template path replacement logic.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Final Verification
- [ ] Task: End-to-End Testing
    - [ ] Run `conductor install` using the skills generator for various agents (e.g., Gemini CLI, Claude Code, General).
    - [ ] Verify both the correct protocol files are created in the project root and the template paths in the generated setup skill are correct.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)