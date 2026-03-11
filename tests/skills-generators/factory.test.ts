import { describe, it, expect } from 'vitest';
import { getSkillsGenerator } from '../../src/skills-generators/factory.js';
import { GeneralSkillsGenerator } from '../../src/skills-generators/general/index.js';
import { ClaudeCodeSkillsGenerator } from '../../src/skills-generators/claude-code/index.js';
import { antigravityConfig } from '../../src/generators/antigravity/index.js';
import { geminiConfig } from '../../src/generators/gemini/index.js';

describe('Skills Generator Factory', () => {
  it('should resolve a skills generator strategy for General Coding Agent', () => {
    const generator = getSkillsGenerator('general');
    expect(generator).toBeInstanceOf(GeneralSkillsGenerator);
  });

  it('should resolve a skills generator strategy for Claude Code', () => {
    const generator = getSkillsGenerator('claude-code');
    expect(generator).toBeInstanceOf(ClaudeCodeSkillsGenerator);
  });

  it('should pass agent configuration into the selected skills generator', () => {
    const generator = getSkillsGenerator('general', geminiConfig) as GeneralSkillsGenerator & {
      agentConfig?: { protocolFilename?: string };
    };

    expect(generator.agentConfig?.protocolFilename).toBe('GEMINI.md');
  });

  it('should resolve Antigravity to the general skills generator', () => {
    const generator = getSkillsGenerator('antigravity', antigravityConfig);
    expect(generator).toBeInstanceOf(GeneralSkillsGenerator);
  });

  it('should resolve Gemini CLI to the general skills generator', () => {
    const generator = getSkillsGenerator('gemini', geminiConfig);
    expect(generator).toBeInstanceOf(GeneralSkillsGenerator);
  });

  it('should throw an error for unknown target', () => {
    expect(() => getSkillsGenerator('unknown' as any)).toThrow(/Unsupported skills target/);
  });
});
