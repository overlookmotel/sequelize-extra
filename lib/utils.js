// --------------------
// Sequelize extra
// Utility functions
// --------------------

// modules
var Sequelize = require('sequelize'),
	Utils = Sequelize.Utils,
	_ = Utils._;

// exports

module.exports = {
	isAnObject: function(obj) {
		if (!_.isObject(obj)) return false;
		if (_.isArray(obj)) return false;
		if (_.isFunction(obj)) return false;
		if (_.isDate(obj)) return false;
		if (_.isRegExp(obj)) return false;
		if (_.isNumber(obj)) return false;
		if (_.isString(obj)) return false;
		
		return true;
	}
};
