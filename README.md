Linter Configuration
====================

A collection of configuration files for various linting tools.

Installation
------------

```bash
npm install --save-dev @edahlseng/linter-configuration
```

ESLint Usage
------------

Make the contents of `.eslintrc.js` equal to one of the following:

```javascript
module.exports = require("@eric.dahlseng/linter-configuration/eslintrc");
```

or

```javascript
module.exports = require("@eric.dahlseng/linter-configuration/eslintrc-with-react");
```

Prettier Usage
--------------

Make the contents of `.prettierrc.js` equal to one of the following:

```javascript
module.exports = require("@eric.dahlseng/linter-configuration/prettierrc");
```

Stylelint Usage
---------------

Make the contents of `.stylelintrc.json` equal to:

```json
{
	"extends": "@eric.dahlseng/linter-configuration/stylelintrc"
}
```
