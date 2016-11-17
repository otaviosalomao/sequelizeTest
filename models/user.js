var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");
var crypto = require('crypto');


var User = sequelize.define('users', {
    username: dataTypes.STRING,
    password: dataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
			User.findAll({}, {raw: true}).success(onSuccess).error(onError);
	  },
      retrieveById: function(user_id, onSuccess, onError) {
			User.find({where: {id: user_id}}, {raw: true}).success(onSuccess).error(onError);
	  },
      add: function(onSuccess, onError) {
			var username = this.username;
			var password = this.password;

			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');

			User.build({ username: username, password: password }).save().success(onSuccess).error(onError);
	   },
	  updateById: function(user_id, onSuccess, onError) {
			var id = user_id;
			var username = this.username;
			var password = this.password;

			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');

			User.update({ username: username,password: password},{where: {id: id} }).success(onSuccess).error(onError);
	   },
      removeById: function(user_id, onSuccess, onError) {
			User.destroy({where: {id: user_id}}).success(onSuccess).error(onError);
	  }
    }
  });

  module.exports = User;