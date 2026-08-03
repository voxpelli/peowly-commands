export type {
  CliAlias,
  CliAliases,
  CliCommand,
  CliCommandRun,
  CliCommands,
  CliMeta,
  CliOptions,
  NormalizedPackageJsonLike,
} from './lib/main-types.d.ts';

export {
  PeowlyCommandMissingError,
  PeowlyCommandOmittedError,
  peowlyCommands,
} from './lib/main.js';
