/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */

import { trimNewlines } from 'trim-newlines';
import redent from 'redent';

import { defaultFlags, formatFlagList, peowly } from 'peowly';

import { validationFlags } from '../../flags/index.js';
import { InputError } from '../../utils/errors.js';

/** @type {import('../../../../index.js').CliCommand} */
export const one = {
  description: 'A subcommand to a command',
  async run (args, meta, { parentName }) {
    const name = parentName + ' one';

    const input = setupCommand(name, one.description, args, meta);

    if (input) {
      console.log(`Strict mode: ${input.strict}`);
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
 * @param {string[]} args
 * @param {import('../../../../index.js').CliMeta} meta
 * @returns {void|CommandContext}
 */
function setupCommand (name, description, args, meta) {
  const flags = {
    ...validationFlags,
  };

  const cli = peowly({
    ...meta,
    args,
    description,
    help: redent(trimNewlines(`
      Usage
        $ ${name} <name>

      Options
        ${formatFlagList({ ...defaultFlags, ...flags }, 6)}

      Examples
        $ ${name} yay
    `)),
    options: flags,
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
