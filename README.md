# sequelize-extra.js

# Collection of extensions to Sequelize

## What it does

Packages together 4 Sequelize plugins ([sequelize-definer](https://www.npmjs.org/package/sequelize-definer), [sequelize-hierarchy](https://www.npmjs.org/package/sequelize-hierarchy), [sequelize-virtual-fields](https://www.npmjs.org/package/sequelize-virtual-fields) and [sequelize-values](https://www.npmjs.org/package/sequelize-values)) and adds a few extra methods.

## Current status

[![Build Status](https://secure.travis-ci.org/overlookmotel/sequelize-extra.png?branch=master)](http://travis-ci.org/overlookmotel/sequelize-extra)
[![Dependency Status](https://david-dm.org/overlookmotel/sequelize-extra.png)](https://david-dm.org/overlookmotel/sequelize-extra)

API is stable. All features and options are fairly well tested. Works with all dialects of SQL supported by Sequelize (MySQL, Postgres, SQLite) except Microsoft SQL Server.

Utilizes Sequelize v2.0.0 internally.

## Usage

### Loading module

To load module:

	var Sequelize = require('sequelize-extra');


### Additional Promise methods

`Sequelize.Promise` is augmented with extra methods from [bluebird-extra](https://www.npmjs.org/package/bluebird-extra) so methods like `mapSeries()` can be used on results returned from Sequelize.

## Tests

Use `npm test` to run the tests.
Requires a database called 'sequelize_test' and a db user 'sequelize_test' with no password.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/sequelize-extra/issues
