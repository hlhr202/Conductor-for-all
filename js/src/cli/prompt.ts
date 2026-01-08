import inquirer from 'inquirer';
import { AgentType } from '../types.js';

export async function promptForAgent(): Promise<AgentType> {
  const answer = await inquirer.prompt<{ agent: AgentType }>([
    {
      type: 'list',
      name: 'agent',
      message: 'Select the coding agent you are using:',
      choices: [
        { name: 'OpenCode', value: 'opencode' },
        { name: 'Claude Code', value: 'claude-code' },
      ],
    },
  ]);
  
  return answer.agent;
}
