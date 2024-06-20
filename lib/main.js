import { formatHelpMessage, peowly } from 'peowly';

import { resolveMeta } from './meta.js';

/**
 * @template {import('peowly').AnyFlags} Flags
 * @param {import('./main-types.d.ts').CliCommands} commands
 * @param {import('./main-types.d.ts').CliOptions<Flags>} options
 * @param {import('peowly').PeowlyMeta} [meta]
 * @returns {Promise<void>}
 */
export async function peowlyCommands (commands, options, meta) {
  const resolvedMeta = await resolveMeta(options, meta || {});

  const {
    aliases = {},
    args = process.argv.slice(2),
    cwd: _cwd,
    importMeta: _importMeta,
    name = resolvedMeta.processTitle,
    ...additionalOptions
  } = options;

  if (!name) {
    throw new Error('Could not resolve a name. One is needed for proper help generation');
  }

  let [commandOrAliasName, ...rawCommandArgv] = args;

  if (commandOrAliasName?.startsWith('-')) {
    commandOrAliasName = undefined;
  }

  // If we got at least some args, then lets find out if we can find a command
  if (commandOrAliasName) {
    const alias = aliases[commandOrAliasName];

    // First: Resolve argv data from alias if its an alias that's been given
    const [commandName, ...commandArgv] = alias
      ? [...alias.argv, ...rawCommandArgv]
      : [commandOrAliasName, ...rawCommandArgv];

    // Second: Find a command definition using that data
    const commandDefinition = commandName ? commands[commandName] : undefined;

    // Third: If a valid command has been found, then we run it...
    if (commandDefinition) {
      return await commandDefinition.run(
        commandArgv,
        resolvedMeta,
        {
          parentName: name,
        }
      );
    }
  }

  // ...else we provide basic instructions and help
  const cli = peowly({
    ...additionalOptions,
    ...resolvedMeta,
    args: args.filter(arg => arg === '--help' || arg === '--version'),
    help: formatHelpMessage(name, {
      aliases,
      commands,
      examples: ['--help'],
      usage: '<command>',
    }),
  });

  // If we got an incorrect command name / alias, we throw an error...
  if (commandOrAliasName) {
    throw new PeowlyCommandMissingError(commandOrAliasName, cli.showHelp);
  }

  // ...but at the end of the day we're here to be helpful
  cli.showHelp();
}

export class PeowlyCommandMissingError extends Error {
  /** @override */
  name = 'PeowlyCommandMissingError';

  /**
   * @param {string} commandName
   * @param {(exitCode?: number) => never} showHelp
   */
  constructor (commandName, showHelp) {
    super(`Missing command: ${commandName}`);

    /** @type {string} */
    this.commandName = commandName;
    /** @type {(exitCode?: number) => never} */
    this.showHelp = showHelp;
  }
}
