import { describe, it, expect } from 'vitest';
import { getSkillsGenerator } from '../../src/skills-generators/factory.js';
import { GeneralSkillsGenerator } from '../../src/skills-generators/general/index.js';
import { ClaudeCodeSkillsGenerator } from '../../src/skills-generators/claude-code/index.js';
import { opencodeConfig } from '../../src/generators/opencode/index.js';

describe('Skills Generator Factory', () => {
  it('should resolve a skills generator strategy for General Coding Agent', () => {
    const generator = getSkillsGenerator('general');
    expect(generator).toBeInstanceOf(GeneralSkillsGenerator);
  });

  it('should resolve a skills generator strategy for Claude Code', () => {
    const generator = getSkillsGenerator('claude-code');
    expect(generator).toBeInstanceOf(ClaudeCodeSkillsGenerator);
  });

  it('should pass the AGENTS protocol into the general skills generator', () => {
    const generator = getSkillsGenerator('general', opencodeConfig) as GeneralSkillsGenerator & {
      agentConfig?: { protocolFilename?: string };
    };

    expect(generator.agentConfig?.protocolFilename).toBe('AGENTS.md');
  });

  it('should throw an error for unknown target', () => {
    expect(() => getSkillsGenerator('unknown' as any)).toThrow(/Unsupported skills target/);
  });
});
