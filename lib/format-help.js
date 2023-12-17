import { defaultFlags } from './flags.js';
import {
  getHelpListMaxNamePadding,
  printGroupedHelpList,
} from './format-lists.js';

/**
 * @typedef HelpMessageInfo
 * @property {import('./main.js').CliAliases} [aliases]
 * @property {import('./main.js').CliSubcommands} [commands]
 * @property {string[]} [examples]
 * @property {import('./format-lists.js').HelpList} [flags]
 * @property {boolean} [noDefaultFlags]
 * @property {string} [usage]
 */

/**
 * @param {string} name
 * @param {Readonly<HelpMessageInfo>} info
 * @returns {string}
 */
export function formatHelpMessage (name, info = {}) {
  const {
    aliases = {},
    commands = {},
    examples = [],
    flags = {},
    noDefaultFlags = false,
    usage = '',
  } = info;

  const aliasesWithGroups = Object.fromEntries(
    Object.entries(aliases).map(
      ([key, { listGroup, ...value }]) => [key, {
        listGroup: (listGroup ? listGroup + ' ' : '') + 'Aliases',
        ...value,
      }]
    )
  );

  const commandList = { ...aliasesWithGroups, ...commands };
  const flagList = { ...flags, ...(noDefaultFlags ? {} : defaultFlags) };

  const padName = Math.max(
    getHelpListMaxNamePadding(commandList),
    getHelpListMaxNamePadding(flagList, { keyPrefix: '--' })
  );

  /** @type {import('./format-lists.js').HelpListGroupOptions} */
  const listOptions = { fixedPadName: true, padName };

  return `
    Usage
      $ ${name} ${usage}
  ` +
    printGroupedHelpList(commandList, 4, { defaultGroupName: 'Commands', defaultGroupOrderFirst: true, ...listOptions }) +
    printGroupedHelpList(flagList, 4, { defaultGroupName: 'Options', keyPrefix: '--', ...listOptions }) +
    (
      examples.length
        ? '\n' + ''.padEnd(4) + ['Examples', ...examples].join('\n' + ''.padEnd(4 + 2) + `$ ${name} `)
        : ''
    );
}
