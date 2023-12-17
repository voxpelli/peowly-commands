import { defaultFlags } from './flags.js';
import { groupBy } from './utils.js';

/** @typedef {import('./flags.js').AnyFlag} HelpListItem */
/** @typedef {Record<string,string|HelpListItem>} HelpList */

/**
 * @typedef HelpListOptions
 * @property {boolean} [fixedPadName] When set to true, padName will be treated as a fixed rather than minimum padding
 * @property {string} [keyPrefix] A prefix for the name, eg. "--"
 * @property {number} [padName] The minimum padding between names and descriptions
 * @property {string} [shortFlagPrefix] A prefix for the shortFlag, defaults to "-"
 */

// TODO: Make shortflag keyprefix configurable
/**
 * @param {string} name
 * @param {string|HelpListItem|undefined} item
 * @param {Pick<HelpListOptions, 'keyPrefix'|'padName'|'shortFlagPrefix'>} options
 * @returns {string}
 */
function formatHelpListName (name, item, { keyPrefix = '', padName = 0, shortFlagPrefix = '-' } = {}) {
  if (!item) {
    return '';
  }

  const richItem = typeof item === 'string' ? { description: item } : item;

  if (richItem.type === 'boolean' && richItem.default === true) {
    name = 'no-' + name;
  }

  const formattedShortFlag = richItem.shortFlag ? `  ${shortFlagPrefix}${richItem.shortFlag}` : '';

  return (keyPrefix + name).padEnd(padName - formattedShortFlag.length) + formattedShortFlag;
}

/**
 * @param {HelpList} list
 * @param {Pick<HelpListOptions, 'keyPrefix'>} options
 * @returns {number}
 */
export function getHelpListMaxNamePadding (list, options = {}) {
  let longestLength = 0;

  for (const name in list) {
    const item = list[name];
    const itemName = formatHelpListName(name, item, options);

    if (longestLength < itemName.length) {
      longestLength = itemName.length;
    }
  }

  return longestLength;
}

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListOptions} options
 * @returns {string}
 */
export function printHelpList (list, indent, options = {}) {
  const {
    fixedPadName = false,
    padName = 0,
  } = options;

  const names = Object.keys(list).sort();

  const calculatedPadName = fixedPadName
    ? padName
    : Math.max(padName, getHelpListMaxNamePadding(list, options));

  let result = '';

  for (const name of names) {
    const item = list[name];

    result += ''.padEnd(indent) +
      formatHelpListName(name, item, { ...options, padName: calculatedPadName }) + '  ' +
      (typeof item === 'object' ? item.description : item) + '\n';
  }

  return result.trim();
}

/**
 * @typedef HelpListGroupOptionsExtras
 * @property {boolean} [alignWithinGroups]
 * @property {string} [defaultGroupName]
 * @property {boolean} [defaultGroupOrderFirst]
 * @property {boolean} [noTrim]
 */

/** @typedef {HelpListOptions & HelpListGroupOptionsExtras} HelpListGroupOptions */

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListGroupOptions} options
 * @returns {string}
 */
export function printGroupedHelpList (list, indent, options = {}) {
  const {
    alignWithinGroups = false,
    defaultGroupName = 'Default',
    defaultGroupOrderFirst = false,

    fixedPadName = false,
    padName = 0,

    ...incomingListOptions
  } = options;

  const calculatedPadName = (alignWithinGroups || fixedPadName)
    ? undefined
    : Math.max(padName, getHelpListMaxNamePadding(list, options));

  const defaultGroupSymbol = Symbol('Default group');

  const {
    [defaultGroupSymbol]: defaultGroup,
    ...groups
  } = groupBy(
    Object.entries(list),
    ([, item]) => (typeof item === 'object' && item.listGroup) || defaultGroupSymbol
  );

  const sortedGroupNames = Object.keys(groups).sort();
  const groupNames = defaultGroup
    ? (
        defaultGroupOrderFirst
          ? /** @type {const} */ ([defaultGroupSymbol, ...sortedGroupNames])
          : /** @type {const} */ ([...sortedGroupNames, defaultGroupSymbol])
      )
    : sortedGroupNames;

  /** @type {HelpListOptions} */
  const listOptions = {
    ...incomingListOptions,
    fixedPadName: calculatedPadName === undefined ? fixedPadName : true, // Avoids redoing calculation
    padName: calculatedPadName || padName,
  };
  const flagIndent = indent + 2;

  let result = '';

  for (const groupKey of groupNames) {
    const groupItem = groupKey === defaultGroupSymbol ? defaultGroup : groups[groupKey];
    const groupList = Object.fromEntries(groupItem || []);
    const groupName = groupKey === defaultGroupSymbol ? defaultGroupName : groupKey;

    result += '\n' + ''.padEnd(indent) + groupName + '\n';
    result += ''.padEnd(flagIndent) + printHelpList(groupList, flagIndent, listOptions) + '\n';
  }

  return result;
}

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListOptions} options
 * @returns {string}
 */
export function printFlagList (list, indent, options = {}) {
  return printHelpList({ ...defaultFlags, ...list }, indent, { keyPrefix: '--', ...options });
}

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListOptions & HelpListGroupOptions} options
 * @returns {string}
 */
export function printGroupedFlagList (list, indent, options = {}) {
  return printGroupedHelpList({ ...defaultFlags, ...list }, indent, { defaultGroupName: 'Options', keyPrefix: '--', ...options });
}
