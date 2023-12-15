import { meowWithSubcommands } from '../../../../index.js';

import { one } from './one.js';
import { two } from './two.js';

const description = 'Command with its own subcommands';

/** @type {import('../../../../index.js').CliSubcommand} */
export const multi = {
  description,
  run: async (argv, importMeta, { parentName }) => {
    await meowWithSubcommands(
      {
        one,
        two,
      },
      {
        argv,
        description,
        importMeta,
        name: parentName + ' multi',
      }
    );
  },
};
