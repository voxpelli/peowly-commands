export type {
  CliAlias,
  CliAliases,
  CliMeta,
  CliOptions,
  CliCommand,
  CliCommands,
  CliCommandRun,
  NormalizedPackageJsonLike,
} from './lib/main-types.d.ts';

export {
  PeowlyCommandMissingError,
  PeowlyCommandOmittedError,
  peowlyCommands,
} from './lib/main.js';
