# sequelize-extra.js

# Collection of extensions to Sequelize

## What it does

Packages together 4 Sequelize plugins ([sequelize-definer](https://www.npmjs.org/package/sequelize-definer), [sequelize-hierarchy](https://www.npmjs.org/package/sequelize-hierarchy), [sequelize-virtual-fields](https://www.npmjs.org/package/sequelize-virtual-fields) and [sequelize-values](https://www.npmjs.org/package/sequelize-values)).

## Current status

[![NPM version](https://img.shields.io/npm/v/sequelize-extra.svg)](https://www.npmjs.com/package/sequelize-extra)
[![Build Status](https://img.shields.io/travis/overlookmotel/sequelize-extra/master.svg)](http://travis-ci.org/overlookmotel/sequelize-extra)
[![Dependency Status](https://img.shields.io/david/overlookmotel/sequelize-extra.svg)](https://david-dm.org/overlookmotel/sequelize-extra)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/sequelize-extra.svg)](https://david-dm.org/overlookmotel/sequelize-extra)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/sequelize-extra/master.svg)](https://coveralls.io/r/overlookmotel/sequelize-extra)

API is stable. All features and options are fairly well tested. Works with all dialects of SQL supported by Sequelize (MySQL, Postgres, SQLite) except Microsoft SQL Server.

Utilizes Sequelize v3.x.x internally, but can work with v2.x.x.

## Usage

Usage of this module is not recommended! Better to use the 4 plugins directly ([sequelize-definer](https://www.npmjs.org/package/sequelize-definer), [sequelize-hierarchy](https://www.npmjs.org/package/sequelize-hierarchy), [sequelize-virtual-fields](https://www.npmjs.org/package/sequelize-virtual-fields) and [sequelize-values](https://www.npmjs.org/package/sequelize-values)).

### Loading module

To load module:

```js
var Sequelize = require('sequelize-extra');
```

### Additional Promise methods

`Sequelize.Promise` is augmented with extra methods from [bluebird-extra](https://www.npmjs.org/package/bluebird-extra) so methods like `mapSeries()` can be used on results returned from Sequelize.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

Requires a database called 'sequelize_test' and a db user 'sequelize_test' with no password.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/sequelize-extra/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
