Linter Configuration
====================

A collection of configuration files for various linting tools.

Installation
------------

```bash
npm install --save-dev @edahlseng/linter-configuration
```

Usage
-----

After installing, run `npx linter-configuration setup [languages]` to set up configuration for the desired languages.

Available languages:
* `css`
* `javascript` or `js`
* `terraform` or `tf`
* `typescript` or `ts`
* `yaml` or `yml`

In addition to configuration for all of the specified languages, the setup script will add configuration for Prettier, commitlint, and JSON linting.

### Example

Running `npx linter-configuration setup js` will add a `.eslintrc.json` configuration file to the project root, as well as add a `lint:js` NPM run-script to the project's `package.json`. (It will also add a `.prettierrc.js` configuration file, a `.commitlintrc.json` configuration file, a `lint:json` NPM run-script, and a `lint:commit` NPM run-script.)
