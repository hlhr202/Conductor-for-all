import { InstallScope } from '../types.js';

export interface ContentStrategyOptions {
  installPath: string;
  agentType: string;
  fixedAgent?: string;
  commandName?: string;
}

export interface ContentStrategy {
  process(templateContent: string, options: ContentStrategyOptions): string | null;
}

export interface FileStrategyOptions {
  targetDir: string;
  agentDir: string;
  commandsDir: string;
  commandName: string;
  extension: string;
  content: string;
}

export interface FileStrategy {
  write(options: FileStrategyOptions): Promise<void>;
}

export interface AgentGeneratorStrategy {
  content?: ContentStrategy;
  file?: FileStrategy;
}

export interface AgentGenerator {
  /**
   * Validates the target directory for installation.
   * Checks if critical files or directories already exist to prevent overwriting.
   * Returns the target directory path if valid, or throws an error.
   * @param targetDir The directory to validate
   * @param scope The installation scope (global or project)
   */
  validate(targetDir: string, scope?: InstallScope): Promise<string>;

  /**
   * Generates the agent-specific configuration and commands.
   * Creates directories, copies templates, and processes configuration files.
   * @param targetDir The directory where the agent configuration should be generated
   * @param scope The installation scope (global or project)
   */
  generate(targetDir: string, scope?: InstallScope): Promise<void>;
}

/**
 * Configuration for an agent type defining directory structure and naming conventions.
 */
export interface AgentConfig {
  /** The agent type identifier (e.g., 'opencode', 'claude-code', 'cursor') */
  agentType: string;
  /** The root directory for agent files (e.g., '.opencode', '.claude', '.cursor') */
  agentDir: string;
  /** The subdirectory for command files (e.g., 'commands', 'workflows') */
  commandsDir: string;
  /** Human-readable display name for error messages and logs */
  displayName: string;
  /** Optional file extension for command files (e.g., '.prompt.md', defaults to '.md') */
  extension?: string;
  /** If set, the frontmatter will use this fixed agent value and omit model/tools */
  fixedAgent?: string;
  /** Optional strategy to override default content processing or file writing */
  strategy?: AgentGeneratorStrategy;
  /** Optional filename for the Universal File Resolution Protocol (e.g., 'GEMINI.md', 'CLAUDE.md') */
  protocolFilename?: string;
}
