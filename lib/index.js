// --------------------
// Sequelize extra
// --------------------

// modules
var Sequelize = require('sequelize'),
	sequelizeDefiner = require('sequelize-definer'),
	sequelizeVirtualFields = require('sequelize-virtual-fields'),
	sequelizeHierarchy = require('sequelize-hierarchy'),
	Utils = Sequelize.Utils,
	_ = Utils._;

// imports
var dataTypes = require('./dataTypes'),
	getValues = require('./getValues');

// exports
module.exports = Sequelize;

// load plugins
sequelizeDefiner(Sequelize);
sequelizeVirtualFields(Sequelize);
sequelizeHierarchy(Sequelize);

// additional data types
_.extend(Sequelize, dataTypes);

// add getValues methods
Sequelize.getValues = getValues.getValuesSequelize;
Sequelize.Instance.prototype.getValues = getValues.getValuesInstance;
Sequelize.getValuesDedup = getValues.getValuesDedupSequelize;
Sequelize.Instance.prototype.getValuesDedup = getValues.getValuesDedupInstance;
