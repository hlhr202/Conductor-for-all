import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseSkillsGenerator } from '../../src/skills-generators/base.js';
import * as templateUtils from '../../src/utils/template.js';
import fs from 'fs-extra';
import select from '@inquirer/select';
import { join } from 'path';

vi.mock('../../src/utils/template.js', () => ({
  loadTemplate: vi.fn(),
  substituteVariables: vi.fn((content) => content),
  getTemplateRoot: vi.fn().mockResolvedValue('/mock/templates')
}));

vi.mock('fs-extra');
vi.mock('@inquirer/select', () => ({
  default: vi.fn(),
}));

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
    vi.mocked(fs.existsSync).mockReturnValue(false);
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

  it('should point the setup skill install path to its skill root', async () => {
    vi.mocked(templateUtils.loadTemplate).mockImplementation(async (templatePath: string) => {
      if (templatePath === 'commands/setup.toml') {
        return `
description = "Mock description"
prompt = "Use templates at __$$CODE_AGENT_INSTALL_PATH$$__/templates"
        `;
      }

      return `
description = "Mock description"
prompt = "Mock prompt with __$$CODE_AGENT_INSTALL_PATH$$__"
      `;
    });

    await generator.generate('/mock/target');

    expect(fs.writeFile).toHaveBeenCalledWith(
      join('/mock/target', '.test-agent', 'skills', 'conductor-setup', 'SKILL.md'),
      expect.stringContaining('.test-agent/skills/conductor-setup/templates')
    );
  });

  it('should copy setup templates for conductor-setup skill', async () => {
    await generator.generate('/mock/target');
    
    // Check that fs.copy was called for the setup template folder
    expect(fs.copy).toHaveBeenCalledWith(
      join('/mock/templates', 'templates'),
      join('/mock/target', '.test-agent', 'skills', 'conductor-setup', 'templates')
    );
  });

  it('should copy the configured protocol file into the target root', async () => {
    generator = new TestSkillsGenerator({ protocolFilename: 'GEMINI.md' });
    vi.mocked(fs.existsSync).mockImplementation((path) => path === join('/mock/templates', 'GEMINI.md'));

    await generator.generate('/mock/target');

    expect(fs.copy).toHaveBeenCalledWith(
      join('/mock/templates', 'GEMINI.md'),
      join('/mock/target', 'GEMINI.md')
    );
  });

  it('should prompt before overwriting an existing protocol file', async () => {
    generator = new TestSkillsGenerator({ protocolFilename: 'CLAUDE.md' });
    vi.mocked(fs.existsSync).mockImplementation(
      (path) => path === join('/mock/templates', 'GEMINI.md') || path === join('/mock/target', 'CLAUDE.md')
    );
    vi.mocked(select).mockResolvedValue(true as never);

    await generator.generate('/mock/target');

    expect(select).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('CLAUDE.md'),
    }));
    expect(fs.copy).toHaveBeenCalledWith(
      join('/mock/templates', 'GEMINI.md'),
      join('/mock/target', 'CLAUDE.md')
    );
  });

  it('should skip protocol copying when overwrite is declined', async () => {
    generator = new TestSkillsGenerator({ protocolFilename: 'AGENTS.md' });
    vi.mocked(fs.existsSync).mockImplementation(
      (path) => path === join('/mock/templates', 'GEMINI.md') || path === join('/mock/target', 'AGENTS.md')
    );
    vi.mocked(select).mockResolvedValue(false as never);

    await generator.generate('/mock/target');

    expect(fs.copy).not.toHaveBeenCalledWith(
      join('/mock/templates', 'GEMINI.md'),
      join('/mock/target', 'AGENTS.md')
    );
  });
});
