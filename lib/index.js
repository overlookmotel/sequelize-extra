// --------------------
// Sequelize extra
// --------------------

// modules
var Sequelize = require('sequelize'),
	sequelizeDefiner = require('sequelize-definer'),
	sequelizeVirtualFields = require('sequelize-virtual-fields'),
	sequelizeHierarchy = require('sequelize-hierarchy'),
	bluebirdExtra = require('bluebird-extra'),
	_ = require('lodash');

// imports
var dataTypes = require('./dataTypes'),
	getValues = require('./getValues');

// exports
module.exports = Sequelize;

// augment Sequelize.Promise with extra methods using bluebird-extra
bluebirdExtra.usePromise(Sequelize.Promise);

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

// add reverse includes method
Sequelize.reverseIncludes = getValues.reverseIncludes;

// add namePlural to models when defined
Sequelize.addHook('afterInit', function(sequelize) {
	sequelize.addHook('afterDefine', function(model) {
	  model.namePlural = model.options.name.plural;
	});
});
