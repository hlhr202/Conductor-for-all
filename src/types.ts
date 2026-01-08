export type AgentType = 'opencode' | 'claude-code' | 'antigravity';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
