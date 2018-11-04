/* @flow */

import path from "path";
import { always } from "ramda";

import { addNpmScript, setupConfigurationFile } from "./utils.js";

const commitlintConfiguration = `{
	"extends": ["./node_modules/@eric.dahlseng/linter-configuration/commitlintrc"]
}
`;

const setupCommit = (projectRootDirectory: string) =>
	setupConfigurationFile({
		configuration: commitlintConfiguration,
		filePath: path.resolve(projectRootDirectory, "./.commitlintrc.json"),
	}).chain(
		always(
			addNpmScript({
				packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
				name: "lint:commit",
				content: "commitlint --from origin/master",
			})
		)
	);

export default setupCommit;
