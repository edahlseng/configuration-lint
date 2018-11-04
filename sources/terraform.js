/* @flow */

import path from "path";

import { addNpmScript } from "./utils.js";

const setupTerraform = (projectRootDirectory: string) =>
	addNpmScript({
		packageJsonPath: path.resolve(projectRootDirectory, "./package.json"),
		name: "lint:tf",
		content: "terraform fmt -check=true",
	});

export default setupTerraform;
