# Implementation Plan: TypeScript/Node.js Port of Conductor CLI

## Phase 1: Project Setup and Configuration

- [x] Task: Initialize Node.js project structure [4bd8480]
    - [x] Write test: Create js/ directory structure and verify it exists
    - [x] Implement: Create js/ directory with proper structure
    - [x] Write test: Create package.json in js/ directory
    - [x] Implement: Initialize js/package.json with basic metadata
    - [x] Write test: Create src/ directory for TypeScript source
    - [x] Implement: Set up js/src/ directory
    - [x] Write test: Create templates/ directory for static templates
    - [x] Implement: Set up js/templates/ directory
    - [x] Write test: Create dist/ directory for compiled output
    - [x] Implement: Set up js/dist/ directory

- [x] Task: Configure TypeScript [dfbc54c]
    - [x] Write test: Verify tsconfig.json exists and has correct configuration
    - [x] Implement: Create js/tsconfig.json with strict mode enabled
    - [x] Write test: Verify TypeScript compiles without errors
    - [x] Implement: Configure tsconfig.json for Node.js and modern ES targets
    - [x] Write test: Verify type checking works correctly
    - [x] Implement: Enable strict null checks and no any types

- [x] Task: Configure build tool (tsup) [3fef749]
    - [x] Write test: Verify tsup.config.ts exists
    - [x] Implement: Create js/tsup.config.ts for bundling
    - [x] Write test: Verify tsup builds to js/dist/
    - [x] Implement: Configure tsup to output to js/dist/
    - [x] Write test: Verify build output includes all necessary files
    - [x] Implement: Configure tsup to bundle templates and assets
    - [x] Write test: Verify ESM and CommonJS compatibility
    - [x] Implement: Configure tsup for dual module formats if needed

- [x] Task: Configure testing (Vitest) [2892cd9]
    - [x] Write test: Verify vitest.config.ts exists
    - [x] Implement: Create js/vitest.config.ts
    - [x] Write test: Verify watch mode is disabled
    - [x] Implement: Configure Vitest to avoid watch mode (CI-aware)
    - [x] Write test: Verify test coverage is configured
    - [x] Implement: Set up coverage reporting for >80% threshold
    - [x] Write test: Verify test environment is Node.js
    - [x] Implement: Configure Vitest for Node.js environment

- [x] Task: Install and configure dependencies
    - [x] Write test: Verify yargs is installed
    - [x] Implement: Add yargs to devDependencies
    - [x] Write test: Verify inquirer is installed
    - [x] Implement: Add inquirer to devDependencies
    - [x] Write test: Verify tsup is installed
    - [x] Implement: Add tsup to devDependencies
    - [x] Write test: Verify vitest is installed
    - [x] Implement: Add vitest to devDependencies
    - [x] Write test: Verify TypeScript types are installed
    - [x] Implement: Add @types/node and TypeScript dependencies
    - [x] Write test: Verify file system utilities are available
    - [x] Implement: Add fs-extra and @types/fs-extra for file operations

- [ ] Task: Conductor - User Manual Verification 'Project Setup and Configuration' (Protocol in workflow.md)

## Phase 2: Template System

- [x] Task: Design and create template structure
    - [x] Write test: Verify template directories exist
    - [x] Implement: Create template directory structure in js/templates/
    - [x] Write test: Verify agent-specific template directories exist
    - [x] Implement: Create templates for different agents (opencode, claude-code)
    - [x] Write test: Verify conductor command templates exist
    - [x] Implement: Create templates for setup, newTrack, implement, status commands

- [x] Task: Create template files with variables
    - [x] Write test: Verify setup.md template exists and has correct variables
    - [x] Implement: Create js/templates/opencode/commands/conductor:setup.md with {agent_type} variable
    - [x] Write test: Verify newTrack.md template exists and has correct variables
    - [x] Implement: Create js/templates/opencode/commands/conductor:newTrack.md with {agent_type} variable
    - [x] Write test: Verify implement.md template exists and has correct variables
    - [x] Implement: Create js/templates/opencode/commands/conductor:implement.md with {agent_type} variable
    - [x] Write test: Verify status.md template exists and has correct variables
    - [x] Implement: Create js/templates/opencode/commands/conductor:status.md with {agent_type} variable
    - [x] Write test: Verify conductor directory templates exist
    - [x] Implement: Create templates for conductor/ directory files (tech-stack.md, workflow.md, etc.)

