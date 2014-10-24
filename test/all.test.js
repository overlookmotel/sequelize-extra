// --------------------
// Sequelize extra
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	promised = require('chai-as-promised'),
	Support = require(__dirname + '/support'),
	Sequelize = Support.Sequelize,
	Promise = Sequelize.Promise,
	Utils = Sequelize.Utils,
	_ = Utils._;

// init

chai.use(promised);
chai.config.includeStack = true;

// tests

describe(Support.getTestDialectTeaser('Tests'), function () {
	describe('getValues', function() {
		beforeEach(function() {
			this.User = this.sequelize.define('User', {name: Sequelize.STRING});
			this.Task = this.sequelize.define('Task', {name: Sequelize.STRING});
			
			this.Task.belongsTo(this.User);
			this.User.hasMany(this.Task);
			
			return Promise.bind(this).then(function() {
				return this.sequelize.sync();
			}).then(function() {
				return this.User.create({name: 'Bob'});
			}).then(function(user) {
				this.bob = user;
				return this.Task.create({name: 'Washing'});
			}).then(function(task) {
				this.washing = task;
				return this.washing.setUser(this.bob);
			});
		});
		
		it('Sequelize.getValues(item)', function() {
			return Promise.bind(this).then(function() {
				return this.Task.findAll({where: {name: 'Washing'}, include: [this.User]});
			}).then(function(items) {
				var values = Sequelize.getValues(items);
				
				expect(values.dataValues).not.to.exist;
				expect(values[0]).to.be.ok;
				expect(values[0].dataValues).not.to.exist;
				expect(values[0].User).to.be.ok;
				expect(values[0].User.dataValues).not.to.exist;
				expect(values[0].User.id).to.equal(this.bob.id);
			});
		});
		
		it('Instance#getValues()', function() {
			return Promise.bind(this).then(function() {
				return this.Task.find({where: {name: 'Washing'}, include: [this.User]});
			}).then(function(item) {
				var values = item.getValues();
				
				expect(values.dataValues).not.to.exist;
				expect(values.User).to.be.ok;
				expect(values.User.dataValues).not.to.exist;
				expect(values.User.id).to.equal(this.bob.id);
			});
		});
	});
});
