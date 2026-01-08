import { describe, it, expect, vi } from 'vitest';
import { promptForAgent } from '../src/cli/prompt.js';
import select from '@inquirer/select';

vi.mock('@inquirer/select');

describe('Agent Selection Prompt', () => {
  it('should have correct description for OpenCode', async () => {
    // We want to verify the arguments passed to select
    // We mock the return value so the function completes
    vi.mocked(select).mockResolvedValue('opencode' as any);

    await promptForAgent();

    // Verify calls
    expect(select).toHaveBeenCalled();
    const callArgs = vi.mocked(select).mock.calls[0][0];
    
    // Check choices
    const choices = (callArgs as any).choices;
    
    const opencodeChoice = choices.find((c: any) => c.value === 'opencode');
    expect(opencodeChoice).toBeDefined();
    expect(opencodeChoice.description).toBe('The open source AI coding agent');

    const claudeChoice = choices.find((c: any) => c.value === 'claude-code');
    expect(claudeChoice).toBeDefined();
    expect(claudeChoice.description).toBe("Anthropic's coding assistant");

    const antigravityChoice = choices.find((c: any) => c.value === 'antigravity');
    expect(antigravityChoice).toBeDefined();
    expect(antigravityChoice.description).toBe("Google's agentic coding assistant");
  });
});