- [x] Task: Implement template variable substitution
    - [x] Write test: Verify variable substitution replaces {agent_type} correctly
    - [x] Implement: Create substituteVariables function in js/src/utils/template.ts
    - [x] Write test: Verify multiple variables are replaced in single template
    - [x] Implement: Extend substitution to handle multiple variables
    - [x] Write test: Verify variable substitution handles missing variables gracefully
    - [x] Implement: Add error handling for missing required variables
    - [x] Write test: Verify variable substitution with different agent types
    - [x] Implement: Test substitution with opencode and claude-code agent types

- [x] Task: Implement template loader
    - [x] Write test: Verify template file can be loaded from filesystem
    - [x] Implement: Create loadTemplate function in js/src/utils/template.ts
    - [x] Write test: Verify template loader handles missing files
    - [x] Implement: Add error handling for missing template files
    - [x] Write test: Verify template loader returns string content
    - [x] Implement: Ensure loadTemplate returns properly formatted string
    - [x] Write test: Verify template loader can load from different agent directories
    - [x] Implement: Support loading templates from agent-specific paths

- [~] Task: Conductor - User Manual Verification 'Template System' (Protocol in workflow.md)

## Phase 3: CLI Infrastructure

- [ ] Task: Set up yargs CLI structure
    - [ ] Write test: Verify CLI can be initialized
    - [ ] Implement: Create js/src/cli/index.ts with yargs setup
    - [ ] Write test: Verify install command is registered
    - [ ] Implement: Add install command to yargs configuration
    - [ ] Write test: Verify help text is displayed correctly
    - [ ] Implement: Configure yargs help and usage information
    - [ ] Write test: Verify command parsing works
    - [ ] Implement: Test yargs command parsing with install command

- [ ] Task: Implement inquirer integration
    - [ ] Write test: Verify agent selection prompt works
    - [ ] Implement: Create agent selection prompt using inquirer
    - [ ] Write test: Verify prompt returns correct agent type
    - [ ] Implement: Ensure prompt returns "opencode" or "claude-code"
    - [ ] Write test: Verify prompt handles user cancellation
    - [ ] Implement: Add error handling for prompt cancellation
    - [ ] Write test: Verify prompt message is user-friendly
    - [ ] Implement: Add clear, helpful prompt messages

- [ ] Task: Create CLI entry point
    - [ ] Write test: Verify CLI entry point exists and is executable
    - [ ] Implement: Create js/src/index.ts as main entry point
    - [ ] Write test: Verify CLI can be called from command line
    - [ ] Implement: Add shebang and executable permissions
    - [ ] Write test: Verify CLI handles invalid arguments
    - [ ] Implement: Add argument validation and error handling
    - [ ] Write test: Verify CLI outputs help when no command provided
    - [ ] Implement: Configure default help display

- [ ] Task: Conductor - User Manual Verification 'CLI Infrastructure' (Protocol in workflow.md)

## Phase 4: Install Command Implementation

- [ ] Task: Implement project validation
    - [ ] Write test: Verify target directory is valid
    - [ ] Implement: Create validateProjectDirectory function
    - [ ] Write test: Verify validation fails for non-existent directory
    - [ ] Implement: Add error handling for invalid directory
    - [ ] Write test: Verify validation detects existing Conductor installation
    - [ ] Implement: Check for existing conductor/ directory
    - [ ] Write test: Verify validation returns project root path
    - [ ] Implement: Return validated project path

- [ ] Task: Implement directory creation logic
    - [ ] Write test: Verify conductor/ directory is created
    - [ ] Implement: Create createConductorDirectories function
    - [ ] Write test: Verify .opencode/ directory structure is created
    - [ ] Implement: Create .opencode/commands/ and .opencode/conductor/ directories
    - [ ] Write test: Verify directories are created with correct permissions
    - [ ] Implement: Ensure proper directory permissions
    - [ ] Write test: Verify existing directories are not overwritten
    - [ ] Implement: Add idempotency checks for directory creation

