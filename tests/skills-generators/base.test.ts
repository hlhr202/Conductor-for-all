import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseSkillsGenerator } from '../../src/skills-generators/base.js';
import * as templateUtils from '../../src/utils/template.js';
import fs from 'fs-extra';
import { join } from 'path';

vi.mock('../../src/utils/template.js', () => ({
  loadTemplate: vi.fn(),
  substituteVariables: vi.fn((content) => content),
  getTemplateRoot: vi.fn().mockResolvedValue('/mock/templates')
}));

vi.mock('fs-extra');

class TestSkillsGenerator extends BaseSkillsGenerator {
  protected getSkillsBaseDir(targetDir: string): string {
    return join(targetDir, '.test-agent', 'skills');
  }
  
  protected getInstallPath(): string {
    return '.test-agent';
  }
}

describe('BaseSkillsGenerator', () => {
  let generator: TestSkillsGenerator;

  beforeEach(() => {
    vi.clearAllMocks();
    generator = new TestSkillsGenerator();
    
    // Mock TOML content for tests
    vi.mocked(templateUtils.loadTemplate).mockResolvedValue(`
description = "Mock description"
prompt = "Mock prompt with __$$CODE_AGENT_INSTALL_PATH$$__"
    `);
  });

  it('should generate all six Conductor skills', async () => {
    await generator.generate('/mock/target');
    
    const expectedSkills = [
      'conductor-setup',
      'conductor-newTrack',
      'conductor-implement',
      'conductor-status',
      'conductor-revert',
      'conductor-review'
    ];
    
    for (const skill of expectedSkills) {
      expect(fs.ensureDir).toHaveBeenCalledWith(join('/mock/target', '.test-agent', 'skills', skill));
      expect(fs.writeFile).toHaveBeenCalledWith(
        join('/mock/target', '.test-agent', 'skills', skill, 'SKILL.md'),
        expect.any(String)
      );
    }
  });

  it('should generate SKILL.md with correct frontmatter and content', async () => {
    await generator.generate('/mock/target');
    
    const writeCalls = vi.mocked(fs.writeFile).mock.calls;
    expect(writeCalls.length).toBeGreaterThan(0);
    
    const [filePath, content] = writeCalls[0];
    
    expect(content).toContain('---');
    expect(content).toContain('name: conductor-setup');
    expect(content).toContain('description: Mock description');
    expect(content).toContain('Mock prompt with .test-agent');
  });

  it('should copy setup templates for conductor-setup skill', async () => {
    await generator.generate('/mock/target');
    
    // Check that fs.copy was called for the setup template folder
    expect(fs.copy).toHaveBeenCalledWith(
      join('/mock/templates', 'templates'),
      join('/mock/target', '.test-agent', 'skills', 'conductor-setup', 'templates')
    );
  });
});
