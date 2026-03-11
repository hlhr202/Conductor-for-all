import { SkillsTarget } from '../types.js';
import type { AgentConfig } from '../generators/types.js';
import { SkillsGenerator } from './types.js';
import { GeneralSkillsGenerator } from './general/index.js';
import { ClaudeCodeSkillsGenerator } from './claude-code/index.js';

export function getSkillsGenerator(target: SkillsTarget, agentConfig?: Pick<AgentConfig, 'protocolFilename'>): SkillsGenerator {
  switch (target) {
    case 'general':
      return new GeneralSkillsGenerator(agentConfig);
    case 'claude-code':
      return new ClaudeCodeSkillsGenerator(agentConfig);
    default:
      throw new Error(`Unsupported skills target: ${target}`);
  }
}
