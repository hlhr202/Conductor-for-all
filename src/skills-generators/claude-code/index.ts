import { join } from 'path';
import { BaseSkillsGenerator } from '../base.js';

export class ClaudeCodeSkillsGenerator extends BaseSkillsGenerator {
  protected getSkillsBaseDir(targetDir: string): string {
    return join(targetDir, '.claude', 'skills');
  }

  protected getInstallPath(): string {
    return '.claude';
  }
}