- [ ] Task: Implement file copying logic
    - [ ] Write test: Verify template files are copied to correct locations
    - [ ] Implement: Create copyTemplateFiles function
    - [ ] Write test: Verify agent-specific files are selected based on agent type
    - [ ] Implement: Filter templates by agent selection
    - [ ] Write test: Verify variables are substituted during copy
    - [ ] Implement: Apply variable substitution when copying files
    - [ ] Write test: Verify file copying preserves content
    - [ ] Implement: Ensure file content integrity during copy

- [ ] Task: Implement core install command
    - [ ] Write test: Verify install command executes successfully
    - [ ] Implement: Create installCommand handler in js/src/commands/install.ts
    - [ ] Write test: Verify install prompts for agent selection
    - [ ] Implement: Integrate agent selection prompt into install flow
    - [ ] Write test: Verify install creates all required directories
    - [ ] Implement: Call directory creation functions in install flow
    - [ ] Write test: Verify install copies all template files
    - [ ] Implement: Call file copying functions in install flow
    - [ ] Write test: Verify install is idempotent
    - [ ] Implement: Add checks to skip existing Conductor installations
    - [ ] Write test: Verify install handles errors gracefully
    - [ ] Implement: Add comprehensive error handling and user feedback

- [ ] Task: Add install command to CLI
    - [ ] Write test: Verify install command is accessible via CLI
    - [ ] Implement: Register install command with yargs
    - [ ] Write test: Verify install command accepts target directory argument
    - [ ] Implement: Add directory argument to install command
    - [ ] Write test: Verify install command provides helpful error messages
    - [ ] Implement: Add error messages for invalid inputs

- [ ] Task: Conductor - User Manual Verification 'Install Command Implementation' (Protocol in workflow.md)

## Phase 5: Build and Distribution

- [ ] Task: Configure package.json for npm distribution
    - [ ] Write test: Verify package.json has correct metadata
    - [ ] Implement: Update js/package.json with name, version, description
    - [ ] Write test: Verify package.json has correct entry point
    - [ ] Implement: Set bin field for global CLI installation
    - [ ] Write test: Verify package.json includes all necessary files
    - [ ] Implement: Configure files field to include src/, templates/, dist/
    - [ ] Write test: Verify package.json has correct scripts
    - [ ] Implement: Add build, test, and start scripts
    - [ ] Write test: Verify package.json has correct dependencies
    - [ ] Implement: Ensure all dependencies are properly listed

- [ ] Task: Set up build scripts
    - [ ] Write test: Verify build script compiles TypeScript
    - [ ] Implement: Create build script using tsup
    - [ ] Write test: Verify build script outputs to js/dist/
    - [ ] Implement: Configure build output directory
    - [ ] Write test: Verify build script includes templates
    - [ ] Implement: Ensure templates are bundled in build
    - [ ] Write test: Verify build script generates executable
    - [ ] Implement: Configure shebang and permissions in build

- [ ] Task: Test local installation
    - [ ] Write test: Verify CLI can be run via pnpm start
    - [ ] Implement: Test local execution with pnpm start
    - [ ] Write test: Verify CLI can be run with node js/dist/index.js
    - [ ] Implement: Test direct node execution
    - [ ] Write test: Verify local install command works
    - [ ] Implement: Test install command in local development mode
    - [ ] Write test: Verify all functionality works locally
    - [ ] Implement: Run integration tests for local execution

- [ ] Task: Test global installation
    - [ ] Write test: Verify CLI can be installed globally
    - [ ] Implement: Test global npm/pnpm installation
    - [ ] Write test: Verify conductor command works after global install
    - [ ] Implement: Test global CLI execution
    - [ ] Write test: Verify global install command works
    - [ ] Implement: Test install command in global mode
    - [ ] Write test: Verify global and local produce identical results
    - [ ] Implement: Compare outputs between local and global

- [ ] Task: Create distribution artifacts
    - [ ] Write test: Verify npm package can be built
    - [ ] Implement: Test npm pack command
    - [ ] Write test: Verify npm package contains all files
    - [ ] Implement: Inspect package contents
    - [ ] Write test: Verify npm package can be installed from tarball
    - [ ] Implement: Test installation from local tarball
    - [ ] Write test: Verify package size is reasonable (<5MB)
    - [ ] Implement: Check and optimize package size

- [ ] Task: Conductor - User Manual Verification 'Build and Distribution' (Protocol in workflow.md)

