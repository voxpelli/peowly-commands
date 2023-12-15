import { meowWithSubcommands } from '../../index.js';

await meowWithSubcommands(
  {
    foo: {
      description: 'Do something very foo-like',
      async run (_argv, _importMeta, { parentName: _ }) {
        // Do whatever you like, eg. initiate a new meow or meow-with-subcommands
      },
    },
  },
  {
    aliases: {
      fs: {
        description: 'Alias for "foo --strict"',
        argv: ['foo', '--strict'],
      },
    },
    argv: process.argv.slice(2),
    name: 'name-of-cli',
    importMeta: import.meta,
  }
);
