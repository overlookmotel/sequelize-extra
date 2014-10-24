// --------------------
// Sequelize extra
// getValues
// --------------------

// modules
var Sequelize = require('sequelize'),
	Utils = Sequelize.Utils,
	_ = Utils._;

// imports
var utils = require('./utils');

// exports
module.exports = {
	// gets values of supplied object/array, including values of nested associations
	// run on Sequelize
	getValuesSequelize: function(item) {
		// if item undefined, return undefined
		if (!item) return item;
		
		// if array, loop through each item getting values
		if (_.isArray(item)) {
			return item.map(function(thisItem) {
				return thisItem.getValues();
			});
		}
		
		// is a model object - call its getValues() method
		return item.getValues();
	},
	
	// gets values of instance, including values of nested associations
	// run on a model instance
	getValuesInstance: function() {
		return _.mapValues(this.values, function(attribute, attributeName) {
			if (_.isArray(attribute)) {
				return attribute.map(function(item) {
					return item.getValues();
				});
			}
			
			if (utils.isAnObject(attribute)) return attribute.getValues();
			
			return this.get(attributeName);
		}.bind(this));
	}
};
