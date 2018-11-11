/* @flow */

import path from "path";
import { always } from "ramda";

import { addNpmScript } from "./utils.js";

const setupYaml = (projectRootDirectory: string) =>
	addNpmScript({
		packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
		name: "lint:yaml",
		content:
			"prettier --config .prettierrc.js --list-different '**/*.yaml' '**/*.yml'",
	}).chain(
		always(
			addNpmScript({
				packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
				name: "lint-report:yaml",
				content:
					"mkdir -p ./linting-results/prettier-yaml && prettier-junit --config .prettierrc.js '**/*.yaml' '**/*.yml' > ./linting-results/prettier-yaml/report.xml",
			})
		)
	);

export default setupYaml;
