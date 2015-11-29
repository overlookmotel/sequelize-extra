// --------------------
// Sequelize extra
// Additional data types
// --------------------

// exports
module.exports = function(Sequelize) {
	Sequelize.DATETIME = Sequelize.DATE;
	Sequelize.TIME = 'TIME';
};
