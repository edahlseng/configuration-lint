/* @flow */

import path from "path";
import { always } from "ramda";

import {
	addNpmScript,
	setupConfigurationFile,
	addNpmLintStep,
} from "./utils.js";

const eslintConfiguration = `{
	"extends": ["./node_modules/@eric.dahlseng/linter-configuration/eslintrc.json"]
}
`;

const setupJavascript = (projectRootDirectory: string) =>
	setupConfigurationFile({
		configuration: eslintConfiguration,
		filePath: path.resolve(projectRootDirectory, "./.eslintrc.json"),
	})
		.chain(
			always(
				addNpmScript({
					packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
					name: "lint:js",
					content: "eslint ./",
				})
			)
		)
		.chain(
			always(
				addNpmLintStep({
					packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
					step: "npm run lint:js",
				})
			)
		)
		.chain(
			always(
				addNpmScript({
					packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
					name: "lint-report:js",
					content:
						"eslint ./ --output-file ./linting-results/eslint/report.xml --format junit",
				})
			)
		);

export default setupJavascript;
