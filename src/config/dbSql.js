const Sequelize = require('sequelize')

const config = {
	database: 'baseDeDatos',
	username: '',
	password: '',
	params: {
		dialect: 'sqlite',
		storage: './dbSqlite3'
	}
}
const db = new Sequelize(
	config.database,
	config.username,
	config.password,
	config.params
)
module.exports = db