import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const cli = yargs(hideBin(process.argv))
  .scriptName('conductor')
  .usage('$0 <cmd> [args]')
  .command(
    'install [path]',
    'Install Conductor in the specified directory',
    (yargs) => {
      return yargs.positional('path', {
        describe: 'Directory to install Conductor',
        default: '.',
        type: 'string',
      });
    },
    (argv) => {
      console.log('Install command called with path:', argv.path);
    }
  )
  .help();
