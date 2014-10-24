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

// exports
module.exports = Sequelize;

// load plugins
sequelizeDefiner(Sequelize);
sequelizeHierarchy(Sequelize);
sequelizeVirtual(Sequelize);
