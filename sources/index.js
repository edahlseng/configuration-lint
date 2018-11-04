#!/usr/bin/env node

/* @flow */

import Future from "fluture";
import {
	always,
	chain,
	concat,
	ifElse,
	map,
	pipe,
	reject,
	slice,
	trim,
} from "ramda";
import { fromCommand } from "@eric.dahlseng/cli-tools";

import { deDuplicate, futureSequential } from "./utils.js";
import setupPrettier from "./prettier.js";
import setupJavascript from "./javascript.js";
import setupCss from "./css.js";
import setupTerraform from "./terraform.js";
import setupCommit from "./commit.js";

const setupMap = {
	css: projectRootDirectory => setupCss(projectRootDirectory),
	javascript: projectRootDirectory => setupJavascript(projectRootDirectory),
	terraform: projectRootDirectory => setupTerraform(projectRootDirectory),
};

const validateSupportedLanguages = languages => {
	const unsupportedLanguages = reject(
		x => Object.keys(setupMap).includes(x),
		languages
	);
	return unsupportedLanguages.length > 0
		? Future.reject(
				`Unsupported language${
					unsupportedLanguages.length > 1 ? "s" : ""
				}: ${unsupportedLanguages}`
		  )
		: Future.of(languages);
};

const languagesWithoutAbbreviations = map(
	language =>
		({
			js: "javascript",
			tf: "terraform",
		}[language] || language)
);

const validatedLanguages = pipe(
	ifElse(
		xs => xs.length < 4,
		always(Future.reject("No languages specified")),
		Future.of
	),
	map(slice(3, Infinity)),
	map(languagesWithoutAbbreviations),
	map(deDuplicate),
	chain(validateSupportedLanguages)
);

const languageSetupFutures = projectRootDirectory =>
	map(language => setupMap[language](projectRootDirectory));

const script = fromCommand("npm prefix", { cwd: process.env.INIT_CWD })
	.map(trim)
	.chain(projectRootDirectory =>
		validatedLanguages(process.argv)
			.map(languageSetupFutures(projectRootDirectory))
			.map(
				concat([
					setupPrettier(projectRootDirectory),
					setupCommit(projectRootDirectory),
				])
			)
	)
	.chain(futureSequential);

script.fork(console.error, always(null)); // eslint-disable-line no-console, no-undef
