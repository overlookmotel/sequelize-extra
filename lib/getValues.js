// --------------------
// Sequelize extra
// getValues
// --------------------

// modules
var Sequelize = require('sequelize'),
	Utils = Sequelize.Utils,
	_ = require('lodash');

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
		return this.get({plain: true});
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
		// remove unnecessary ID fields
		var values = this.values;
		
		_.forIn(values, function(attribute, attributeName) {
			if (!(attribute instanceof Sequelize.Instance)) return;
			
			var model = attribute.__proto__.Model; // jshint ignore:line
			if (model.primaryKeyAttributes.length != 1) return;
			
			var key = model.primaryKeyAttributes[0];
			if (attribute.dataValues[key] !== undefined) delete values[attributeName + Utils.uppercaseFirst(key)];
		}.bind(this));
		
		// identify unnecessary ID fields in through tables
		var throughs = {};
		if (this.options.include) {
			_.forEach(this.options.include, function(include) {
				if (include.through && include.through._pseudo) {
					throughs[include.as] = {
						model: include.through.as,
						field1: include.association.identifier,
						field2: include.association.foreignIdentifier
					};
				}
			});
		}
		
		// get values
		return _.mapValues(values, function(attribute, attributeName) {
			if (Array.isArray(attribute)) {
				var thisValues = attribute.map(function(item) {
					return item.getValuesDedup();
				});
				
				// remove unnecessary ID fields in through table
				if (throughs[attributeName]) {
					var through = throughs[attributeName];
					thisValues.forEach(function(item) {
						var throughItem = item[through.model];
						delete throughItem[through.field1];
						delete throughItem[through.field2];
						if (Object.keys(throughItem).length == 0) delete item[through.model];
					});
				}
				
				return thisValues;
			}
			
			if (attribute instanceof Sequelize.Instance) return attribute.getValuesDedup();
			
			return this.get(attributeName);
		}.bind(this));
	}
};
