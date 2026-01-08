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
    // This assertion should fail initially
    expect(opencodeChoice.description).toBe('VS Code-based assistant');
  });
});
