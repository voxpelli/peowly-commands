/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */

import chalk from 'chalk';
import { MarkdownOrChalk } from 'markdown-or-chalk';
import meow from 'meow';
import ora from 'ora';
import { formatHelpMessage } from '../../../../index.js';

import { outputFlags, validationFlags } from '../../flags/index.js';
import { InputError } from '../../utils/errors.js';

/** @type {import('../../../../index.js').CliSubcommand} */
export const single = {
  description: 'A single command',
  async run (argv, importMeta, { parentName }) {
    const name = parentName + ' single';

    const input = setupCommand(name, single.description, argv, importMeta);

    const workResult = input && await doTheWork(input.inputItem, input);

    if (workResult) {
      formatWorkResult(workResult, { name, ...input });
    }
  },
};

// Internal functions

/**
 * @typedef CommandContext
 * @property {string} inputItem
 * @property {boolean} outputJson
 * @property {boolean} outputMarkdown
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
  const flags = /** @satisfies {import('../../../../index.js').AnyFlags} */ ({
    ...outputFlags,
    ...validationFlags,
    input: {
      type: 'string',
      shortFlag: 'i',
      'default': 'index.js',
      description: 'The input to use',
    },
    output: {
      type: 'string',
      'default': 'dist.js',
      description: 'The subtitle to use',
    },
    count: {
      type: 'number',
      shortFlag: 'c',
      'default': 16,
      description: 'The subtitle to use',
    },
    logs: {
      type: 'boolean',
      'default': true,
      description: 'Controls log output',
    },
  });

  const cli = meow(formatHelpMessage(name, {
    examples: ['yay'],
    flags,
    usage: '<name>',
  }), {
    argv,
    description,
    importMeta,
    flags,
  });

  const {
    json: outputJson,
    markdown: outputMarkdown,
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
    outputJson,
    outputMarkdown,
    strict,
  };

  return result;
}

/**
 * @typedef WorkResult
 * @property {string[]} data
 */

/**
 * @param {string} inputName
 * @param {Pick<CommandContext, 'strict'>} context
 * @returns {Promise<void|WorkResult>}
 */
async function doTheWork (inputName, { strict }) {
  // Using "ora" is of course optional
  const spinner = ora(`Looking up data for ${inputName}`).start();

  // Should be an actual async task
  const lookupResult = inputName === 'abc' ? false : await inputName;

  // Handle possible failure in the task...
  if (lookupResult === false) {
    // Using "chalk" is of course optional
    spinner.fail(chalk.white.bgRed('Unexpected work error:') + ' Failed processing input');
    process.exit(1);
  }

  // ...else update the spinner with the result...
  if (lookupResult === 'xyz') {
    spinner.succeed('All good!');
  } else {
    spinner[strict ? 'fail' : 'succeed'](`Found an issue with name: ${lookupResult}`);
  }

  // ...and return it for further processing!
  return {
    data: [lookupResult],
  };
}

/**
 * @param {WorkResult} packageData
 * @param {{ name: string } & CommandContext} context
 * @returns {void}
 */
function formatWorkResult ({ data }, { name, outputJson, outputMarkdown, strict }) {
  if (outputJson) {
    console.log(JSON.stringify(data, undefined, 2));
  } else {
    const format = new MarkdownOrChalk(!!outputMarkdown);
    const url = `https://www.google.com/search?q=${encodeURIComponent(data.join(', '))}`;

    if (data[0] !== 'xyz') {
      console.log('\nName is weird, but proceeding.');
    }
    console.log(
      '\nYou can look that name up here: ' +
      format.hyperlink(`${data.join(', ')}@Google`, url, { fallbackToUrl: true })
    );
    if (!outputMarkdown) {
      console.log(chalk.dim('\nOr rerun', chalk.italic(name), 'using the', chalk.italic('--json'), 'flag to get JSON output'));
    }
  }

  if (strict && data[0] !== 'xyz') {
    process.exit(1);
  }
}
