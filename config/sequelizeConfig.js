var Sequelize = require('sequelize');
var env = require('./databaseConfig');
var config = require('./database.json')[env];
var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
    dialect: config.driver,
    logging: console.log,
		define: {
			timestamps: false
		}
	}
);

module.exports = sequelize;