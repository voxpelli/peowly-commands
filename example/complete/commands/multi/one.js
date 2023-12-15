/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */

import meow from 'meow';
import { printFlagList } from '../../../../index.js';

import { validationFlags } from '../../flags/index.js';
import { InputError } from '../../utils/errors.js';

/** @type {import('../../../../index.js').CliSubcommand} */
export const one = {
  description: 'A subcommand to a command',
  async run (argv, importMeta, { parentName }) {
    const name = parentName + ' one';

    const input = setupCommand(name, one.description, argv, importMeta);

    if (input) {
      console.log(`Got this input: ${input.inputItem}`);

      process.exit(input.strict ? 1 : 0);
    }
  },
};

// Internal functions

/**
 * @typedef CommandContext
 * @property {string} inputItem
 * @property {boolean} strict
 */

/**
 * @param {string} name
 * @param {string} description
 * @param {readonly string[]} argv
 * @param {ImportMeta} importMeta
 * @returns {void|CommandContext}
 */
function setupCommand (name, description, argv, importMeta) {
  const flags = {
    ...validationFlags,
  };

  const cli = meow(`
    Usage
      $ ${name} <name>

    Options
      ${printFlagList(flags, 6)}

    Examples
      $ ${name} yay
  `, {
    argv,
    description,
    importMeta,
    flags,
  });

  const {
    strict,
  } = cli.flags;

  if (cli.input.length > 1) {
    throw new InputError('We have decided to only allow a single input item');
  }

  const [inputItem = ''] = cli.input;

  if (!inputItem) {
    cli.showHelp();
    return;
  }

  /** @type {CommandContext} */
  const result = {
    inputItem,
    strict,
  };

  return result;
}
