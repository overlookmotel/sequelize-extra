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
		return getValues(item);
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
		return getValues(item, true);
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
				var through = throughs[attributeName];
				if (through) {
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
	},
	
	reverseIncludes: function(item, modelChain) {
		if (!item) return;
		
		var model = modelChain[0];
		for (var i = 1; i < modelChain.length; i++) {
			var thisModel = modelChain[i];
			
			var thisItem = item[thisModel.namePlural][0];
			delete item.dataValues[thisModel.namePlural];
			delete item[thisModel.namePlural];
			
			if (!thisItem) break;
			
			if (!thisItem[model.name]) {
				thisItem.dataValues[model.name] = item;
				thisItem[model.name] = item;
			}
			
			item = thisItem;
			model = thisModel;
		}
		
		return {model: model, item: item};
	}
};

function getValues(item, dedup) {
	// if item undefined, return undefined
	if (!item) return item;

	// if a model instance, call its getValues() method
	if (item instanceof Sequelize.Instance) {
		if (dedup) {
			return item.getValuesDedup();
		} else {
			return item.getValues();
		}
	}

	// if array, loop through each item getting values
	if (Array.isArray(item)) {
		return item.map(function(thisItem) {
			return getValues(thisItem, dedup);
		});
	}

	// if is an object, loop through each attribute getting values
	if (_.isPlainObject(item)) {
		return _.mapValues(item, function(value) {
			return getValues(value, dedup);
		});
	}

	// is not a sequelize instance, an array or an object - return it unchanged
	return item;
}
