# Changelog

## [2.0.0](https://github.com/voxpelli/peowly-commands/compare/v1.1.0...v2.0.0) (2026-08-04)


### ⚠ BREAKING CHANGES

* Calling `peowlyCommands()` with no command now throws `PeowlyCommandOmittedError` by default instead of showing help; set `options.showHelpOnNoCommand: true` to restore the previous behavior.

### 🌟 Features

* require node &gt;=22, peowly 2.x, add showHelpOnNoCommand ([#31](https://github.com/voxpelli/peowly-commands/issues/31)) ([06f2556](https://github.com/voxpelli/peowly-commands/commit/06f2556d89331c6f13ca88cb2cfec7c40900d824))


### 📚 Documentation

* improve example `InputError` ([bceecef](https://github.com/voxpelli/peowly-commands/commit/bceecef2632db73d3b47a4f3eb7043df52d0ee21))
* improve example to match list-dependents-cli ([6178a93](https://github.com/voxpelli/peowly-commands/commit/6178a938f472a85813ad30316b26f79529540ac2))


### 🧹 Chores

* add context7.json with URL and public key ([d710a13](https://github.com/voxpelli/peowly-commands/commit/d710a13c8c8dd60a5cc347d27304d4d79ff4f654))
* **deps:** align `normalize-package-data` with `read-package-up` ([009d48a](https://github.com/voxpelli/peowly-commands/commit/009d48a24832c57fa80e8a3dcd47ed47d187f602))
* **deps:** update dependencies ([6d619cb](https://github.com/voxpelli/peowly-commands/commit/6d619cb04bbb7bc5f89ea606b698d62ef55b4072))
* **deps:** update dependency @voxpelli/eslint-config to v22 ([#22](https://github.com/voxpelli/peowly-commands/issues/22)) ([e4374fa](https://github.com/voxpelli/peowly-commands/commit/e4374fa3466d32548dfffd36ed8c491996f885e2))
* **deps:** update dependency @voxpelli/tsconfig to v13 ([#14](https://github.com/voxpelli/peowly-commands/issues/14)) ([d437cae](https://github.com/voxpelli/peowly-commands/commit/d437caeb72689e5de54b6e340c06bc9de1ba6b6b))
* **deps:** update dependency installed-check to ^9.3.0 ([#3](https://github.com/voxpelli/peowly-commands/issues/3)) ([0caa74a](https://github.com/voxpelli/peowly-commands/commit/0caa74a82a0c0978c6ed349e6f1a5d9aaee84c3c))
* **deps:** update dependency markdown-or-chalk to ^0.2.1 ([#12](https://github.com/voxpelli/peowly-commands/issues/12)) ([9579b8a](https://github.com/voxpelli/peowly-commands/commit/9579b8a72003792b9bfb78bf98b7bb56c624f020))
* **deps:** update dependency pony-cause to ^2.1.11 ([#2](https://github.com/voxpelli/peowly-commands/issues/2)) ([8fbde6f](https://github.com/voxpelli/peowly-commands/commit/8fbde6fe1178ac6a863e9c685fbe1d58d9549512))
* **deps:** update dependency validate-conventional-commit to ^1.0.4 ([#13](https://github.com/voxpelli/peowly-commands/issues/13)) ([0abbe48](https://github.com/voxpelli/peowly-commands/commit/0abbe4890c90aa640cb263a1f559169de0cbc89c))
* **deps:** update dev dependencies ([8a5ba2d](https://github.com/voxpelli/peowly-commands/commit/8a5ba2d33eb7a44c94e23af349269b5e1ccc03fe))
* **deps:** update ora ([afea7a8](https://github.com/voxpelli/peowly-commands/commit/afea7a89022d98627d2b1070b34b302a27282305))
* **deps:** update read-package-up to v12.0.0 ([f753332](https://github.com/voxpelli/peowly-commands/commit/f753332a6cc943e997e30da98082155840859e97))
* **deps:** update type dependencies ([#4](https://github.com/voxpelli/peowly-commands/issues/4)) ([bcfc0e4](https://github.com/voxpelli/peowly-commands/commit/bcfc0e47b2d114d777cf020974fbdeac4f5767c1))
* **example:** use `markdown-or-chalk` 0.3.x ([#35](https://github.com/voxpelli/peowly-commands/issues/35)) ([7491e16](https://github.com/voxpelli/peowly-commands/commit/7491e16f575774a5016ead7833126ce72953ad1a))

## [1.1.0](https://github.com/voxpelli/peowly-commands/compare/v1.0.1...v1.1.0) (2024-06-20)


### 🌟 Features

* throw on missing command ([eecfed8](https://github.com/voxpelli/peowly-commands/commit/eecfed8e493ece87d0487c27ca5dfb55c6340f88))


### 🩹 Fixes

* use latest version of `peowly` ([cfe3e8b](https://github.com/voxpelli/peowly-commands/commit/cfe3e8b7cda8c3a786f8bd9a1a6f013477f5d943))


### 🧹 Chores

* fix linting error ([f274443](https://github.com/voxpelli/peowly-commands/commit/f2744437e247f8aee9002464c359b302d0fa7540))
* update dev dependencies ([d8eade5](https://github.com/voxpelli/peowly-commands/commit/d8eade5b4a08b84ca214affb27fc11f72bf51930))
* use neostandard based linting ([3883f55](https://github.com/voxpelli/peowly-commands/commit/3883f55c0c3db3d78c07a42b7990e7403eb87257))
