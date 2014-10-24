// --------------------
// Sequelize extra
// --------------------

// modules
var Sequelize = require('sequelize'),
	sequelizeDefiner = require('sequelize-definer'),
	sequelizeHierarchy = require('sequelize-hierarchy'),
	sequelizeVirtualFields = require('sequelize-virtual-fields'),
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
sequelizeVirtualFields(Sequelize);

// additional data types
_.extend(Sequelize, dataTypes);

// add getValues methods
Sequelize.getValues = getValues.getValuesSequelize;
Sequelize.Instance.prototype.getValues = getValues.getValuesInstance;
Sequelize.getValuesDedup = getValues.getValuesDedupSequelize;
Sequelize.Instance.prototype.getValuesDedup = getValues.getValuesDedupInstance;
