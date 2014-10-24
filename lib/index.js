// --------------------
// Sequelize extra
// --------------------

// modules
var Sequelize = require('sequelize'),
	sequelizeDefiner = require('sequelize-definer'),
	sequelizeHierarchy = require('sequelize-hierarchy'),
	sequelizeVirtual = require('sequelize-virtual'),
	Utils = Sequelize.Utils,
	_ = Utils._;

// imports
var utils = require('./utils'),
	dataTypes = require('./dataTypes'),
	getValues = require('./getValues');

// exports
module.exports = Sequelize;

// load plugins
sequelizeDefiner(Sequelize);
sequelizeHierarchy(Sequelize);
sequelizeVirtual(Sequelize);

// additional data types
_.extend(Sequelize, dataTypes);

// add getValues methods
Sequelize.getValues = getValues.onSequelize;
Sequelize.Instance.prototype.getValues = getValues.onInstance;
