# Changelog

## 0.0.1

* Initial release

## 0.0.2

* Added `getValuesDedup()` methods

## 0.1.0

* Set versions for mocha & chai dev dependencies
* JSHint included in tests
* Travis integration
* Code tidy
* README

## 0.1.1

First version on NPM

* Revert JSHint options to stricter and ignore line where `__proto__` used

## 0.1.2

* Modified many-to-many test pending acceptance of PR #2474 on Sequelize
* Travis loads sequelize dependency from Github repo master branch not npm
* Tests db user sequelize_test
* Travis uses db user travis

## 0.1.3

* Travis config changed

## 0.1.4

* Modified many-to-many test after acceptance of PR #2474 on Sequelize

## 0.1.5

* Travis dev branch
* Travis initialization speeded up

## 0.2.0

* Locked dependent plugins to 0.2.x versions

## 0.2.1

* Update db library dependencies in line with Sequelize
* Add `namePlural` to models when defined
* Amend travis config file to use `npm install` to install Sequelize's dependencies after getting latest master from git
* Added `editorconfig` file

## 0.2.2

* Add dependency bluebird-extra
* Augment Sequelize.Promise with extra methods from bluebird-extra module

## 0.2.3

* Sequelize dependency listed as git://... explicitly in package.json (to get latest master from github)

## 0.2.4

* Added reverse include method on Sequelize

## 0.2.5

* Bug fix: typo in `reverseIncludes()` function

## 0.2.6

Accidental commit. No changes made.

## 0.2.7

* Bug fix: typo in `reverseIncludes()` function

## 0.2.8

* Updated sequelize dependency to v2.0.0-rc3
* Locked sequelize plugin dependencies to latest versions
* JSHint ignores redefinition of `Promise`

## 0.2.9

* Update sequelize-virtual-fields dependency to v0.2.8

## 0.2.10

* Lock sequelize dependency to 2.0.0-rc3 (errors with rc4)
* Update plugin dependencies

## 0.2.11

* Update and lock plugin dependencies

## 0.2.12

* Update sequelize-hierarchy dependency to v0.2.7

## 0.2.13

* Sequelize.getValues() handles objects
* Remove all trailing whitespace
* Travis runs on new container infrastructure

## 0.3.0

* Move `getValues()` functions into sequelize-values module
* Update sequelize dependency to 2.0.0+
* Update dev dependencies in line with sequelize v2.0.5
* Update test support files in line with sequelize v2.0.5
* Update module dependencies
* Travis runs tests against node 0.10 and 0.12
* Travis uses correct database users
* Support for Microsoft SQL Server in tests
* README code examples tagged as Javascript
* README contributions section
* README update

## 0.3.1

* Update sequelize dependency version to v2.1.0
* Update mysql module dependency in line with sequelize v2.1.0
* Update sequelize module dependencies
* Update lodash dependency
* Update bluebird-extra dependency
* Update dev dependencies
* README contribution section

## 0.3.2

* Remove relative path to sequelize in tests
* Update sequelize module dependencies

## 0.4.0

* Update Sequelize dependency to v3.2.0
* Update sequelize plugin dependencies
* Remove DATEONLY data type as now defined in Sequelize v3
* Update dependencies
* Update dev dependencies in line with Sequelize v3.2.0
* Travis runs tests with Sequelize v3 and v2
* Test code coverage & Travis sends to coveralls
* Run jshint on tests
* Disable Travis dependency cache
* Update README badges to use shields.io

## 0.4.1

* Update sequelize-hierarchy plugin dependency

## 0.4.2

* Update Sequelize dependency to v3.3.0

## 0.4.3

* Update sequelize-virtual-fields plugin dependency

## 0.4.4

* Update Sequelize dependency to v3.8.0
* Update plugins dependencies
* Update dependency mysql in line with Sequelize v3.8.0
* Update dependency lodash
* Update dev dependencies
* MSSQL config for tests
* package.json keywords
* README update

## 0.4.5

* Update Sequelize dependency to v3.9.0
* Update sequelize-hierarchy plugin dependency
