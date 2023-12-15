/* eslint-disable no-console */

import chalk from 'chalk';
import { messageWithCauses, stackWithCauses } from 'pony-cause';

import { meowWithSubcommands } from '../../index.js';

import * as cliCommands from './commands/index.js';
import { InputError } from './utils/errors.js';

try {
  await meowWithSubcommands(
    cliCommands,
    {
      aliases: {
        foo: {
          description: 'Alias for "multi one --strict"',
          argv: ['multi', 'one', '--strict'],
        },
      },
      argv: process.argv.slice(2),
      name: 'name-of-cli',
      importMeta: import.meta,
    }
  );
} catch (err) {
  /** @type {string} */
  let errorTitle;
  /** @type {string} */
  let errorMessage = '';
  /** @type {string|undefined} */
  let errorBody;

  if (err instanceof InputError) {
    errorTitle = 'Invalid input';
    errorMessage = err.message;
    errorBody = err.body;
  } else if (err instanceof Error) {
    errorTitle = 'Unexpected error';
    errorMessage = messageWithCauses(err);
    errorBody = stackWithCauses(err);
  } else {
    errorTitle = 'Unexpected error with no details';
  }

  console.error(`${chalk.white.bgRed(errorTitle + ':')} ${errorMessage}`);
  if (errorBody) {
    console.error('\n' + errorBody);
  }

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
