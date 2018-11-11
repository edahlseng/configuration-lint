/* @flow */

import path from "path";
import { always } from "ramda";

import { addNpmScript, setupConfigurationFile } from "./utils.js";

const prettierConfiguration = `module.exports = require('@eric.dahlseng/linter-configuration/prettierrc');\n`;

const setupPrettier = (projectRootDirectory: string) =>
	setupConfigurationFile({
		configuration: prettierConfiguration,
		filePath: path.resolve(projectRootDirectory, "./.prettierrc.js"),
	}).chain(
		always(
			addNpmScript({
				packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
				name: "lint:json",
				content:
					"prettier --config .prettierrc.js --list-different '**/*.json'",
			})
		)
	).chain(
		always(
			addNpmScript({
				packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
				name: "lint-report:json",
				content:
					"mkdir -p ./linting-results/prettier-json && prettier-junit --config .prettierrc.js '**/*.json' > ./linting-results/prettier-json/report.xml"
				})
			)
		);

export default setupPrettier;
