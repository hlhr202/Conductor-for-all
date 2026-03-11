import { join } from 'path';
import { BaseSkillsGenerator } from '../base.js';
import type { AgentConfig } from '../../generators/types.js';

export class ClaudeCodeSkillsGenerator extends BaseSkillsGenerator {
  constructor(agentConfig?: Pick<AgentConfig, 'protocolFilename'>) {
    super(agentConfig);
  }

  protected getSkillsBaseDir(targetDir: string): string {
    return join(targetDir, '.claude', 'skills');
  }

  protected getInstallPath(): string {
    return '.claude';
  }
}
