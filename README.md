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


### Example

Running `npx linter-configuration setup js` will add a `.eslintrc.json` configuration file to the project root, as well as add a `lint:js` NPM run-script to the project's `package.json`.
