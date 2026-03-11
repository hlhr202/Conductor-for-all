import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { installHandler } from '../src/commands/install.js';
import * as promptModule from '../src/cli/prompt.js';
import * as templateModule from '../src/utils/template.js';
import fs from 'fs-extra';
import { join } from 'path';

vi.mock('../src/cli/prompt.js');
vi.mock('@inquirer/select', () => ({
  default: vi.fn().mockResolvedValue(true)
}));

describe('Install Command End-to-End', () => {
  const testDir = join(process.cwd(), '.tmp-e2e-test');

  beforeEach(async () => {
    vi.resetAllMocks();
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const templateRoot = join(process.cwd(), 'gemini-conductor-codebase');
    vi.spyOn(templateModule, 'getTemplateRoot').mockResolvedValue(templateRoot);
    vi.spyOn(templateModule, 'loadTemplate').mockImplementation(
      async (templatePath: string) => fs.readFile(join(templateRoot, templatePath), 'utf-8') as Promise<string>
    );
    await fs.emptyDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should install successfully in prompt mode', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('prompt');
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    vi.mocked(promptModule.promptForInstallScope).mockResolvedValue('project');

    await installHandler({ path: testDir, _: [], $0: 'conductor' });

    expect(fs.existsSync(join(testDir, '.opencode/commands/conductor:setup.md'))).toBe(true);
  });

  it('should install successfully in skills mode for General Coding Agents', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('general');

    await installHandler({ path: testDir, _: [], $0: 'conductor' });

    expect(fs.existsSync(join(testDir, '.agents/skills/conductor-setup/SKILL.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, '.agents/skills/conductor-setup/templates/workflow.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, 'AGENTS.md'))).toBe(true);
  });

  it('should install successfully in skills mode for Claude Code', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('claude-code');

    await installHandler({ path: testDir, _: [], $0: 'conductor' });

    expect(fs.existsSync(join(testDir, '.claude/skills/conductor-setup/SKILL.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, '.claude/skills/conductor-setup/templates/workflow.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, 'CLAUDE.md'))).toBe(true);
  });

  it('should keep general skills installs on AGENTS.md even when a gemini agent flag is provided', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('general');

    await installHandler({ path: testDir, agent: 'gemini', _: [], $0: 'conductor' } as any);

    expect(fs.existsSync(join(testDir, '.agents/skills/conductor-setup/SKILL.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, 'AGENTS.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, 'GEMINI.md'))).toBe(false);
  });
});
