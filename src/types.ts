export type AgentType = 'opencode' | 'claude-code';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
