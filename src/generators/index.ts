import { AgentType, PromptAgentType } from '../types.js';
import { AgentConfig, AgentGenerator } from './types.js';
import { OpenCodeGenerator } from './opencode/index.js';
import { ClaudeCodeGenerator } from './claude-code/index.js';
import { CursorGenerator } from './cursor/index.js';
import { VSCodeCopilotGenerator } from './vscode-copilot/index.js';
import { CodexGenerator } from './codex/index.js';
import { WindsurfGenerator } from './windsurf/index.js';
import { ClineGenerator } from './cline/index.js';
import { GeminiGenerator } from './gemini/index.js';
import { opencodeConfig } from './opencode/config.js';
import { claudeCodeConfig } from './claude-code/config.js';
import { antigravityConfig } from './antigravity/config.js';
import { cursorConfig } from './cursor/config.js';
import { vscodeCopilotConfig } from './vscode-copilot/config.js';
import { codexConfig } from './codex/config.js';
import { windsurfConfig } from './windsurf/config.js';
import { clineConfig } from './cline/config.js';
import { geminiConfig } from './gemini/config.js';

export * from './types.js';
export * from './opencode/index.js';
export * from './claude-code/index.js';
export * from './cursor/index.js';
export * from './vscode-copilot/index.js';
export * from './codex/index.js';
export * from './windsurf/index.js';
export * from './cline/index.js';
export * from './gemini/index.js';

export function getGenerator(agentType: PromptAgentType): AgentGenerator {
  switch (agentType) {
    case 'claude-code':
      return new ClaudeCodeGenerator();
    case 'cursor':
      return new CursorGenerator();
    case 'vscode-copilot':
      return new VSCodeCopilotGenerator();
    case 'codex':
      return new CodexGenerator();
    case 'windsurf':
      return new WindsurfGenerator();
    case 'cline':
      return new ClineGenerator();
    case 'gemini':
      return new GeminiGenerator();
    case 'opencode':
    default:
      return new OpenCodeGenerator();
  }
}

export function getGeneratorConfig(agentType: AgentType): AgentConfig {
  switch (agentType) {
    case 'claude-code':
      return claudeCodeConfig;
    case 'antigravity':
      return antigravityConfig;
    case 'cursor':
      return cursorConfig;
    case 'vscode-copilot':
      return vscodeCopilotConfig;
    case 'codex':
      return codexConfig;
    case 'windsurf':
      return windsurfConfig;
    case 'cline':
      return clineConfig;
    case 'gemini':
      return geminiConfig;
    case 'opencode':
    default:
      return opencodeConfig;
  }
}
