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
		if (Array.isArray(item)) {
			return item.map(function(thisItem) {
				return thisItem.getValues();
			});
		}
		
		// is a model instance - call its getValues() method
		return item.getValues();
	},
	
	// gets values of instance, including values of nested associations
	// run on a model instance
	getValuesInstance: function() {
		return _.mapValues(this.values, function(attribute, attributeName) {
			if (Array.isArray(attribute)) {
				return attribute.map(function(item) {
					return item.getValues();
				});
			}
			
			if (attribute instanceof Sequelize.Instance) return attribute.getValues();
			
			return this.get(attributeName);
		}.bind(this));
	},
	
	// as getValuesSequelize above except:
	// where an associated object has been eager-loaded and includes its ID, removes the ID field leading to that object
	// to remove duplicated information
	// e.g. { userId: 1, user: { id: 1 } } -> { user: { id: 1 } }
	getValuesDedupSequelize: function(item) {
		// if item undefined, return undefined
		if (!item) return item;
		
		// if array, loop through each item getting values
		if (Array.isArray(item)) {
			return item.map(function(thisItem) {
				return thisItem.getValuesDedup();
			});
		}
		
		// is a model object - call its getValuesDedup() method
		return item.getValuesDedup();
	},
	
	// as getValuesInstance above except:
	// where an associated object has been eager-loaded and includes its ID, removes the ID field leading to that object
	// to remove duplicated information
	// e.g. { userId: 1, user: { id: 1 } } -> { user: { id: 1 } }
	getValuesDedupInstance: function() {
		// remove unneccesary ID fields
		var values = this.values;
		
		_.forIn(values, function(attribute, attributeName) {
			if (!(attribute instanceof Sequelize.Instance)) return;
			
			var model = attribute.__proto__.Model;
			if (model.primaryKeyAttributes.length != 1) return;
			
			var key = model.primaryKeyAttributes[0];
			if (attribute.dataValues[key] !== undefined) delete values[attributeName + Utils.uppercaseFirst(key)];
		}.bind(this));
		
		// get values
		return _.mapValues(values, function(attribute, attributeName) {
				return attribute.map(function(item) {
			if (Array.isArray(attribute)) {
					return item.getValuesDedup();
				});
			}
			
			if (attribute instanceof Sequelize.Instance) return attribute.getValuesDedup();
			
			return this.get(attributeName);
		}.bind(this));
	}
};
