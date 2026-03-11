
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { promptForAgent, promptForInstallMode, promptForSkillsTarget } from '../src/cli/prompt.js';
import select from '@inquirer/select';

// Mock the @inquirer/select module
vi.mock('@inquirer/select', () => ({
  default: vi.fn(),
}));

describe('CLI Prompts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should prompt for install mode with correct choices', async () => {
    vi.mocked(select).mockResolvedValue('skills');

    const result = await promptForInstallMode();

    expect(result).toBe('skills');
    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;
    
    expect(choices).toHaveLength(2);
    expect(choices.find(c => c.value === 'prompt')?.name).toBe('Slash Custom Prompts (Commands)');
    expect(choices.find(c => c.value === 'skills')?.name).toBe('Skills');
  });

  it('should prompt for skills target with correct choices', async () => {
    vi.mocked(select).mockResolvedValue('general');

    const result = await promptForSkillsTarget();

    expect(result).toBe('general');
    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;
    
    expect(choices).toHaveLength(2);
    expect(choices.find(c => c.value === 'general')?.name).toBe('General Coding Agent');
    expect(choices.find(c => c.value === 'claude-code')?.name).toBe('Claude Code');
  });

  it('should include Antigravity in options', async () => {
    vi.mocked(select).mockResolvedValue('antigravity');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const antigravityChoice = choices.find(c => c.value === 'antigravity');
    expect(antigravityChoice).toBeDefined();
    expect(antigravityChoice?.name).toBe('Antigravity');
  });

  it('should include Windsurf in options', async () => {
    vi.mocked(select).mockResolvedValue('windsurf');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const windsurfChoice = choices.find(c => c.value === 'windsurf');
    expect(windsurfChoice).toBeDefined();
    expect(windsurfChoice?.name).toBe('Windsurf');
  });

  it('should include Cline in options', async () => {
    vi.mocked(select).mockResolvedValue('cline');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const clineChoice = choices.find(c => c.value === 'cline');
    expect(clineChoice).toBeDefined();
    expect(clineChoice?.name).toBe('Cline');
  });

  it('should include Gemini CLI in options', async () => {
    vi.mocked(select).mockResolvedValue('gemini');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const geminiChoice = choices.find(c => c.value === 'gemini');
    expect(geminiChoice).toBeDefined();
    expect(geminiChoice?.name).toBe('Gemini CLI');
  });
});
