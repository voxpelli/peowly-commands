import type { Package as NormalizedPackageJson } from 'normalize-package-data';

import type {
  AnyFlags,
  ExtendedParseArgsConfig,
  HelpListBasicItem,
  PeowlyMeta,
  PackageJsonLike,
} from 'peowly';

export type NormalizedPackageJsonLike = PackageJsonLike & NormalizedPackageJson;

export interface CliMetaOptions {
  cwd?: string;
  importMeta?: ImportMeta;
  name?: string;
}
export interface CliMeta extends PeowlyMeta {
  pkg?: NormalizedPackageJsonLike | undefined;
}

export interface CliAlias extends HelpListBasicItem {
  argv: readonly string[];
}
export type CliAliases = Readonly<Record<string, Readonly<CliAlias>>>;

export type CliCommandRun = (argv: string[], meta: CliMeta, context: {
  parentName: string;
}) => Promise<void> | void;

export interface CliCommand extends HelpListBasicItem {
  run: CliCommandRun;
}
export type CliCommands = Readonly<Record<string, Readonly<CliCommand>>>;

export interface CliOptions<Flags extends AnyFlags> extends CliMetaOptions, Omit<ExtendedParseArgsConfig<Flags>, 'returnRemainderArgs'> {
  aliases?: CliAliases;
  args?: string[];
  name?: string;
}
