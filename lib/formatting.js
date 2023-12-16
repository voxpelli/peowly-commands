/** @typedef {import('./flags.js').AnyFlag} ListItem */
/** @typedef {Record<string,string|ListItem>} HelpList */

/**
 * @typedef HelpListOptions
 * @property {boolean} [fixedPadName] When set to true, padName will be treated as a fixed rather than minimum padding
 * @property {string} [keyPrefix] A prefix for the name, eg. "--"
 * @property {number} [padName] The minimum padding between names and descriptions
 */

/**
 * @param {string|undefined} shortFlag
 * @returns {string}
 */
function formatShortFlag (shortFlag) {
  return shortFlag ? `  -${shortFlag}` : '';
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
    keyPrefix = '',
    padName = 0,
  } = options;

  const names = Object.keys(list).sort();

  let longestNameWithShortFlag = 0;

  if (!fixedPadName) {
    for (const name of names) {
      const item = list[name];
      const itemKey = keyPrefix + name + (typeof item === 'object' ? formatShortFlag(item.shortFlag) : '');

      if (longestNameWithShortFlag < itemKey.length) {
        longestNameWithShortFlag = itemKey.length;
      }
    }
  }

  const calculatedPadName = Math.max(padName, longestNameWithShortFlag);

  let result = '';

  for (const name of names) {
    const item = list[name];
    const {
      description = '',
      shortFlag = '',
    } = typeof item === 'object' ? item : { description: item };

    const shortFlagName = formatShortFlag(shortFlag);
    result += ''.padEnd(indent) +
      (keyPrefix + name).padEnd(calculatedPadName - shortFlagName.length) + shortFlagName + '  ' +
      description + '\n';
  }

  return result.trim();
}

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListOptions} options
 * @returns {string}
 */
export function printFlagList (list, indent, options = {}) {
  return printHelpList({
    'help': 'Print this help and exits.',
    'version': 'Prints current version and exits.',
    ...list,
  }, indent, { keyPrefix: '--', ...options });
}
