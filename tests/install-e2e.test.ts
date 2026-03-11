import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { installHandler } from '../src/commands/install.js';
import * as promptModule from '../src/cli/prompt.js';
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

  it('should install successfully in skills mode for General Coding Agent', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('general');

    await installHandler({ path: testDir, _: [], $0: 'conductor' });

    expect(fs.existsSync(join(testDir, '.agents/skills/conductor-setup/SKILL.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, '.agents/skills/conductor-setup/templates/workflow.md'))).toBe(true);
  });

  it('should install successfully in skills mode for Claude Code', async () => {
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('claude-code');

    await installHandler({ path: testDir, _: [], $0: 'conductor' });

    expect(fs.existsSync(join(testDir, '.claude/skills/conductor-setup/SKILL.md'))).toBe(true);
    expect(fs.existsSync(join(testDir, '.claude/skills/conductor-setup/templates/workflow.md'))).toBe(true);
  });
});
