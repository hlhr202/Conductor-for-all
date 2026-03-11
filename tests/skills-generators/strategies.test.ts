import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeneralSkillsGenerator } from '../../src/skills-generators/general/index.js';
import { ClaudeCodeSkillsGenerator } from '../../src/skills-generators/claude-code/index.js';
import * as templateUtils from '../../src/utils/template.js';
import fs from 'fs-extra';
import { join } from 'path';

vi.mock('../../src/utils/template.js', () => ({
  loadTemplate: vi.fn(),
  substituteVariables: vi.fn((content) => content),
  getTemplateRoot: vi.fn().mockResolvedValue('/mock/templates')
}));

vi.mock('fs-extra');

describe('Skills Generators Strategies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(templateUtils.loadTemplate).mockResolvedValue(`
description = "Mock description"
prompt = "Mock prompt with __$$CODE_AGENT_INSTALL_PATH$$__"
    `);
  });

  it('should write General Coding Agent skills to .agents/skills/', async () => {
    const generator = new GeneralSkillsGenerator();
    await generator.generate('/mock/target');
    
    expect(fs.ensureDir).toHaveBeenCalledWith(join('/mock/target', '.agents', 'skills', 'conductor-setup'));
    expect(fs.writeFile).toHaveBeenCalledWith(
      join('/mock/target', '.agents', 'skills', 'conductor-setup', 'SKILL.md'),
      expect.stringContaining('Mock prompt with .agents')
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      join('/mock/target', '.agents', 'skills', 'conductor-setup', 'SKILL.md'),
      expect.stringContaining('Mock prompt with .agents/skills/conductor-setup')
    );
  });

  it('should write Claude Code skills to .claude/skills/', async () => {
    const generator = new ClaudeCodeSkillsGenerator();
    await generator.generate('/mock/target');
    
    expect(fs.ensureDir).toHaveBeenCalledWith(join('/mock/target', '.claude', 'skills', 'conductor-setup'));
    expect(fs.writeFile).toHaveBeenCalledWith(
      join('/mock/target', '.claude', 'skills', 'conductor-setup', 'SKILL.md'),
      expect.stringContaining('Mock prompt with .claude')
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      join('/mock/target', '.claude', 'skills', 'conductor-setup', 'SKILL.md'),
      expect.stringContaining('Mock prompt with .claude/skills/conductor-setup')
    );
  });
});
