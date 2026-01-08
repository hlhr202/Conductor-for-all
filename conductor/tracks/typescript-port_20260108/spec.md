# Specification: TypeScript/Node.js Port of Conductor CLI

## Overview

Port the existing Rust-based `conductor-4-all` CLI tool to TypeScript/Node.js to provide an alternative implementation that leverages the npm ecosystem. The TypeScript version will maintain functional parity with the Rust version while using Node.js conventions and tooling.

## Functional Requirements

### Core Features

1. **CLI Command Structure**
   - Primary command: `install` - Install Conductor into a target project
   - Use `yargs` for command parsing and CLI interface
   - Support both global installation (`npm install -g`) and local execution (`pnpm start`)

2. **Interactive Prompting**
   - Use `inquirer` npm package for interactive prompts (Rust `inquire` equivalent)
   - Prompt user to select AI Coding Agent (Opencode, Claude Code, etc.)
   - Provide clear, user-friendly prompt messages

3. **Project Installation**
   - Scaffold Conductor directory structure in target project:
     - `.opencode/commands/` - Agent-specific command files
     - `.opencode/conductor/templates/` - Workflow guides and templates
     - `conductor/` - Conductor configuration and track management
   - Install agent-specific command files based on user selection
   - Copy template files with dynamic variable substitution

4. **Template Management**
   - Store templates as static files in the Node.js package (bundled with npm distribution)
   - Perform dynamic variable substitution based on selected coding agent
   - Support template variables: `{agent_type}`, `{project_root}`, etc.

5. **Agent Commands**
   - After installation, the following commands should be available for AI agents:
     - `/conductor:setup` - Initialize the project structure
     - `/conductor:newTrack` - Start a new feature or bug fix track
     - `/conductor:implement` - Implement the selected track
     - `/conductor:status` - Check the status of current tracks
   - These commands are NOT implemented in the CLI tool itself but are installed as documentation/prompt files for agents

### Technical Requirements

1. **Project Structure**
   ```
   js/
   ├── src/              # TypeScript source code
   ├── templates/        # Static template files (bundled with npm)
   ├── dist/            # Compiled JavaScript (output)
   ├── package.json     # Node.js package configuration
   ├── tsconfig.json    # TypeScript configuration
   └── tsup.config.ts   # Build configuration
   ```

2. **Dependencies**
   - `yargs` - Command line argument parsing
   - `inquirer` - Interactive command line prompts
   - Additional dependencies for file operations, path handling, etc.

3. **Build Configuration**
   - Use `tsup` for TypeScript compilation and bundling
   - Output compiled files to `js/dist/`
   - Bundle static templates in the npm package distribution
   - Configure for both ESM and CommonJS compatibility if needed

4. **Testing**
   - Use `Vitest` as the testing framework
   - Configure to avoid watch mode (CI-aware)
   - Target code coverage: >80% (consistent with Rust version)
   - Tests should cover:
     - CLI command parsing and validation
     - Template variable substitution
     - File operations and directory creation
     - Error handling and edge cases

5. **Distribution**
   - Publish as npm package `conductor-4-all`
   - Support global installation: `npm install -g conductor-4-all` or `pnpm add -g conductor-4-all`
   - Support local development: Clone and run with `pnpm start` or `node js/dist/index.js`
   - Single entry point: `conductor` command (after global install)

## Non-Functional Requirements

### 1. Compatibility
- Must produce identical output as Rust version for the same inputs
- Support same platforms: Linux, macOS, Windows
- Node.js version support: LTS versions (18.x, 20.x, 22.x)

### 2. Performance
- CLI execution time: <500ms for install command
- Binary size: Reasonable npm package size (<5MB after bundling)

### 3. Error Handling
- Follow strict exit code standards (0 for success, non-zero for failure)
- Clear, user-friendly error messages
- Proper validation of inputs and project state

### 4. Code Quality
- TypeScript strict mode enabled
- All code properly typed (no `any` types)
- Clear code organization and documentation
- Follow Node.js conventions and best practices

### 5. Idempotency
- The `install` command must be idempotent
- Re-running should detect existing Conductor setup and skip or update appropriately
- No data loss or corruption from repeated installations

### 6. Documentation
- Inline code comments for complex logic
- README in `js/` folder with Node.js-specific setup instructions
- Updated main README to reference both Rust and Node.js versions

## Acceptance Criteria

1. **Installation Success**
   - [ ] CLI can be installed globally via npm/pnpm
   - [ ] `conductor install` command works correctly
   - [ ] User can select agent via interactive prompts
   - [ ] Conductor directory structure is created in target project
   - [ ] Agent-specific command files are installed correctly

2. **Template Processing**
   - [ ] Templates are bundled with npm package
   - [ ] Variables are correctly substituted based on agent selection
   - [ ] All template files are copied to correct locations

3. **Build and Distribution**
   - [ ] `tsup` builds TypeScript code to `js/dist/`
   - [ ] npm package can be published and installed
   - [ ] Local development works via `pnpm start`
   - [ ] Both global and local execution produce identical results

4. **Testing**
   - [ ] All tests pass (Vitest)
   - [ ] Code coverage exceeds 80%
   - [ ] Watch mode is disabled in test configuration
   - [ ] Tests cover critical paths and edge cases

5. **Compatibility**
   - [ ] Works on Linux, macOS, and Windows
   - [ ] Compatible with Node.js LTS versions (18.x, 20.x, 22.x)
   - [ ] Output matches Rust version for same inputs

6. **Documentation**
   - [ ] `js/` folder has its own `package.json`
   - [ ] Node.js-specific README exists
   - [ ] Main README updated to reference TypeScript version
   - [ ] Code is well-documented with comments

## Out of Scope

1. **Implementation of Agent Commands**
   - The `/conductor:setup`, `/conductor:newTrack`, `/conductor:implement`, and `/conductor:status` commands are NOT implemented as executable code
   - These are installed as documentation/prompt files for AI agents to interpret
   - The actual execution of these commands is handled by AI agents, not the CLI tool

2. **Migration Tools**
   - No automatic migration from Rust to Node.js version
   - Projects already using Rust version must continue using it or manually switch

3. **Advanced Features**
   - No automatic updates or version management (handled by npm)
   - No plugin system or extensibility beyond existing Conductor methodology
   - No GUI or web interface (CLI-only)

4. **Rust Version Maintenance**
   - This track does not modify or deprecate the existing Rust implementation
   - Both versions coexist as separate distribution channels

## Technical Decisions

1. **Template Bundling Strategy**
   - Templates stored as static files in `js/templates/`
   - Copied during npm build process to be included in distribution
   - Accessed at runtime using Node.js `fs` module
   - Alternative: Could embed as base64 strings if file access proves problematic

2. **Build Tool Selection**
   - `tsup` chosen for simplicity and CLI-specific optimizations
   - Alternative considered: `tsc` with custom scripts (rejected for complexity)
   - Alternative considered: `esbuild` (rejected for TypeScript-native support)

3. **Testing Framework**
   - `Vitest` chosen for TypeScript-native support and performance
   - Configured to avoid watch mode (use `CI=true` or explicit configuration)
   - Alternative considered: `Jest` (rejected for slower performance in monorepo contexts)

4. **Project Organization**
   - All Node.js code isolated in `js/` folder to avoid conflict with Rust code
   - Separate `package.json` for Node.js-specific dependencies
   - Root `package.json` remains for Rust project management (if needed)
