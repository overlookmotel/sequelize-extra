# sequelize-extra.js

# Collection of extensions to Sequelize

## What it does

Packages together 3 Sequelize plugins ([sequelize-definer](https://www.npmjs.org/package/sequelize-definer), [sequelize-hierarchy](https://www.npmjs.org/package/sequelize-hierarchy) and [sequelize-virtual-fields](https://www.npmjs.org/package/sequelize-virtual-fields)) and adds a few extra methods.

## Current status

[![Build Status](https://secure.travis-ci.org/overlookmotel/sequelize-extra.png)](http://travis-ci.org/overlookmotel/sequelize-extra)
[![Dependency Status](https://david-dm.org/overlookmotel/sequelize-extra.png)](https://david-dm.org/overlookmotel/sequelize-extra)

API is stable. All features and options are fairly well tested. Works with all dialects of SQL supported by Sequelize (MySQL, Postgres, SQLite).

Requires recent master of Sequelize v2.x dev branch, more recent than 28 Oct 2014. This is more recent than v2.0.0-rc2 which is latest available on NPM. i.e. you need to get latest Sequelize from Github.

## Usage

### Loading module

To load module:

	var Sequelize = require('sequelize-extra')();

### Additional methods

#### Instance#getValues()

Like Sequelize's native `Instance#values`, except that it recursively calls `getValues()` on any nested values. So if you get an instance from `Model#find()` with eager-loaded associations, the associated Instances returned are also converted to values.

	Task.find( { include: [ User ] } )
	.then(function(task) {
		return task.getValues();
		// returns the attributes of the Task,
		// with the attributes of the User also converted to values rather than a DAO.
	});

#### Sequelize.getValues(input)

Same as `Instance#getValues()` except can be called with an `Instance` or array of `Instance`s.

	Task.findAll( { include: [ User ] } )
	.then(function(task) {
		return Sequelize.getValues(task);
		// returns the array of Tasks, with each Task converted to plain attributes,
		// with the attributes of the Users also converted to values rather than DAOs.
	});

#### Instance#getValuesDedup()

Same as `Instance#getValues()`, except removes duplicated data, e.g. removes `id` fields which are returned twice. Rather than:

	{ name: 'foo', UserId: 1, User: { id: 1, name: 'Bar' } }

you get:

	{ name: 'foo', User: { id: 1, name: 'Bar' } }

Useful if you want to e.g. send the values of an Instance to the browser without sending unnecessary duplicated data.

#### Sequelize.getValuesDedup(input)

Same as `Sequelize.getValues(input)`, but with data de-duplication.

## Tests

Use `npm test` to run the tests.
Requires a database called 'sequelize_test' and a db user 'sequelize_test' with no password.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/sequelize-extra/issues
