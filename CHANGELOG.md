# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.4.2"></a>
## [0.4.2](https://github.com/edahlseng/configuration-lint/compare/v0.4.1...v0.4.2) (2019-05-21)


### Bug Fixes

* Add missing data path and correct content for lint-report scripts ([fd1ba8e](https://github.com/edahlseng/configuration-lint/commit/fd1ba8e))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/edahlseng/configuration-lint/compare/v0.4.0...v0.4.1) (2019-05-20)


### Bug Fixes

* Correct the bin file path and add a main file path ([3c25973](https://github.com/edahlseng/configuration-lint/commit/3c25973))



<a name="0.4.0"></a>
## [0.4.0](https://github.com/edahlseng/configuration-lint/compare/v0.3.0...v0.4.0) (2019-05-06)

* Switch to a more declarative set of configuration options ([59224f0](https://github.com/edahlseng/configuration-lint/commit/59224f0))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/edahlseng/configuration-lint/compare/v0.2.0...v0.3.0) (2018-11-17)


### Bug Fixes

* Include commitlintrc.json in NPM package ([cc5d5aa](https://github.com/edahlseng/configuration-lint/commit/cc5d5aa))
* Prevent npm run scripts from being overridden ([90aa15d](https://github.com/edahlseng/configuration-lint/commit/90aa15d))
* Remove commitlint --from argument ([9215838](https://github.com/edahlseng/configuration-lint/commit/9215838))
* Remove package-lock.json ([47f09c3](https://github.com/edahlseng/configuration-lint/commit/47f09c3))
* Save commitlint dependencies as production dependencies ([e761152](https://github.com/edahlseng/configuration-lint/commit/e761152))


### Features

* Add ability to add lint steps to `npm run lint` on setup ([c904d32](https://github.com/edahlseng/configuration-lint/commit/c904d32))
* Add lint-report:commit ([71afb04](https://github.com/edahlseng/configuration-lint/commit/71afb04))
* Add lint-report:json ([ea18f52](https://github.com/edahlseng/configuration-lint/commit/ea18f52))
* Add yaml ([12f5f89](https://github.com/edahlseng/configuration-lint/commit/12f5f89))
* Change Prettier `trailingComma` option to `all` ([e678f2b](https://github.com/edahlseng/configuration-lint/commit/e678f2b))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/edahlseng/configuration-lint/compare/v0.1.2...v0.2.0) (2018-11-04)


### Features

* Add commitlint ([17d9ed1](https://github.com/edahlseng/configuration-lint/commit/17d9ed1))
* Add setup option for Terraform ([4fc5b5f](https://github.com/edahlseng/configuration-lint/commit/4fc5b5f))
* Add setup script ([50755d7](https://github.com/edahlseng/configuration-lint/commit/50755d7))

<a name="0.1.2"></a>
# [0.1.2](https://github.com/edahlseng/configuration-lint/compare/v0.1.1...v0.1.2) (2018-07-20)

* Explicitly set "flowtype/space-after-type-colon" ESLint rule in order to turn on the "allowLineBreak" setting (otherwise the rule conflicts with Prettier)

<a name="0.1.1"></a>
# [0.1.1](https://github.com/edahlseng/configuration-lint/compare/v0.1.0...v0.1.1) (2018-07-19)

* Added eslint-plugin-flowtype and associated flowtype ESLint rules
* Added Prettier overrides for `package(-lock).json` files
* Added a self linting step
* Added arrow-body-style ESLint rule

<a name="0.1.0"></a>
# 0.1.0 (2018-07-14)

* Initial release
