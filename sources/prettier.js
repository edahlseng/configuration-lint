/* @flow */

import path from "path";

import { setupConfigurationFile } from "./utils.js";

const prettierConfiguration = `module.exports = require('@eric.dahlseng/linter-configuration/prettierrc');\n`;

const setupPrettier = (projectRootDirectory: string) =>
	setupConfigurationFile({
		configuration: prettierConfiguration,
		filePath: path.resolve(projectRootDirectory, "./.prettierrc.js"),
	});

export default setupPrettier;
