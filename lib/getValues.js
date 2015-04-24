// --------------------
// Sequelize extra
// getValues
// --------------------

// exports
module.exports = {
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
