/**
 * @param {import('./main-types.d.ts').CliMetaOptions} options
 * @returns {Promise<string|undefined>}
 */
async function resolveCwd ({ cwd, importMeta }) {
  if (cwd && importMeta) {
    throw new Error('Expected either options.cwd or options.importMeta, not both');
  }
  if (cwd) {
    return cwd;
  }

  if (importMeta) {
    const [
      path,
      { fileURLToPath },
    ] = await Promise.all([
      // eslint-disable-next-line unicorn/import-style
      import('node:path'),
      import('node:url'),
    ]);

    return path.dirname(fileURLToPath(importMeta.url));
  }
}

/**
 * @param {import('peowly').PackageJsonLike} pkg
 * @returns {Promise<import('./main-types.d.ts').NormalizedPackageJsonLike>}
 */
async function nonMutatingNormalizePackageData (pkg) {
  const { 'default': normalizePackageData } = await import('normalize-package-data');

  const clonedPkg = structuredClone(pkg);

  normalizePackageData(clonedPkg);

  return /** @type {import('./main-types.d.ts').NormalizedPackageJsonLike} */ (clonedPkg);
}

/**
 * @param {import('./main-types.d.ts').CliMetaOptions} options
 * @param {import('peowly').PeowlyMeta} meta
 * @returns {Promise<import('./main-types.d.ts').CliMeta>}
 */
export async function resolveMeta ({ name, ...options }, { pkg, ...meta }) {
  const cwd = await resolveCwd(options);

  /** @type {import('./main-types.d.ts').NormalizedPackageJsonLike|undefined} */
  let resolvedPkg;

  if (cwd) {
    if (pkg) {
      throw new Error('Expected no meta.pkg given when options.cwd / options.importMeta is given');
    }

    const { readPackageUp } = await import('read-package-up');

    const foundPkg = await readPackageUp({ cwd });

    if (!foundPkg) {
      throw new Error('No package.json found, despite options.cwd / options.importMeta being given');
    }

    resolvedPkg = foundPkg.packageJson;
  } else if (pkg) {
    resolvedPkg = await nonMutatingNormalizePackageData(pkg);
  }

  return resolvedPkg
    ? {
        processTitle: name
          ? name.split(' ')[0]
          : (
              Array.isArray(resolvedPkg?.bin)
                ? Object.keys(resolvedPkg?.bin).at(0)
                : resolvedPkg?.name
            ),
        ...meta,
        pkg: resolvedPkg,
      }
    : {
        processTitle: name,
        ...meta,
      };
}
