import meow from 'meow';

import { formatHelpMessage } from './format-help.js';

/**
 * @typedef CliAlias
 * @property {string} description
 * @property {string} [listGroup]
 * @property {readonly string[]} argv
 */

/** @typedef {Record<string, CliAlias>} CliAliases */

/**
 * @callback CliSubcommandRun
 * @param {readonly string[]} argv
 * @param {ImportMeta} importMeta
 * @param {{ parentName: string }} context
 * @returns {Promise<void>|void}
 */

/**
 * @typedef CliSubcommand
 * @property {string} description
 * @property {string} [listGroup]
 * @property {CliSubcommandRun} run
 */

/** @typedef {Record<string, CliSubcommand>} CliSubcommands */

/**
 * @template {import('./flags.js').AnyFlags} Flags
 * @typedef {import('meow').Options<Flags> & { aliases?: CliAliases, argv: readonly string[], name: string }} CliOptions
 */

/**
 * @template {import('./flags.js').AnyFlags} Flags
 * @param {CliSubcommands} subcommands
 * @param {CliOptions<Flags>} options
 * @returns {Promise<void>}
 */
export async function meowWithSubcommands (subcommands, options) {
  const {
    aliases = {},
    argv,
    importMeta,
    name,
    ...additionalOptions
  } = options;

  const [commandOrAliasName, ...rawCommandArgv] = argv;

  // If we got at least some args, then lets find out if we can find a command
  if (commandOrAliasName) {
    const alias = aliases[commandOrAliasName];

    // First: Resolve argv data from alias if its an alias that's been given
    const [commandName, ...commandArgv] = alias
      ? [...alias.argv, ...rawCommandArgv]
      : [commandOrAliasName, ...rawCommandArgv];

    // Second: Find a command definition using that data
    const commandDefinition = commandName ? subcommands[commandName] : undefined;

    // Third: If a valid command has been found, then we run it...
    if (commandDefinition) {
      return await commandDefinition.run(
        commandArgv,
        importMeta,
        {
          parentName: name,
        }
      );
    }
  }

  // ...else we provide basic instructions and help
  const cli = meow(formatHelpMessage(name, {
    aliases,
    commands: subcommands,
    examples: ['--help'],
    usage: '<command>',
  }), {
    argv,
    importMeta,
    ...additionalOptions,
  });

  cli.showHelp();
}
