// --------------------
// Sequelize extra
// --------------------

// modules
var Sequelize = require('sequelize'),
	sequelizeDefiner = require('sequelize-definer'),
	sequelizeVirtualFields = require('sequelize-virtual-fields'),
	sequelizeHierarchy = require('sequelize-hierarchy'),
	sequelizeValues = require('sequelize-values'),
	bluebirdExtra = require('bluebird-extra');

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
sequelizeValues(Sequelize);

// additional data types
dataTypes(Sequelize);

// add reverse includes method
Sequelize.reverseIncludes = getValues.reverseIncludes;

// add namePlural to models when defined
Sequelize.addHook('afterInit', function(sequelize) {
	sequelize.addHook('afterDefine', function(model) {
	  model.namePlural = model.options.name.plural;
	});
});
