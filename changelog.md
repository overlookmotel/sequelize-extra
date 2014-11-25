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
