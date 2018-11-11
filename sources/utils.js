/* @flow */

import fs from "fs";
import Future from "fluture";
import {
	always,
	assocPath,
	ifElse,
	reduce,
	over,
	lensPath,
	pipe,
	split,
	union,
	sort,
	join,
	map,
	trim,
} from "ramda";
import { hasPath } from "ramda-adjunct";
import { fileExists, readFile } from "@eric.dahlseng/cli-tools";
import writePkgPromise from "write-pkg";

export const ifTrueElse = ifElse(x => x === true);

export const readUtf8File = (path: string) => readFile(path, "utf8");
export const writeFile = Future.encaseN3(fs.writeFile);
export const writeUtf8FileToPath = (contents: string) => (path: string) =>
	writeFile(path, contents, "utf8");
export const jsonParse = Future.encase(JSON.parse);
export const writePkg = Future.encaseP3(writePkgPromise);

export const futureSequential = reduce(
	(acc, nextFuture) => acc.chain(() => nextFuture),
	Future.of(),
);

export const deDuplicate = <A: *>(xs: Array<A>): Array<A> =>
	Array.from(new Set(xs));

export const addNpmScript = ({
	packageJsonPath,
	name,
	content,
}: {
	packageJsonPath: string,
	name: string,
	content: string,
}) =>
	readUtf8File(packageJsonPath)
		.chain(jsonParse)
		.chain(
			ifElse(hasPath(["scripts", name]), always(Future.of()), packageJson =>
				writePkg(
					packageJsonPath,
					assocPath(["scripts", name], content)(packageJson),
					{},
				),
			),
		);

const localeCompare = (a, b) => a.localeCompare(b);

const addLintStep = step =>
	pipe(
		split(";"),
		map(trim),
		union([trim(step)]),
		sort(localeCompare),
		join("; "),
	);

export const addNpmLintStep = ({
	packageJsonPath,
	step,
}: {
	packageJsonPath: string,
	step: string,
}) =>
	readUtf8File(packageJsonPath)
		.chain(jsonParse)
		.map(
			ifElse(
				hasPath(["scripts", "lint"]),
				over(lensPath(["scripts", "lint"]))(addLintStep(step)),
				assocPath(["scripts", "lint"])(step),
			),
		)
		.chain(packageJson => writePkg(packageJsonPath, packageJson, {}));

export const setupConfigurationFile = ({
	configuration,
	filePath,
}: {
	configuration: string,
	filePath: string,
}) =>
	fileExists(filePath).chain(
		ifTrueElse(
			always(Future.of()),
			always(writeUtf8FileToPath(configuration)(filePath)),
		),
	);
