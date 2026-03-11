import { SkillsTarget } from '../types.js';
import { SkillsGenerator } from './types.js';
import { GeneralSkillsGenerator } from './general/index.js';
import { ClaudeCodeSkillsGenerator } from './claude-code/index.js';

export function getSkillsGenerator(target: SkillsTarget): SkillsGenerator {
  switch (target) {
    case 'general':
      return new GeneralSkillsGenerator();
    case 'claude-code':
      return new ClaudeCodeSkillsGenerator();
    default:
      throw new Error(`Unsupported skills target: ${target}`);
  }
}
