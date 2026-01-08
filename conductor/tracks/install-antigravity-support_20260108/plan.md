# Implementation Plan: Install Command Path and Agent Compatibility Improvements

## Phase 1: Path Handling Fix [checkpoint: 42627b4]

- [x] Task: Update installPath to use relative path instead of absolute path [92b583e]
    - [ ] Write failing test for path handling in copyTemplateFiles
    - [ ] Implement fix: change installPath from absolute to relative (agentDir/conductor)
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Antigravity Agent Support [checkpoint: b3b9844]

- [x] Task: Add 'antigravity' to AgentType type definition [3022a38]
    - [ ] Write failing test for new agent type support
    - [ ] Implement: update AgentType in src/types.ts
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [x] Task: Add antigravity option to agent selection prompt [3e35493]
    - [ ] Write failing test for agent selection with antigravity
    - [ ] Implement: update prompt.ts to include antigravity option
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [x] Task: Implement directory creation logic for antigravity agent [279deb4]
    - [ ] Write failing test for antigravity directory creation
    - [ ] Implement: update createConductorDirectories to handle antigravity
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [x] Task: Implement template copying logic for antigravity agent [24f270f]
    - [ ] Write failing test for antigravity template copying
    - [ ] Implement: update copyTemplateFiles to handle antigravity (TOML format, workflows dir)
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [x] Task: Implement validation logic for antigravity agent [38023c6]
    - [ ] Write failing test for antigravity validation
    - [ ] Implement: update validateProjectDirectory to handle antigravity
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) [checkpoint: b3b9844]


## Phase 3: Agent Description Correction

- [x] Task: Correct opencode agent description in selection prompt [96e646b]
    - [ ] Write failing test for agent description
    - [ ] Implement: update prompt.ts to remove "Gemini-based" description
    - [ ] Verify test passes
    - [ ] Run coverage report for modified files
    - [ ] Commit code changes
    - [ ] Attach task summary with git notes
    - [ ] Update plan with commit SHA
    - [ ] Commit plan update

- [~] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
