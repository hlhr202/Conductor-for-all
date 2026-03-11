import { join } from 'path';
import { BaseSkillsGenerator } from '../base.js';
import type { AgentConfig } from '../../generators/types.js';

export class GeneralSkillsGenerator extends BaseSkillsGenerator {
  constructor(agentConfig?: Pick<AgentConfig, 'protocolFilename'>) {
    super(agentConfig);
  }

  protected getSkillsBaseDir(targetDir: string): string {
    return join(targetDir, '.agents', 'skills');
  }

  protected getInstallPath(): string {
    return '.agents';
  }
}
