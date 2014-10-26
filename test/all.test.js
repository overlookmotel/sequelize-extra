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
			this.TaskWorker = this.sequelize.define('TaskWorker', {}, {tableName: 'TasksWorkers'});
			
			this.Task.belongsTo(this.User, {as: 'Owner'});
			this.User.hasMany(this.Task, {as: 'OwnedTasks', foreignKey: 'OwnerId'});
			
			this.Task.hasMany(this.User, {as: 'Workers', through: this.TaskWorker});
			this.User.hasMany(this.Task, {as: 'WorkTasks', through: this.TaskWorker});
			
			return Promise.bind(this).then(function() {
				return this.sequelize.sync();
			}).then(function() {
				return this.User.create({name: 'Bob'});
			}).then(function(user) {
				this.bob = user;
				return this.Task.create({name: 'Washing'});
			}).then(function(task) {
				this.washing = task;
				return this.washing.setOwner(this.bob);
			}).then(function() {
				return this.washing.addWorker(this.bob);
			});
		});
		
		it('Sequelize.getValues(item)', function() {
			return Promise.bind(this).then(function() {
				return this.Task.findAll({where: {name: 'Washing'}, include: [{model: this.User, as: 'Owner'}]});
			}).then(function(items) {
				var values = Sequelize.getValues(items);
				
				expect(values.dataValues).not.to.exist;
				expect(values[0]).to.be.ok;
				expect(values[0].dataValues).not.to.exist;
				expect(values[0].Owner).to.be.ok;
				expect(values[0].Owner.dataValues).not.to.exist;
				expect(values[0].Owner.id).to.equal(this.bob.id);
			});
		});
		
		it('Instance#getValues()', function() {
			return Promise.bind(this).then(function() {
				return this.Task.find({where: {name: 'Washing'}, include: [{model: this.User, as: 'Owner'}]});
			}).then(function(item) {
				var values = item.getValues();
				
				expect(values.dataValues).not.to.exist;
				expect(values.Owner).to.be.ok;
				expect(values.Owner.dataValues).not.to.exist;
				expect(values.Owner.id).to.equal(this.bob.id);
			});
		});
		
		describe('one-to-many join', function() {
			it('Sequelize.getValuesDedup(item)', function() {
				return Promise.bind(this).then(function() {
					return this.Task.findAll({where: {name: 'Washing'}, include: [{model: this.User, as: 'Owner'}]});
				}).then(function(items) {
					var values = Sequelize.getValuesDedup(items);
					
					expect(values.dataValues).not.to.exist;
					expect(values[0]).to.be.ok;
					expect(values[0].dataValues).not.to.exist;
					expect(values[0].OwnerId).not.to.exist;
					expect(values[0].Owner).to.be.ok;
					expect(values[0].Owner.dataValues).not.to.exist;
					expect(values[0].Owner.id).to.equal(this.bob.id);
				});
			});
		
			it('Instance#getValuesDedup()', function() {
				return Promise.bind(this).then(function() {
					return this.Task.find({where: {name: 'Washing'}, include: [{model: this.User, as: 'Owner'}]});
				}).then(function(item) {
					var values = item.getValuesDedup();
					
					expect(values.dataValues).not.to.exist;
					expect(values.OwnerId).not.to.exist;
					expect(values.Owner).to.be.ok;
					expect(values.Owner.dataValues).not.to.exist;
					expect(values.Owner.id).to.equal(this.bob.id);
				});
			});
		});
		
		describe('many-to-many join', function() {
			it('Instance#getValuesDedup()', function() {
				return Promise.bind(this).then(function() {
					return this.Task.find({where: {name: 'Washing'}, include: [{model: this.User, as: 'Workers'}]});
				}).then(function(item) {
					var values = item.getValuesDedup();
					
					expect(values.Workers).to.be.ok;
					expect(values.Workers.length).to.equal(1);
					expect(values.Workers[0].dataValues).not.to.exist;
					expect(values.Workers[0].id).to.equal(this.bob.id);
					
					expect(values.Workers[0].TaskWorker.UserId).not.to.exist;
					expect(values.Workers[0].TaskWorker.TaskId).not.to.exist;
				});
			});
		});
	});
});
