import { describe, it, expect, vi } from 'vitest';
import inquirer from 'inquirer';
import { promptForAgent } from '../src/cli/prompt.js';

vi.mock('inquirer');

describe('CLI Prompts', () => {
  it('should prompt for agent selection', async () => {
    const mockPrompt = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ agent: 'opencode' });
    
    const result = await promptForAgent();
    
    expect(mockPrompt).toHaveBeenCalled();
    expect(result).toBe('opencode');
  });
});
