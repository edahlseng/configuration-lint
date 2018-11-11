/* @flow */

import path from "path";
import { always } from "ramda";

import { addNpmScript, addNpmLintStep } from "./utils.js";

const setupTerraform = (projectRootDirectory: string) =>
	addNpmScript({
		packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
		name: "lint:tf",
		content: "terraform fmt -check=true",
	}).chain(
		always(
			addNpmLintStep({
				packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
				step: "npm run lint:tf",
			})
		)
	);
export default setupTerraform;
