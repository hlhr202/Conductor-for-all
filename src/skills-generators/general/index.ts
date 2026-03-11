import { join } from 'path';
import { BaseSkillsGenerator } from '../base.js';

export class GeneralSkillsGenerator extends BaseSkillsGenerator {
  protected getSkillsBaseDir(targetDir: string): string {
    return join(targetDir, '.agents', 'skills');
  }

  protected getInstallPath(): string {
    return '.agents';
  }
}
