import select from '@inquirer/select';
import { AgentType } from '../types.js';

export async function promptForAgent(): Promise<AgentType> {
  const answer = await select<AgentType>({
    message: 'Select your coding agent:',
    choices: [
      {
        name: 'OpenCode',
        value: 'opencode',
        description: 'Gemini-based coding assistant',
      },
      {
        name: 'Claude Code',
        value: 'claude-code',
        description: 'Anthropic-based coding assistant',
      },
    ],
    default: 'opencode',
  });
  
  return answer;
}