## Phase 6: Testing and Coverage

- [ ] Task: Run all tests and ensure they pass
    - [ ] Write test: Verify all unit tests pass
    - [ ] Implement: Run CI=true pnpm test
    - [ ] Write test: Verify all integration tests pass
    - [ ] Implement: Run integration test suite
    - [ ] Write test: Verify no tests are skipped or failing
    - [ ] Implement: Review and fix any failing tests
    - [ ] Write test: Verify test execution time is reasonable
    - [ ] Implement: Optimize slow tests if needed

- [ ] Task: Verify code coverage exceeds 80%
    - [ ] Write test: Verify coverage report is generated
    - [ ] Implement: Run coverage report with Vitest
    - [ ] Write test: Verify overall coverage is >80%
    - [ ] Implement: Check coverage metrics
    - [ ] Write test: Verify critical paths have >90% coverage
    - [ ] Implement: Review coverage for core modules
    - [ ] Write test: Verify all modules have some coverage
    - [ ] Implement: Add tests for uncovered code paths

- [ ] Task: Run integration tests
    - [ ] Write test: Verify end-to-end install flow works
    - [ ] Implement: Test complete install workflow
    - [ ] Write test: Verify install with different agents works
    - [ ] Implement: Test with opencode and claude-code
    - [ ] Write test: Verify install handles edge cases
    - [ ] Implement: Test with existing installations, invalid directories, etc.
    - [ ] Write test: Verify install produces correct output
    - [ ] Implement: Validate generated files and structure

- [ ] Task: Document any deviations from spec
    - [ ] Write test: Verify all functional requirements are met
    - [ ] Implement: Review spec.md against implementation
    - [ ] Write test: Verify all non-functional requirements are met
    - [ ] Implement: Review performance, compatibility, etc.
    - [ ] Write test: Verify acceptance criteria are satisfied
    - [ ] Implement: Check all acceptance criteria items
    - [ ] Write test: Verify tech-stack.md is updated if needed
    - [ ] Implement: Update tech-stack.md with any deviations

- [ ] Task: Conductor - User Manual Verification 'Testing and Coverage' (Protocol in workflow.md)

## Phase 7: Documentation

- [ ] Task: Create Node.js-specific README
    - [ ] Write test: Verify js/README.md exists
    - [ ] Implement: Create js/README.md with Node.js-specific instructions
    - [ ] Write test: Verify README has installation instructions
    - [ ] Implement: Document npm/pnpm installation steps
    - [ ] Write test: Verify README has usage examples
    - [ ] Implement: Add examples of using the CLI
    - [ ] Write test: Verify README has development instructions
    - [ ] Implement: Document build, test, and local development
    - [ ] Write test: Verify README has troubleshooting section
    - [ ] Implement: Add common issues and solutions

- [ ] Task: Update main project README
    - [ ] Write test: Verify main README references both versions
    - [ ] Implement: Add Node.js section to main README
    - [ ] Write test: Verify installation options are documented
    - [ ] Implement: Document both Rust and Node.js installation
    - [ ] Write test: Verify usage examples include both versions
    - [ ] Implement: Show usage for both implementations
    - [ ] Write test: Verify contribution guide mentions both
    - [ ] Implement: Update contribution section

- [ ] Task: Add code documentation
    - [ ] Write test: Verify all public functions have JSDoc comments
    - [ ] Implement: Add JSDoc to all exported functions
    - [ ] Write test: Verify complex logic has inline comments
    - [ ] Implement: Add explanatory comments where needed
    - [ ] Write test: Verify type definitions are clear
    - [ ] Implement: Ensure TypeScript types are self-documenting
    - [ ] Write test: Verify README for complex modules
    - [ ] Implement: Create module-specific READMEs if needed

- [ ] Task: Final documentation review
    - [ ] Write test: Verify all documentation is consistent
    - [ ] Implement: Review and unify documentation style
    - [ ] Write test: Verify all links and references work
    - [ ] Implement: Test and fix all documentation links
    - [ ] Write test: Verify examples in documentation are accurate
    - [ ] Implement: Test all documented examples
    - [ ] Write test: Verify documentation covers all features
    - [ ] Implement: Ensure feature completeness in docs

- [ ] Task: Conductor - User Manual Verification 'Documentation' (Protocol in workflow.md)
