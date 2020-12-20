const Sequelize = require('sequelize')
const db = require('../../config/dbSql')

const Post = db.define('post', {
		_id: {
			type: Sequelize.STRING,
			primeryKey: true,
			validate: {
				notEmpty: true
			}
		},
		titulo: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		contenido: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		imagen: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		categoria: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		fechaCreacion: {
			type: Sequelize.DATE,
			defaultValue: Date.now
		}
	})
Post.sync({force: false})
module.exports = Post