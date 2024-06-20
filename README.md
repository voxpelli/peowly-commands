<div align="center">
  <img
    src="peowly-commands.svg"
    width="512"
    height="auto"
    alt="peowly-commands"
  />
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/peowly-commands.svg?style=flat)](https://www.npmjs.com/package/peowly-commands)
[![npm downloads](https://img.shields.io/npm/dm/peowly-commands.svg?style=flat)](https://www.npmjs.com/package/peowly-commands)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

</div>

Helper for handling commands with [peowly](https://github.com/voxpelli/peowly)

## Usage

### Basic

<!--
TODO: Include this example using eg: https://unifiedjs.com/explore/package/remark-usage/
-->

```javascript
import { peowlyCommands } from 'peowly-commands';

await peowlyCommands(
  {
    foo: {
      description: 'Do something very foo-like',
      async run (argv, importMeta, { parentName }) {
        // Do whatever you like, eg. initiate a peowly, peowly-commands, meow or something else
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

## peowlyCommands()

```ts
peowlyCommands(commands: CliCommands, options: CliOptions, meta?: PeowlyMeta | undefined): Promise<void>
```

### PeowlyCommandMissingError

Thrown when `peowlyCommands()` is given a command that it can not find. Comes with a `commandName` property and a `showHelp()` function. The latter works like the `showHelp()` of [`peowly`](https://github.com/voxpelli/peowly)

## Similar modules

* [`argsclopts`](https://github.com/bcomnes/argsclopts) – also concerned with helpers around `parseArgs`
* [`meow`](https://github.com/sindresorhus/meow) – the inspiration for `peowly` – and name inspiration (`p` as in `parseArgs`, `eow` as in `meow`, `ly` to avoid being perceived as a typejacking)
* [`meow-with-subcommands`](https://github.com/voxpelli/meow-with-subcommands) – the original version of this module and what evolved into `peowly` and `peowly-commands`
* [`peowly`](https://github.com/voxpelli/peowly) – the parser module that this module builds on

## See also

* [`parseArgs()`](https://nodejs.org/api/util.html#utilparseargsconfig) – the node.js API this module is built around. Available since `v18.3.0` and `v16.17.0`, non-experimental since `v20.0.0`.
