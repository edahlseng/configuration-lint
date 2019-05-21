/* @flow */

import Future from "fluture";
import {
	always,
	any,
	applySpec,
	assoc,
	chain,
	concat,
	filter,
	identity,
	ifElse,
	isNil,
	map,
	pipe,
	prop,
	propSatisfies,
	reduce,
	slice,
	toPairs,
	trim,
	values,
} from "ramda";
import { concatAll } from "ramda-adjunct";
import { fromCommand } from "@eric.dahlseng/cli-tools";

import {
	addLintStep,
	assocObject,
	deDuplicate,
	from,
	futureSequential,
	setupConfigurationFile,
	setupJsonData,
} from "./utils.js";

const withoutAlternates = availableOptions => {
	const optionsMapper = reduce(
		(mapper, [optionName, option]) => ({
			...mapper,
			[optionName]: optionName,
			...(option.alternateNames || []).reduce(
				(nameMap, alternateName) => ({
					...nameMap,
					[alternateName]: optionName,
				}),
				{},
			),
		}),
		{},
		toPairs(availableOptions),
	);

	return pipe(
		map(applySpec({ specified: identity, mapped: from(optionsMapper) })),
		ifElse(
			any(propSatisfies(isNil)("mapped")),
			pipe(
				filter(propSatisfies(isNil)("mapped")),
				map(prop("specified")),
				unsupportedOptions =>
					`Unsupported option${
						unsupportedOptions.length > 1 ? "s" : ""
					}: ${unsupportedOptions}`,
				Future.reject,
			),
			pipe(
				map(prop("specified")),
				Future.of,
			),
		),
	);
};

const chosenOptions = options =>
	pipe(
		ifElse(
			xs => xs.length < 4,
			always(Future.reject("No options specified")),
			Future.of,
		),
		map(slice(3, Infinity)),
		chain(withoutAlternates(options)),
		map(deDuplicate),
		map(map(from(options))),
	);

const defaultOptions = {
	css: {
		configurationFiles: [
			{
				path: "./.stylelintrc.json",
				content:
					'{\n\t"extends": ["@eric.dahlseng/configuration-lint/stylelintrc"]\n}',
			},
		],
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:css"],
				content: "stylelint '**/*.js'",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint-report:css"],
				content:
					"mkdir -p ./linting-results/stylelint && stylelint '**/*.js' --custom-formatter './node_modules/stylelint-formatter-relative-junit' > ./linting-results/stylelint/report.xml",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:css"),
			},
		],
	},
	javascript: {
		alternateNames: ["js"],
		configurationFiles: [
			{
				path: "./.eslintrc.json",
				content:
					'{\n\t"extends": ["./node_modules/@eric.dahlseng/configuration-lint/eslintrc.json"]\n}',
			},
		],
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:js"],
				content: "eslint ./",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint-report:js"],
				content:
					"eslint ./ --output-file ./linting-results/eslint/report.xml --format junit",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:js"),
			},
		],
	},
	terraform: {
		alternateNames: ["tf"],
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:tf"],
				content: "terraform fmt -check=true",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:tf"),
			},
		],
	},
	yaml: {
		alternateNames: ["yml"],
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:yaml"],
				content:
					"prettier --config .prettierrc.js --list-different '**/*.yaml' '**/*.yml'",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint-report:yaml"],
				content:
					"mkdir -p ./linting-results/prettier-yaml && prettier-junit --config .prettierrc.js '**/*.yaml' '**/*.yml' > ./linting-results/prettier-yaml/report.xml",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:yaml"),
			},
		],
	},
};

const defaultDefaults = {
	commit: {
		configurationFiles: [
			{
				path: "./.commitlintrc.json",
				content:
					'{\n\t"extends": ["./node_modules/@eric.dahlseng/configuration-lint/commitlintrc"]\n}',
			},
		],
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:commit"],
				content: "commitlint",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint-report:commit"],
				content:
					"mkdir -p ./linting-results/commitlint && commitlint --format commitlint-format-junit > ./linting-results/commitlint/report.xml",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:commit -- --from master"),
			},
		],
	},
	json: {
		jsonData: [
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint:json"],
				content:
					"prettier --config .prettierrc.js --list-different '**/*.json'",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint-report:json"],
				content:
					"mkdir -p ./linting-results/prettier-json && prettier-junit --config .prettierrc.js '**/*.json' > ./linting-results/prettier-json/report.xml",
			},
			{
				filePath: "./package.json",
				dataPath: ["scripts", "lint"],
				modify: addLintStep("npm run lint:json"),
			},
		],
	},
	prettier: {
		configurationFiles: [
			{
				path: "./.prettierrc.js",
				content:
					'module.exports = require("@eric.dahlseng/configuration-lint/prettierrc");\n',
			},
		],
	},
};

const setupOption = ({ configurationFiles = [], jsonData = [] }) =>
	concatAll([
		configurationFiles.map(setupConfigurationFile),
		jsonData.map(setupJsonData),
	]);

export const setup = ({
	options = {},
	defaults = {},
	process,
}: {
	options?: { [string]: {} },
	defaults?: {
		commit?: {},
		json?: {},
		prettier?: {},
	},
	process: { env: { [string]: ?string }, argv: Array<string> },
}) =>
	fromCommand("npm prefix", { cwd: process.env.INIT_CWD })
		.map(trim)
		.chain(projectRootDirectory =>
			chosenOptions(assocObject(options, defaultOptions))(process.argv)
				.map(concat(values(assocObject(defaults, defaultDefaults))))
				.map(map(assoc("projectRootDirectory")(projectRootDirectory)))
				.map(map(setupOption))
				.map(concatAll),
		)
		.chain(futureSequential);
