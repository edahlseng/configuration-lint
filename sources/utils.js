/* @flow */

import fs from "fs";
import Future from "fluture";
import { always, assocPath, has, ifElse, reduce } from "ramda";
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
	Future.of()
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
			ifElse(has(name), always(Future.of()), packageJson =>
				writePkg(
					packageJsonPath,
					assocPath(["scripts", name], content)(packageJson),
					{}
				)
			)
		);

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
			always(writeUtf8FileToPath(configuration)(filePath))
		)
	);
