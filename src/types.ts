export type AgentType = 'opencode' | 'claude-code' | 'antigravity' | 'cursor' | 'vscode-copilot' | 'codex' | 'windsurf' | 'cline' | 'gemini';

export type PromptAgentType = Exclude<AgentType, 'antigravity'>;

export type InstallScope = 'global' | 'project';

export type InstallMode = 'prompt' | 'skills';

export type SkillsTarget = 'general' | 'claude-code';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
