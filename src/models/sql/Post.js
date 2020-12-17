const Sequelize = require('sequelize')
const db = require('../../config/dbSql')
const crypto = require('crypto')

const Post = db.define('post', {
		_id: {
			type: Sequelize.STRING,
			primeryKey: true,
			defaultValue: createID()
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

function createID() {
	const id = crypto.randomBytes(Math.ceil((16*3)/4)).toString('base64').slice(0,16).replace(/\+/g,'0').replace(/\//g,'0')
	return id
}