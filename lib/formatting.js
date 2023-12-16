/** @typedef {import('./flags.js').AnyFlag} ListItem */
/** @typedef {Record<string,string|ListItem>} HelpList */

/**
 * @typedef HelpListOptions
 * @property {string} [keyPrefix]
 * @property {number} [padName]
 */

/**
 * @param {HelpList} list
 * @param {number} indent
 * @param {HelpListOptions} options
 * @returns {string}
 */
export function printHelpList (list, indent, options = {}) {
  const {
    keyPrefix = '',
    padName = 18,
  } = options;

  const names = Object.keys(list).sort();

  let result = '';

  for (const name of names) {
    const item = list[name];
    const {
      description = '',
      shortFlag = '',
    } = typeof item === 'object' ? item : { description: item };

    const shortFlagName = shortFlag ? ` -${shortFlag}  ` : '';
    result += ''.padEnd(indent) +
      (keyPrefix + name).padEnd(padName - shortFlagName.length) + shortFlagName +
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
