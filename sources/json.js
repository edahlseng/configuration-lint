/* @flow */

import path from "path";
import { always } from "ramda";

import { addNpmScript, addNpmLintStep } from "./utils.js";

const setupPrettier = (projectRootDirectory: string) =>
	addNpmScript({
		packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
		name: "lint:json",
		content: "prettier --config .prettierrc.js --list-different '**/*.json'",
	})
		.chain(
			always(
				addNpmLintStep({
					packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
					step: "npm run lint:json",
				}),
			),
		)
		.chain(
			always(
				addNpmScript({
					packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
					name: "lint-report:json",
					content:
						"mkdir -p ./linting-results/prettier-json && prettier-junit --config .prettierrc.js '**/*.json' > ./linting-results/prettier-json/report.xml",
				}),
			),
		);

export default setupPrettier;
