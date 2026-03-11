import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { installHandler } from '../commands/install.js';

export const cli = yargs(hideBin(process.argv))
  .scriptName('conductor')
  .usage('$0 <cmd> [args]')
  .command(
    'install [path]',
    'Install Conductor in the specified directory',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'Directory to install Conductor',
          default: '.',
          type: 'string',
        })
        .option('agent', {
          alias: 'a',
          describe: 'Specify the coding agent',
          type: 'string',
          choices: [
            'opencode', 
            'claude-code', 
            'cursor', 
            'vscode-copilot', 
            'codex',
            'windsurf',
            'cline',
            'gemini'
          ],
        });
    },
    installHandler
  )
  .help();
