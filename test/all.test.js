// --------------------
// Sequelize extra
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	promised = require('chai-as-promised'),
	Support = require(__dirname + '/support'),
	Sequelize = Support.Sequelize;

var sequelizeVersion = require('sequelize/package.json').version;

// init
chai.use(promised);
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

console.log('Sequelize version:', sequelizeVersion);

describe(Support.getTestDialectTeaser('Tests'), function () {
	it('Tests', function() {
		expect(Sequelize).to.be.ok;
	});
});
