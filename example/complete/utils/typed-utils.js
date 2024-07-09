// Copied from @voxpelli/typed-utils

/**
 * @param {unknown} value
 * @returns {value is Error & { code: string }}
 */
export function isErrorWithCode (value) {
  return value instanceof Error && 'code' in value;
}
