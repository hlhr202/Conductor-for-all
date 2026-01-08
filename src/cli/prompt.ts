import select from '@inquirer/select';
import { AgentType } from '../types.js';

export async function promptForAgent(): Promise<AgentType> {
  const answer = await select<AgentType>({
    message: 'Select your coding agent:',
    choices: [
      {
        name: 'OpenCode',
        value: 'opencode',
        description: 'VS Code-based assistant',
      },
      {
        name: 'Claude Code',
        value: 'claude-code',
        description: 'Anthropic-based coding assistant',
      },
      {
        name: 'Antigravity',
        value: 'antigravity',
        description: 'Advanced agentic coding assistant',
      },
    ],
    default: 'opencode',
  });
  
  return answer;
}
