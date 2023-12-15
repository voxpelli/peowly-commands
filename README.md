# meow-with-subcommands

Helper for handling subcommands with [meow](https://github.com/sindresorhus/meow)

[![npm version](https://img.shields.io/npm/v/meow-with-subcommands.svg?style=flat)](https://www.npmjs.com/package/meow-with-subcommands)
[![npm downloads](https://img.shields.io/npm/dm/meow-with-subcommands.svg?style=flat)](https://www.npmjs.com/package/meow-with-subcommands)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

## Usage

### Basic

```javascript
import { meowWithSubcommands } from 'meow-with-subcommands';

await meowWithSubcommands(
  {
    foo: {
      description: 'Do something very foo-like',
      async run (argv, importMeta, { parentName }) {
        // Do whatever you like, eg. initiate a new meow or meow-with-subcommands
      }
    }
  },
  {
    aliases: {
      fs: {
        description: 'Alias for "foo --strict"',
        argv: ['foo', '--strict']
      },
    },
    argv: process.argv.slice(2),
    name: 'name-of-cli',
    importMeta: import.meta
  }
)
```

### Complete

See [`example`](./example/)-folder

## API

### `meowWithSubcommands(commands, { [aliases], argv, name, ...meowOptions }) => Promise<void>`

### `prepareFlags`

### `printFlagList`

### `printHelpList`

## Extracted from

* [`SocketDev/socket-cli-js`](https://github.com/SocketDev/socket-cli-js/tree/535a68eb12f46ba20010c1db795a04a7593ec4a5) – I found the pattern I created for this open source CLI to be quite helpful and wanted to reuse it

## See also

* [`meow`](https://github.com/sindresorhus/meow)
