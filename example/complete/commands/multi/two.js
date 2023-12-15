/* eslint-disable no-console */

/** @type {import('../../../../index.js').CliSubcommand} */
export const two = {
  description: 'Another subcommand to a command',
  run () {
    console.log('Just a random unimplemented version of a command');
  },
};
